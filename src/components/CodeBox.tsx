import { ChangeEvent, useState } from "react";
import Editor from "@monaco-editor/react";
import { ThemeContextProps, useTheme } from "./Theme";
import { RUN_CODE_API } from "../../helpers/logics";

interface CodeBoxProps {
  expandOutput: React.Dispatch<React.SetStateAction<number>>;
  setOutputLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSubmitionResult: React.Dispatch<React.SetStateAction<any>>;
  setOutput: React.Dispatch<React.SetStateAction<any>>;
  question: any;
  user: any;
}

const CodeBox = ({
  expandOutput,
  setOutput,
  setOutputLoading,
  setSubmitionResult,
  question,
  user,
}: CodeBoxProps) => {
  const authenticated = user != null;
  const languages: string[] = ["Java", "CPP", "Python"];

  const { theme } = useTheme() as ThemeContextProps;
  const [language, setLanguage] = useState(
    () => localStorage.getItem("prefered-coding-language") || "Java"
  );
  const [code, setCode] = useState(() => {
    const code: any = { Java: "", Python: "", CPP: "" };
    languages.forEach((lang) => {
      let str;
      if ((str = localStorage.getItem(`${lang}-boiler-${question.qid}`))) {
        code[lang] = str;
      } else {
        // code changed here
        code[lang] = atob(question.solutionCode[lang.toLowerCase()]);
      }
    });
    return code;
  });

  const resetCode = () => {
    localStorage.removeItem(`${language}-boiler-${question.qid}`);
    setCode(() => ({
      ...code,
      [language]: atob(question.boilerPlateCode[language.toLowerCase()]),
    }));
  };

  const run_or_submit_code = async (RunOrSubmit: 0 | 1) => {
    //should be authenticated
    if (!authenticated) return;

    if (!(language == "Java" || language == "Python" || language == "CPP"))
      return;

    if (!question.isReady) {
      if (prompt("Enter 'ABC'") != "binod") return;
    }

    // start loading
    setOutputLoading(true);

    // solution-code + driver-code
    const newCode = `${code[language]}
    ${atob(question.driverCode[language.toLowerCase()])}`;

    // run using judge0
    const output = await RUN_CODE_API(newCode, language, RunOrSubmit);

    if (!RunOrSubmit) {
      setOutput(output.DATA);
    } else {
      setSubmitionResult(output.DATA);
      setOutput({ ...output.DATA, stdout: null });
    }

    // expand the output tab
    expandOutput(60);
    document.querySelector("#t-o-dropdown")?.classList.toggle("rotate", true);

    // end loading
    setOutputLoading(false);
  };

  return (
    <div className="codebox">
      <div className="codebox-header">
        <div className="codebox-header-left">
          <select
            value={language}
            name="language"
            className="codebox-lang-select"
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              setLanguage(() => {
                const value = event.target.value;
                localStorage.setItem("prefered-coding-language", value);
                return value;
              })
            }
          >
            {languages.map((lang) => (
              <option key={lang} value={lang} className="codebox-lang-option">
                {lang}
              </option>
            ))}
          </select>
        </div>
        <div className="codebox-header-right">
          <span className="refresh" onClick={resetCode}>
            &#8635;
          </span>
        </div>
      </div>

      <Editor
        className="editorrr"
        onChange={(newCode) =>
          newCode &&
          setCode(() => {
            localStorage.setItem(`${language}-boiler-${question.qid}`, newCode);
            return { ...code, [language]: newCode };
          })
        }
        language={language.toLowerCase()}
        value={code[language]}
        theme={theme ? "vs-dark" : "light"}
        options={{ fontWeight: "200", fontFamily: "monospace" }}
      />
      <div className="codebox-footer">
        <button
          className={authenticated ? "submit" : "submit disabled-cursor"}
          onClick={() => run_or_submit_code(1)}
          disabled={!authenticated}
        >
          Submit
        </button>
        <button
          className={authenticated ? "run" : "run disabled-cursor"}
          onClick={() => run_or_submit_code(0)}
          disabled={!authenticated}
        >
          Run
        </button>
      </div>
    </div>
  );
};

export default CodeBox;

import { useAuth } from "../components/Auth";
import { AuthProps } from "../../helpers/types";
import { Editor } from "@monaco-editor/react";
import { ThemeContextProps, useTheme } from "../components/Theme";
import { FormEvent, useState } from "react";
import { getQuestion } from "../database/store";

interface questionDataProps {
  qid?: number;
  title?: string;
  difficulty?: number;
  description?: string;
  input1?: string;
  output1?: string;
  input2?: string;
  output2?: string;
  topics?: string;
  constraints?: string;
  boilerPlateCodejava?: string;
  boilerPlateCodecpp?: string;
  boilerPlateCodepython?: string;
  driverCodejava?: string;
  driverCodecpp?: string;
  driverCodepython?: string;
  solutionCodejava?: string;
  solutionCodecpp?: string;
  solutionCodepython?: string;
}

const Admin = () => {
  type langTypes = "java" | "cpp" | "python";
  type subSectionTypes = "boilerPlateCode" | "driverCode" | "solutionCode";
  type codeTypes =
    | "boilerPlateCodejava"
    | "boilerPlateCodecpp"
    | "boilerPlateCodepython"
    | "driverCodejava"
    | "driverCodecpp"
    | "driverCodepython"
    | "solutionCodejava"
    | "solutionCodecpp"
    | "solutionCodepython";
  const languages: langTypes[] = ["java", "cpp", "python"];
  const subSections: subSectionTypes[] = [
    "boilerPlateCode",
    "solutionCode",
    "driverCode",
  ];

  const { USER } = useAuth() as AuthProps;
  const { theme } = useTheme() as ThemeContextProps;

  const [questionData, setQuestionData] = useState<questionDataProps>({
    boilerPlateCodejava: "// boilerPlateCodejava",
    boilerPlateCodecpp: "// boilerPlateCodecpp",
    boilerPlateCodepython: "# boilerPlateCodepython",
    driverCodejava: "// driverCodejava",
    driverCodecpp: "// driverCodecpp",
    driverCodepython: "# driverCodepython",
    solutionCodejava: "// solutionCodejava",
    solutionCodecpp: "// solutionCodecpp",
    solutionCodepython: "# solutionCodepython",
  });

  const [langTab, setLangTab] = useState<langTypes>("java");
  const [langTabSubSection, setLangTabSubSection] =
    useState<subSectionTypes>("boilerPlateCode");
  const [codeType, setCodeType] = useState<codeTypes>("boilerPlateCodejava");

  const getData = async (event: FormEvent) => {
    event.preventDefault();
    try {
      if (!questionData.qid) {
        throw new Error("Enter QID");
      }
      const question = await getQuestion(questionData.qid);
      if (!question) {
        throw new Error("Invalid Question Number");
      }
      const obj: questionDataProps = {
        qid: question.qid,
        title: question.title,
        difficulty: question.difficulty,
        input1: question.examples[0].input,
        output1: question.examples[0].output,
        input2: question.examples[1].input,
        output2: question.examples[1].output,
        topics: question.topics.join("///"),
        description: question.description.join("///"),
        constraints: question.constraints.join("///"),
        boilerPlateCodejava: atob(question.boilerPlateCode.java),
        boilerPlateCodecpp: atob(question.boilerPlateCode.cpp),
        boilerPlateCodepython: atob(question.boilerPlateCode.python),
        driverCodejava: atob(question.driverCode.java),
        driverCodecpp: atob(question.driverCode.cpp),
        driverCodepython: atob(question.driverCode.python),
        solutionCodejava: atob(question.solutionCode.java),
        solutionCodecpp: atob(question.solutionCode.cpp),
        solutionCodepython: atob(question.solutionCode.python),
      };

      setQuestionData(obj);
    } catch (error) {
      console.log(error);
    }
  };

  const addQuestion = (event: FormEvent) => {
    event.preventDefault();
    const values = Object.values(questionData);
    if (values.length < 19) {
      console.log("Insufficient data");
      return;
    }

    for (let value of values) {
      if (value === null) {
        console.log("invalid");
        return;
      }
    }
    console.log("valid");
  };

  const onInputsChange = (event: any) => {
    setQuestionData({
      ...questionData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      {(!USER || !USER.isADMIN) && (
        <div className="modify-add">404 Not Found</div>
      )}
      {USER && USER.isADMIN && (
        <div className="modify-add scrollable">
          <div className="modify-q">
            <h2>Modify Question</h2>
            <form onSubmit={getData}>
              <input
                type="number"
                name="qid"
                onChange={onInputsChange}
                placeholder="Enter QID to modify"
                min={1}
                value={questionData.qid ? questionData.qid : ""}
              />
              <button>Get Data</button>
            </form>
          </div>
          {/* <small>OR</small> */}
          <form className="add-q">
            <h2>Add Question</h2>
            <input
              type="number"
              placeholder="QID (number)"
              name="qid"
              onChange={onInputsChange}
              required
              min={1}
              value={questionData.qid ? questionData.qid : ""}
            />
            <input
              type="text"
              placeholder="Title (string)"
              value={questionData.title ? questionData.title : ""}
              name="title"
              onChange={onInputsChange}
              required
            />
            <input
              type="number"
              placeholder="Difficulty (0/1/2)"
              value={questionData.difficulty ? questionData.difficulty : ""}
              name="difficulty"
              onChange={onInputsChange}
              min={0}
              max={2}
              required
            />
            <textarea
              placeholder="Description (string) (separated by ///)"
              value={questionData.description ? questionData.description : ""}
              name="description"
              onChange={onInputsChange}
              required
            />
            <div className="sub1">
              <h4>Example 1</h4>
              <input
                type="text"
                placeholder="Input (string)"
                value={questionData.input1 ? questionData.input1 : ""}
                name="input1"
                onChange={onInputsChange}
                required
              />
              <input
                type="text"
                placeholder="Output (string)"
                value={questionData.output1 ? questionData.output1 : ""}
                name="output1"
                onChange={onInputsChange}
                required
              />
            </div>
            <div className="sub1">
              <h4>Example 2</h4>
              <input
                type="text"
                placeholder="Input (string)"
                value={questionData.input2 ? questionData.input2 : ""}
                name="input2"
                onChange={onInputsChange}
                required
              />
              <input
                type="text"
                placeholder="Output (string)"
                value={questionData.output2 ? questionData.output2 : ""}
                name="output2"
                onChange={onInputsChange}
                required
              />
            </div>
            <textarea
              placeholder="Topics (string) (Separated by ///)"
              value={questionData.topics ? questionData.topics : ""}
              name="topics"
              onChange={onInputsChange}
              required
            />
            <textarea
              placeholder="Constraints (string) (Separated by ///)"
              value={questionData.constraints ? questionData.constraints : ""}
              name="constraints"
              onChange={onInputsChange}
            />
            <h3>Code</h3>
            <div className="code sub1">
              <div className="tabs">
                {languages.map((lang) => (
                  <h4
                    key={lang}
                    className={langTab == lang ? "selected tab" : "tab"}
                    onClick={() => {
                      setLangTab(lang);
                      const str: any = langTabSubSection + lang;
                      setCodeType(str);
                    }}
                  >
                    {lang}
                  </h4>
                ))}
              </div>
              <div className="sub2">
                <div className="tabs">
                  {subSections.map((section) => (
                    <h4
                      key={section}
                      className={
                        langTabSubSection == section ? "selected tab" : "tab"
                      }
                      onClick={() => {
                        setLangTabSubSection(section);
                        const str: any = section + langTab;
                        setCodeType(str);
                      }}
                    >
                      {section}
                    </h4>
                  ))}
                </div>
                <Editor
                  className="editorrr"
                  language={langTab}
                  value={questionData[codeType]}
                  theme={theme ? "vs-dark" : "light"}
                  height={"400px"}
                  onChange={(newCode) => {
                    if (!newCode) return;
                    setQuestionData({ ...questionData, [codeType]: newCode });
                  }}
                />
              </div>
            </div>
            <input type="submit" onClick={addQuestion} value={"Add"} />
          </form>
        </div>
      )}
    </>
  );
};

export default Admin;

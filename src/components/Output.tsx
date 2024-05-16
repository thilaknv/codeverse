import { useEffect, useState } from "react";
import DropDown from "../assets/drop_down.png";

interface Props {
  expandOutput: React.Dispatch<React.SetStateAction<number>>;
  output?: any;
  loading: boolean;     
  question: any;
}

const Output = ({ expandOutput, output, loading, question }: Props) => {
  const { examples } = question;
  const [caseTab, changeCaseTab] = useState(0);
  const [tab, changeTab] = useState(true);
  const [stdout, setStdout] = useState<any>("");
  const [std_output, set_std_output] = useState<any[]>([]);
  const [std_result, set_std_result] = useState<any[]>([]);

  useEffect(() => {
    if (!output) {
      setStdout("stdout");
      return;
    }
    const { compile_output, status, stdout, stderr } = output;
    if (compile_output != null) {
      setStdout(compile_output);
    } else if (stderr != null) {
      setStdout(stderr);
    } else if (stdout != null && stdout.includes("%break%")) {
      const [stdout1, stdout2] = stdout.split("%break%");
      if (stdout2.includes("%result%")) {
        const [output_string, result_string] = stdout2.split("%result%");
        set_std_output(output_string.split("|"));
        set_std_result(result_string.split("|"));
        changeTab(true);
      }
      setStdout(stdout1);
      return;
    } else if (status && status.id != 3) {
      setStdout(status.description);
    }
    changeTab(false);
  }, [output]);

  return (
    <div className="testcase-output">
      <header className="t-o-header">
        <strong
          className={tab ? "tab selected" : "tab"}
          onClick={() => changeTab(true)}
        >
          Test Cases
        </strong>
        <strong
          className={tab ? "tab" : "tab selected"}
          onClick={() => changeTab(false)}
        >
          Output
        </strong>
        {loading && <span className="loader"></span>}
        <img
          src={DropDown}
          className="rotate"
          id="t-o-dropdown"
          onClick={() =>
            expandOutput((prev) => {
              document
                .querySelector("#t-o-dropdown")
                ?.classList.toggle("rotate", prev != 10);
              return prev == 10 ? 60 : 10;
            })
          }
        />
      </header>
      {tab && (
        <div className="t-o-container">
          <div className="cases-header">
            {examples.map((ex: any, i: number) => (
              <strong
                key={i}
                className={caseTab == i ? "selected case" : "case"}
                onClick={() => changeCaseTab(i)}
              >
                Case {i + 1}
                {std_result.length > i && std_result[i] == 1 && (
                  <small className="correct">&#10004;</small>
                )}
                {std_result.length > i && std_result[i] == 0 && (
                  <small className="wrong">&#10006;</small>
                )}
              </strong>
            ))}
          </div>
          <div className="cases-body">
            <h5>Input</h5>
            <div>{examples[caseTab].input}</div>
            <h5>Expected Output</h5>
            <div>{examples[caseTab].output}</div>
            {std_output.length > 0 && (
              <>
                <h5>Recieved Output</h5>
                <div>
                  {std_output.length > caseTab ? std_output[caseTab] : " "}
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {!tab && <div className="t-o-container terminal">{stdout}</div>}
    </div>
  );
};

export default Output;

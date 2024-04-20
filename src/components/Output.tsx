import { useEffect, useState } from "react";
import DropDown from "../assets/drop_down.png";
import { questions } from "../../helpers/questions";
import { useLocation } from "react-router-dom";

interface Props {
  expandOutput: React.Dispatch<React.SetStateAction<number>>;
  output?: any;
}

const Output = ({ expandOutput, output }: Props) => {
  const { pathname } = useLocation();
  const Qno = Number(pathname.split("/")[2]);

  const { examples } = questions[Qno - 1];
  const [caseTab, changeCaseTab] = useState(0);
  const [tab, changeTab] = useState(true);
  const [stdout, setStdout] = useState<any>("");
  const [std_output, set_std_output] = useState<any[]>([]);
  const [std_result, set_std_result] = useState<any[]>([]);

  useEffect(() => {
    if (!output) {
      setStdout("There was an error");
      return;
    }
    const { compile_output, status, stdout, stderr } = output;
    if (compile_output != null) {
      setStdout(compile_output);
    } else if (stderr != null) {
      setStdout(stderr);
    } else if (stdout != null) {
      const [stdout1, stdout2] = stdout.split("%break%");
      const [output_string, result_string] = stdout2.split("%result%");
      console.log(output_string.length);
      set_std_output(output_string.split("|"));
      set_std_result(result_string.split("|"));
      console.log(std_output, std_result);
      changeTab(true);
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
            {examples.map((example, index) => (
              <strong
                key={index}
                className={caseTab == index ? "selected case" : "case"}
                onClick={() => changeCaseTab(index)}
              >
                Case {index + 1}
                {std_result.length > index && std_result[index] == 1 && (
                  <small className="correct">&#10004;</small>
                )}
                {std_result.length > index && std_result[index] == 0 && (
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

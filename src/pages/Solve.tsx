import Split from "react-split";
import Question from "../components/Question";
import CodeBox from "../components/CodeBox";
import Output from "../components/Output";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { questions } from "../../helpers/questions";

const Solve = () => {
  const { pathname } = useLocation();
  const QnoStr = pathname.split("/")[2];
  const Qno = Number(QnoStr);
  if (
    isNaN(Qno) ||
    Qno < 1 ||
    Qno > questions.length ||
    Qno != Math.trunc(Qno) ||
    QnoStr.indexOf(".") != -1
  )
    return (
      <div>
        <h3>Question Not Found</h3>
      </div>
    );

  const [leftDivSize, setLeftDivSize] = useState(10);
  const [output, setOutput] = useState<any>();

  return (
    <div>
      <Split
        className="solve"
        sizes={[40, 60]}
        minSize={[300, 500]}
        expandToMin={false}
        gutterSize={8}
        gutterAlign="center"
        snapOffset={0}
        dragInterval={1}
        direction="horizontal"
        // cursor="ew-resize"
      >
        <Split
          className="question-output-split"
          sizes={[100 - leftDivSize, leftDivSize]}
          minSize={[100, 50]}
          expandToMin={false}
          gutterSize={8}
          gutterAlign="center"
          snapOffset={0}
          dragInterval={1}
          direction="vertical"
          cursor="ns-resize"
        >
          <Question />
          <Output
            expandOutput={setLeftDivSize}
            output={output}
            // result={}
          />
        </Split>
        <CodeBox expandOutput={setLeftDivSize} setOutput={setOutput} />
      </Split>
    </div>
  );
};

export default Solve;

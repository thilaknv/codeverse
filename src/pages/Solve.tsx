import Split from "react-split";
import Question from "../components/Question";
import CodeBox from "../components/CodeBox";
import Output from "../components/Output";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getQuestion, updateQuestionSolved } from "../database/store";
import { useAuth } from "../components/Auth";
import { AuthProps } from "../../helpers/types";
import SubmisionPopUp from "../components/SubmisionPopUp";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const Solve = () => {
  const { pathname } = useLocation();
  const QnoStr = pathname.split("/")[2];
  const Qno = Number(QnoStr);
  if (isNaN(Qno) || Qno != Math.trunc(Qno) || QnoStr.indexOf(".") != -1)
    return (
      <div>
        <h3>Invalid Question</h3>
      </div>
    );

  const [leftDivSize, setLeftDivSize] = useState(10);
  const [output, setOutput] = useState<any>();
  const [outputLoading, setOutputLoading] = useState(false);
  const [loading, setLoading] = useState<any>(true);
  const [question, setQuestion] = useState<any>(null);
  const { USER, setUSER } = useAuth() as AuthProps;
  const [submissionResult, setSubmissionResult] = useState<any>(false);
  const [result, setResult] = useState<any>(false);

  useEffect(() => {
    if (question) document.title = `${question.title}`;
    else document.title = `CodeVerse`;
  }, [question]);

  useEffect(() => {
    if (!submissionResult) return;
    const { stdout, time } = submissionResult;
    let correct_count = 0;
    if (stdout && stdout.includes("%break%")) {
      const stdout1 = stdout.split("%break%")[1];
      if (stdout1.includes("|")) {
        const stdout2 = stdout1.split("|");
        for (let res of stdout2) if (res == "1") correct_count++;
      }
    }

    setResult({
      status: correct_count == 10,
      runtime: time,
      correctOutputs: correct_count,
      totalOutputs: 10,
      points: USER.stats.points,
      pointsToAdd: question.solved ? 0 : (question.difficulty + 1) * 2,
    });

    const updateQuestionSolvedHelper = async () => {
      const DATA = await updateQuestionSolved(
        USER,
        question.qid,
        question.difficulty,
        correct_count == 10
      );
      DATA && setUSER(DATA);
    };
    updateQuestionSolvedHelper();

    correct_count == 10 &&
      !question.solved &&
      setQuestion({ ...question, solved: true });
  }, [submissionResult]);

  useEffect(() => {
    const getQuestionHelper = async (Qno: number) => {
      try {
        const question = await getQuestion(Qno);
        if (USER && question) {
          setQuestion({
            ...question,
            solved: USER.stats.solvedQuestionsSet.includes(Qno),
          });
        } else if (question) {
          setQuestion({ ...question, solved: false });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getQuestionHelper(Qno);
  }, [Qno, USER]);

  return (
    <div>
      {!loading && !question && (
        <div className="solve">
          <h3>Invalid Question</h3>
        </div>
      )}
      {!loading && question && (
        <>
          {result && (
            <SubmisionPopUp
              result={result}
              setResult={setResult}
            ></SubmisionPopUp>
          )}
          <Split
            className="solve scrollable"
            sizes={[40, 60]}
            minSize={[300, 500]}
            expandToMin={false}
            gutterSize={8}
            gutterAlign="center"
            snapOffset={0}
            dragInterval={1}
            direction="horizontal"
            cursor="ew-resize"
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
              <Question question={question} />
              <Output
                expandOutput={setLeftDivSize}
                output={output}
                question={question}
                loading={outputLoading}
              />
            </Split>
            <CodeBox
              expandOutput={setLeftDivSize}
              setOutput={setOutput}
              question={question}
              user={USER}
              setOutputLoading={setOutputLoading}
              setSubmitionResult={setSubmissionResult}
            />
          </Split>
        </>
      )}
    </div>
  );
};

export default Solve;

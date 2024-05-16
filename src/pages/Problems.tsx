import { Link } from "react-router-dom";
import Sort from "../assets/sort.png";
import Solved from "../assets/solved.png";
import { useEffect, useState } from "react";
import { AuthProps } from "../../helpers/types";
import { sortFunctions } from "../../helpers/logics";
import { getAllQuestions } from "../database/store";
import { useAuth } from "../components/Auth";

const Problemset = () => {
  const [order, setOrder] = useState("");
  const [questions, setQuestions] = useState<any>();
  const [loading, setLoading] = useState(true);
  const { USER } = useAuth() as AuthProps;

  const difficulty = ["Easy", "Medium", "Hard"];

  useEffect(() => {
    const getQuestionHelper = async () => {
      try {
        let set: any = [];
        if (USER && USER.stats && USER.stats.solvedQuestionsSet)
          set = USER.stats.solvedQuestionsSet;

        let tempQuestions = questions;
        if (!questions) tempQuestions = await getAllQuestions();
        setQuestions(
          tempQuestions.map((Q: any) => ({ ...Q, status: set.includes(Q.qid) }))
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getQuestionHelper();
  }, [USER]);

  const handleClick = (event: any) => {
    const { id } = event.target.id ? event.target : event.target.parentNode;
    const sort_factor =
      id == "status" ? "status" : id == "difficulty" ? "difficulty" : "qid";

    sortFunctions[sort_factor].sort(questions);
    setOrder(`${id}${sortFunctions[sort_factor].sign}`);
  };

  return (
    <div className="problems">
      {loading && <span className="loader"></span>}
      {!loading && (
        <>
          <div className="problem-header p-head-row">
            <div id="status" className="p-status p-head" onClick={handleClick}>
              Status
              <img src={Sort} alt="" />
            </div>
            <div id="qid" className="p-title p-head" onClick={handleClick}>
              Title
              <img src={Sort} alt="" />
            </div>
            <div
              id="difficulty"
              className="p-difficulty p-head"
              onClick={handleClick}
            >
              Difficulty
              <img src={Sort} alt="" />
            </div>
          </div>
          {questions.map((question: any) => (
            <Link
              to={`../solve/${question.qid}`}
              key={question.qid}
              className="p-row link"
            >
              <p className="p-status">
                {question.status && <img src={Solved} />}
              </p>
              <div className="p-title">
                {question.qid}.{question.title}
              </div>
              <p className={`p-difficulty ${difficulty[question.difficulty]}`}>
                {difficulty[question.difficulty]}
              </p>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default Problemset;

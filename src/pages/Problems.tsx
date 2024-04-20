import { Link } from "react-router-dom";
import Sort from "../assets/sort.png";
import Solved from "../assets/solved.png";
import { useEffect, useState } from "react";
import { questionProps } from "../../helpers/types";
import { sort_functions } from "../../helpers/logics";

// temporary data ---
const questions: questionProps[] = [
  { id: 1, title: "Find the Duplicate Number", difficulty: 1 },
  { id: 2, title: "Two Sum", difficulty: 0 },
  { id: 3, title: "Add Two Numbers", difficulty: 1 },
  { id: 4, title: "Palindrome Number", difficulty: 0, status: 1 },
  { id: 5, title: "First Missing Positive", difficulty: 2 },
  { id: 6, title: "Sqrt(x)", difficulty: 0, status: 1 },
  { id: 7, title: "Pow(x, n)", difficulty: 1 },
];
// temporary data---

const Problemset = () => {
  const [order, setOrder] = useState("");
  useEffect(() => {}, [order]);

  const difficulty = ["Easy", "Medium", "Hard"];

  const handleClick = (event: any) => {
    const { id } = event.target.id ? event.target : event.target.parentNode;
    const sort_factor =
      id == "status" ? "status" : id == "difficulty" ? "difficulty" : "id";

    sort_functions[sort_factor].sort(questions);
    setOrder(`${id}${sort_functions[sort_factor].sign}`);
  };

  return (
    <div className="problems">
      <>
        <div className="problem-header p-head-row">
          <div id="status" className="p-status p-head" onClick={handleClick}>
            Status
            <img src={Sort} alt="" />
          </div>
          <div id="id" className="p-title p-head" onClick={handleClick}>
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
        {questions.map((question) => (
          <Link
            to={`../solve/${question.id}`}
            key={question.id}
            className="p-row link"
          >
            <p className="p-status">
              {question.status && <img src={Solved} />}
            </p>
            <div className="p-title">
              {question.id}.{question.title}
            </div>
            <p className={`p-difficulty ${difficulty[question.difficulty]}`}>
              {difficulty[question.difficulty]}
            </p>
          </Link>
        ))}
      </>
    </div>
  );
};

export default Problemset;

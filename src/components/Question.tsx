import {} from "react";
import { useLocation } from "react-router-dom";
import { questions } from "../../helpers/questions";

const Question = () => {
  const { pathname } = useLocation();
  const Qno = Number(pathname.split("/")[2]);

  const {
    id,
    title,
    question,
    difficulty,
    solved,
    examples,
    images,
    constraints,
    topics,
  } = questions[Qno - 1];
  return (
    <div className="question">
      <div className="q-head">
        <h2 className="q-title">
          {id + ". "}
          {title}
        </h2>
        <div>
          <small className={solved ? "Solved" : "Unsolved"}>
            {solved ? "Solved" : "Unsolved"}
          </small>
          <small className={difficulty}>{difficulty}</small>
        </div>
      </div>

      <p className="q-question">{question}</p>
      {images &&
        images.map((img, index) => <img src={img} alt="abc" key={index} />)}

      {examples &&
        examples.map((example, index) => (
          <div className="example" key={index}>
            <h5>Example {index + 1}:</h5>
            <ul>
              <dl>
                <strong>Input: </strong>
                {example.input}
              </dl>
              <dl>
                <strong>Output: </strong>
                {example.output}
              </dl>
            </ul>
          </div>
        ))}

      {constraints && constraints.length && (
        <div>
          <h5 className="q-constraints">Constraints:</h5>
          <ul className="constraints">
            {constraints.map((constraint, index) => {
              return <li key={index}>{constraint}</li>;
            })}
          </ul>
        </div>
      )}

      {topics && (
        <div>
          <h5>Topics:</h5>
          <div className="q-topic blur">
            {topics &&
              topics.map((topic, index) => <small key={index}>{topic}</small>)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Question;

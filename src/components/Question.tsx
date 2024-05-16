const Question = ({ question }: any) => {
  const difficulty = ["Easy", "Medium", "Hard"];
  
  return (
    <div className="question">
      <div className="q-head">
        <h2 className="q-title">
          {question.qid + ". "}
          {question.title}
        </h2>
        <div>
          <small className={question.solved ? "Solved" : "Unsolved"}>
            {question.solved ? "Solved" : "Unsolved"}
          </small>
          <small className={difficulty[question.difficulty]}>
            {difficulty[question.difficulty]}
          </small>
        </div>
      </div>

      <div className="q-question">
        {question.description.map((p: string, i: number) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      {/* {images &&
        images.map((img, index) => <img src={img} alt="abc" key={index} />)} */}

      {question.examples.map((example: any, i: number) => (
        <div className="example" key={i}>
          <h5>Example {i + 1}:</h5>
          <ul>
            <dl>
              <strong>Input: </strong>
              <span>{example.input}</span>
            </dl>
            <dl>
              <strong>Output: </strong>
              <span>{example.output}</span>
            </dl>
          </ul>
        </div>
      ))}

      {question.constraints && question.constraints.length && (
        <div>
          <h5 className="q-constraints">Constraints:</h5>
          <ul className="constraints">
            {question.constraints.map((constraint: string, i: number) => {
              return <li key={i}>{constraint}</li>;
            })}
          </ul>
        </div>
      )}

      {question.topics && (
        <div>
          <h5>Topics:</h5>
          <div className="q-topic blur">
            {question.topics &&
              question.topics.map((topic: string, i: number) => (
                <small key={i}>{topic}</small>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Question;

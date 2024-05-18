const SubmisionPopUp = ({ setResult, result }: any) => {
  return (
    <div className={`submission-tab ${result.status ? "green" : "red"}`}>
      <div className="submission">
        <span className="hide-submission" onClick={() => setResult(false)}>
          &#x2715;
        </span>
        <h1>{result.status ? "Accepted" : "Wrong Answer"}</h1>
        <div className={`result`}>
          <div>
            <small>Language</small>
            <strong className="monospace">
              {localStorage.getItem("prefered-coding-language")}
            </strong>
          </div>
          <div>
            <small>
              Test Cases
              <i>
                <small> (hidden)</small>
              </i>
            </small>
            <strong className="monospace">
              {result.correctOutputs}/{result.totalOutputs}
            </strong>
          </div>
          <div>
            <small>Runtime</small>
            <strong className="monospace">{result.runtime}s</strong>
          </div>
        </div>
        {result.status && (
          <div className="points">
            <strong className="monospace">
              {result.points}+=
              {result.pointsToAdd}
            </strong>
            <p>
              Total Points:{"  "}
              <span className="monospace">
                {result.points + result.pointsToAdd}
              </span>
            </p>
            <small>
              &#9432;{" "}
              <i>You earn points only for your first correct submission.</i>
            </small>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmisionPopUp;

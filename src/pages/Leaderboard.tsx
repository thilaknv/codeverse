import { Link } from "react-router-dom";
import Propic from "../assets/react.svg";
import { useAuth } from "../components/Auth";
import { AuthProps } from "../../helpers/types";

const Leaderboard = () => {
  const { currentUser } = useAuth() as AuthProps;
  console.log("leaderboard");
  // -- temporary data
  // rank username points solved
  const myId = 10;
  const list: {
    id: number;
    propic: string | null;
    username: string;
    points: number;
    solved: number;
  }[] = [
    { id: 1, propic: null, username: "Ava", points: 100, solved: 25 },
    { id: 2, propic: null, username: "Max", points: 92, solved: 30 },
    { id: 3, propic: null, username: "Leo", points: 79, solved: 20 },
    { id: 4, propic: null, username: "Zoe", points: 75, solved: 25 },
    { id: 10, propic: Propic, username: "Binod", points: 76, solved: 25 },
    { id: 5, propic: null, username: "Sam", points: 70, solved: 30 },
    { id: 6, propic: null, username: "Ivy", points: 69, solved: 20 },
    { id: 7, propic: null, username: "Eli", points: 58, solved: 25 },
    { id: 8, propic: null, username: "Liv", points: 40, solved: 30 },
    { id: 9, propic: null, username: "Ben", points: 35, solved: 20 },
    { id: 11, propic: null, username: "Ana", points: 10, solved: 30 },
    { id: 12, propic: null, username: "Luke", points: 20, solved: 5 },
  ];
  // -- temporary data

  return (
    <div className="leaderboard">
      <h2> Leaderboard</h2>
      <div className="container">
        {list.map((user, index) => (
          <div
            key={index}
            className={user.id == myId ? "user highlight" : "user"}
          >
            <div className="user-info">
              <h3>{`#${index + 1}`}</h3>
              {user.propic && <img className="user-pic" src={user.propic} />}
              {!user.propic && <p className="user-pic">{user.username[0]}</p>}

              <div className="user-name-div">
                <small>Username</small>
                <Link
                  to={`/profile/${user.username}`}
                  className="link user-name"
                >
                  {user.username}
                </Link>
              </div>
            </div>

            <div className="user-points-div">
              <small>Points</small>
              <p className="user-points">{user.points}</p>
            </div>

            <div className="user-solved-div">
              <small>Solved</small>
              <p className="user-solved">{user.solved}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;

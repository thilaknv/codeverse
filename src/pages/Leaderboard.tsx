import { Link } from "react-router-dom";
import DefaultProfilePic from "../assets/profile.png";
import { useAuth } from "../components/Auth";
import { AuthProps } from "../../helpers/types";
import { useEffect, useState } from "react";
import { getAllUsers } from "../database/store";
import { sortUsersOnPoints } from "../../helpers/logics";

const Leaderboard = () => {
  const { USER } = useAuth() as AuthProps;
  const [loading, setLoading] = useState(true);
  const [USERS_LIST, setUSERS_LIST] = useState<any[]>();
  const [MY_UID, setMY_UID] = useState(null);

  useEffect(() => {
    setMY_UID(USER && USER.uid ? USER.uid : null);
    const fetchData = async () => {
      try {
        let list: any[] = [];
        list = await getAllUsers();
        sortUsersOnPoints(list);
        setUSERS_LIST(list);
        setLoading(false);
      } catch (error) {
        // Handle errors
        setLoading(false);
      }
    };
    fetchData();
  }, [USER]);

  return (
    <div className="leaderboard">
      <h2> Leaderboard</h2>
      <div className="container">
        {loading && <span className="loader"></span>}
        {!loading &&
          USERS_LIST &&
          USERS_LIST.map((user, index) => (
            <div
              key={index}
              className={user.uid == MY_UID ? "user highlight" : "user"}
            >
              <div className="user-info">
                <h3>{`${index + 1}`}</h3>
                <Link to={`/profile/${user.username}`}>
                  {user.photoURL && (
                    <img className="user-pic" src={" " + user.photoURL} />
                  )}
                  {!user.photoURL && (
                    <img className="user-pic" src={DefaultProfilePic} />
                  )}
                </Link>

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
                <p className="user-points">{user.stats.points}</p>
              </div>

              <div className="user-solved-div">
                <small>Solved</small>
                <p className="user-solved">
                  {user.stats.solvedQuestionsSet.length}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Leaderboard;

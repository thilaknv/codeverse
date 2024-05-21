import { useEffect, useState } from "react";

import DefalutPhoto from "../assets/profile.png";
import Linkedin from "../assets/linkedin1.png";
import Github from "../assets/github1.png";
import Twitter from "../assets/twitter1.png";
import UsersWebsite from "../assets/users-website1.png";
import Edit from "../assets/edit-pencile.png";
import ProgressBar from "../components/ProgressBar";
import { AuthProps } from "../../helpers/types";
import { useAuth } from "../components/Auth";
import { getUser } from "../database/store";

const Profile = () => {
  const { USER } = useAuth() as AuthProps;
  const [currUSER, setCurrUSER] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUserHelper = async () => {
      const loc = window.location.pathname.split("/");
      if (loc.length == 3) {
        const username = loc[2];
        try {
          const newUser = await getUser("username", username);
          setCurrUSER(newUser);
        } catch (error) {
          console.error(error);
        }
      }
    };

    setLoading(true);
    getUserHelper().then(() => {
      setLoading(false);
    });
  }, []);

  // temporary data
  const Q_data = {
    totalCount: 7,
    easyCount: 1,
    mediumCount: 4,
    hardCount: 2,
  };
  // temporary data

  return (
    <div className="profile">
      {loading && (
        <div>
          <span className="loader"></span>
        </div>
      )}
      {!loading && !currUSER && <h2>User Not Found</h2>}
      {!loading && currUSER && (
        <>
          <div className="p-div1">
            {USER.username == currUSER.username && (
              <img className="edit" src={Edit} />
            )}
            <img
              src={currUSER.photoURL ? currUSER.photoURL : DefalutPhoto}
              className="profile-pic"
            />
            <h4 className="username">@{currUSER.username}</h4>
            {/* <hr /> */}
            <div className="social-accounts">
              <a
                className={!currUSER.socialAccounts?.github ? `disabled-a` : ""}
                href={
                  currUSER.socialAccounts?.github
                    ? `https://github.com/${currUSER.socialAccounts.github}`
                    : "/"
                }
              >
                <img src={Github} />
              </a>
              <a
                className={
                  !currUSER.socialAccounts?.linkedin ? `disabled-a` : ""
                }
                href={
                  currUSER.socialAccounts?.linkedin
                    ? `https://www.linkedin.com/in/${currUSER.socialAccounts.linkedin}`
                    : "/"
                }
              >
                <img src={Linkedin} />
              </a>
              <a
                className={
                  !currUSER.socialAccounts?.twitter ? `disabled-a` : ""
                }
                href={
                  currUSER.socialAccounts?.twitter
                    ? `https://x.com/${currUSER.socialAccounts.twitter}`
                    : "/"
                }
              >
                <img src={Twitter} />
              </a>
              <a
                className={
                  !currUSER.socialAccounts?.website ? `disabled-a` : ""
                }
                href={
                  currUSER.socialAccounts?.website
                    ? `https://${currUSER.socialAccounts.website}`
                    : "/"
                }
              >
                <img src={UsersWebsite} />
              </a>
            </div>
          </div>
          <div className="p-div2">
            <h3>Stats</h3>
            <div className="stats">
              <div className="total-points stats-div">
                <p>Total Points</p>
                <h3>{currUSER.stats.points}</h3>
              </div>
              <div className="solved stats-div">
                <p>Solved</p>
                <h3>
                  {Number(
                    (
                      (currUSER.stats.solvedQuestionsSet.length * 100) /
                      Q_data.totalCount
                    ).toFixed(1)
                  )}
                  %
                </h3>
              </div>
              <div className="accuracy stats-div">
                <p>Accuracy</p>
                <h3>
                  {currUSER.stats.uniqueRejections +
                    currUSER.stats.uniqueAcceptence !=
                  0
                    ? Number(
                        (
                          (currUSER.stats.uniqueAcceptence * 100) /
                          (currUSER.stats.uniqueRejections +
                            currUSER.stats.uniqueAcceptence)
                        ).toFixed(1)
                      )
                    : 0}
                  %
                </h3>
              </div>
              <div className="solved-e-m-h stats-div">
                <ProgressBar
                  value={Math.floor(
                    (currUSER.stats.solvedDifficultyCount[0] * 100) /
                      Q_data.easyCount
                  )}
                  color={"#2a9d8f"}
                  difficulty={"Easy"}
                />
                <ProgressBar
                  value={Math.floor(
                    (currUSER.stats.solvedDifficultyCount[1] * 100) /
                      Q_data.mediumCount
                  )}
                  color={"#e1a306"}
                  difficulty={"Medium"}
                />
                <ProgressBar
                  value={Math.floor(
                    (currUSER.stats.solvedDifficultyCount[2] * 100) /
                      Q_data.hardCount
                  )}
                  color={"#d62828"}
                  difficulty={"Hard"}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;

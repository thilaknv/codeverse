import { HashLink } from "react-router-hash-link";
import LandingIMG from "../assets/landing-page-coding.png";
import JavaVector from "../assets/java-vector.png";
import PythonVector from "../assets/python-vector.png";
import CppVector from "../assets/cpp-vector.png";
import ProbList from "../assets/prob-list.png";
import TrackProgress from "../assets/stats-vector.png";
import LeaderBoardVector from "../assets/leaderboard-vector.png";
import Github from "../assets/github1.png";
import Linkdein from "../assets/linkedin1.png";
import Twitter from "../assets/twitter1.png";
import { useAuth } from "../components/Auth";
import { AuthProps } from "../../helpers/types";
import TypeWriter from "../components/TypeWriter";
import { Link } from "react-router-dom";

const About = () => {
  const { USER } = useAuth() as AuthProps;
  return (
    <div className="landing-page">
      <div className="wellcome">
        <div className="landing-img">
          <img src={LandingIMG} />
        </div>
        <div className="title-slogan">
          <HashLink to="#about" className="link" smooth>
            <h1 className="title">CodeVerse</h1>
          </HashLink>
          <p className="slogan">
            Better way to <TypeWriter />
          </p>
          {!USER && (
            <Link className="link button" to={"/register"}>
              <h3>Create Account</h3>
            </Link>
          )}
          {USER && (
            <Link className="link button" to={"/problems"}>
              <h3>Solve Problems -&gt;</h3>
            </Link>
          )}
        </div>
      </div>
      <div className="why-codeverse">
        <h2 id="about">About</h2>
        <div className="variety-of-questions">
          <div className="imgs">
            <img src={ProbList} />
          </div>
          <p>
            Tackle a diverse range of Data Structures and Algorithm problems.
          </p>
        </div>
        <div className="support-languages">
          <div className="imgs">
            <img src={CppVector} />
            <img src={JavaVector} />
            <img src={PythonVector} />
          </div>
          <p>
            Supports multiple programming languages such as C++, Java, Python.
          </p>
        </div>
        <div className="tract-progress">
          <div className="imgs">
            <img src={TrackProgress} />
          </div>
          <p>Stats to monitor and track your progress</p>
        </div>
        <div className="leaderboard-feature">
          <div className="imgs">
            <img src={LeaderBoardVector} />
          </div>
          <p>Engage with a leaderboard feature to compare your performance.</p>
        </div>
      </div>
      <div className="footer">
        <div className="social-media">
          <a href="https://github.com/thilaknv/codeverse">
            <img src={Github} />
          </a>
          <a href="#">
            <img src={Linkdein} />
          </a>
          <a href="#">
            <img src={Twitter} />
          </a>
        </div>
        <p>Copyright &copy; 2024 Codeverse</p>
      </div>
    </div>
  );
};

export default About;

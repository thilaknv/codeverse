import Github from "../assets/github1.png";
import Linkdein from "../assets/linkedin1.png";
import Twitter from "../assets/twitter1.png";

const Footer = () => {
  return (
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
  );
};

export default Footer;

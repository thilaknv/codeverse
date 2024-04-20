import { Link } from "react-router-dom";
import ProfPic from "../assets/react.svg";
import Logo from "../assets/logo.svg";
import LightMode from "../assets/light_mode.png";
import DarkMode from "../assets/dark_mode.png";
import { useEffect, useState } from "react";
import { changeTheme, themeColors } from "../../helpers/logics";
import { useAuth } from "./Auth";
import { AuthProps } from "../../helpers/types";

const NavBar = () => {
  // -- try using false
  // dark-theme --> true
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(themeColors.currentTheme);

  const { currentUser, logout } = useAuth() as AuthProps;
  const authenticated = currentUser != null;

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    changeTheme(theme);
  }, [theme]);

  return (
    <div className="header">
      <div className="header-left">
        <img className="logo" src={Logo} alt="" />
        <Link className="link" to={"/problems"}>
          Problems
        </Link>
        <Link className="link" to={"/"}>
          About
        </Link>
        {authenticated && (
          <Link className="link" to={"/leaderboard"}>
            Leaderboard
          </Link>
        )}
      </div>
      <div className="header-right">
        {!loading && authenticated && (
          <div className="header-profile">
            {/* profile pic */}
            <img
              src={ProfPic}
              alt=""
              onClick={() => {
                logout();
              }}
            />
          </div>
        )}
        {!loading && !authenticated && (
          <div>
            <Link className="link" to={"/register"}>
              Register
            </Link>
            <small> or </small>
            <Link className="link" to={"/login"}>
              Login
            </Link>
          </div>
        )}
        <div className={`theme-icon ${theme ? "light" : "dark"}`}>
          <img
            src={theme ? LightMode : DarkMode}
            alt=""
            onClick={() => {
              setTheme(!theme);
              // needs to reload to change theme of monaco editor
              // location.reload();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;

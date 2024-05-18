import { Link, useLocation } from "react-router-dom";
import DefaultProfilePic from "../assets/profile.png";
import Logo from "../assets/logo.svg";
import LightMode from "../assets/light_mode.png";
import DarkMode from "../assets/dark_mode.png";
import { useEffect, useState } from "react";
import {} from "../../helpers/logics";
import { useAuth } from "./Auth";
import { AuthProps } from "../../helpers/types";
import { ThemeContextProps, useTheme } from "./Theme";

const NavBar = () => {
  const [loading, setLoading] = useState(true);
  const { USER, logout } = useAuth() as AuthProps;
  const { theme, setTheme } = useTheme() as ThemeContextProps;
  const { pathname } = useLocation();

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <div className="header">
      <div className="header-left">
        <img className="logo" src={Logo} alt="" />
        <Link className="link" to={"/problems"}>
          Problems
        </Link>
        {USER && (
          <Link className="link" to={"/leaderboard"}>
            Leaderboard
          </Link>
        )}
        <Link className="link" to={"/"}>
          About
        </Link>
      </div>
      <div className="header-right">
        {!loading && USER && (
          <div className="header-profile auth-tab">
            {USER && (
              <Link to={`/profile/${USER.username}`} className="profile-pic">
                <img
                  src={`${USER.photoURL ? USER.photoURL : DefaultProfilePic}`}
                />
              </Link>
            )}
            <span onClick={() => logout()}>Logout</span>
          </div>
        )}
        {!loading && !USER && (
          <div className=" auth-tab">
            <Link className="link" to={`/register?redirect=${pathname}`}>
              Register
            </Link>
            <small> or </small>
            <Link className="link" to={`/login?redirect=${pathname}`}>
              Login
            </Link>
          </div>
        )}
        <div className={`theme-icon ${theme ? "light" : "dark"}`}>
          <img
            src={theme ? LightMode : DarkMode}
            onClick={() => setTheme(!theme)}
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;

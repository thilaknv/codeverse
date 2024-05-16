import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Google from "../assets/google.png";
import { useAuth } from "../components/Auth";
import { AuthProps } from "../../helpers/types";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(" ");
  const { signInWithEmail, signInWithGoogle } = useAuth() as AuthProps;
  const [successfull, setSuccessfull] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

  useEffect(() => {
    if (successfull) {
      if (redirect.includes("/login") || redirect.includes("/register"))
        navigate("/");
      else navigate(redirect);
    }
  }, [successfull]);

  const handleChange = (event: any) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (loading) return;
    setErrorMessage(" ");
    const { email, password } = inputs;

    if (!email || email.length < 11 || !email.includes("@gmail.com"))
      return setErrorMessage("Invalid Email");
    if (!password || password.length < 6)
      return setErrorMessage("Password should have 8 characters or more.");

    setLoading(true);
    (await signInWithEmail(email, password, setErrorMessage)) &&
      setSuccessfull(true);
    setLoading(false);
  };

  const signInWithGoogleHelper = async () => {
    if (loading) return;

    setLoading(true);
    (await signInWithGoogle()) && setSuccessfull(true);
    setLoading(false);
  };

  return (
    <div className="login">
      {loading && <span className="loader"></span>}
      <form action="" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <small className="error-message">{errorMessage}</small>
        <button disabled={loading}>Login</button>
        <Link
          className="link"
          to={`/register?redirect=${encodeURIComponent(redirect)}`}
        >
          Don't have an account?
        </Link>
        {/* Ignore */}
        <div className="divider">
          <small className="hr">
            <hr />
          </small>
          <small>or</small>
          <small className="hr">
            <hr />
          </small>
        </div>
        {/* Ignore */}
        <p>Sign in with</p>
        <div className="auth-other">
          <img
            src={Google}
            alt=""
            className="auth-img"
            onClick={signInWithGoogleHelper}
          />
        </div>
      </form>
    </div>
  );
};

export default Login;

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Google from "../assets/google.png";
import { useAuth } from "../components/Auth";
import { AuthProps } from "../../helpers/types";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [errorMessage, setErrorMessage] = useState(" ");
  const { signUpWithEmail, signInWithGoogle } = useAuth() as AuthProps;
  const [successfull, setSuccessfull] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

  const handleChange = (event: any) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const signUpWithEmailHelper = async (event: any) => {
    event.preventDefault();
    if (loading) return;

    setErrorMessage(" ");
    const { password, email, confirmpassword } = inputs;
    if (!email || email.length < 11 || !email.includes("@gmail.com"))
      return setErrorMessage("Invalid Email");
    if (!password || password.length < 6)
      return setErrorMessage("Password should have 6 characters or more.");
    if (!confirmpassword || password != confirmpassword)
      return setErrorMessage("Passwords do not match.");

    setLoading(true);
    (await signUpWithEmail(email, password, setErrorMessage)) &&
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
    <div className="register">
      {loading && <span className="loader"></span>}
      <form action="" onSubmit={signUpWithEmailHelper}>
        <h2>Register</h2>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Create Password"
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmpassword"
          id="confirmpassword"
          placeholder="Confirm Password"
          onChange={handleChange}
        />
        <small className="error-message">{errorMessage}</small>
        <button disabled={loading}>Register</button>

        <Link className="link" to="/login">
          Already have an account?
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
          {/* <img src={Github} alt="" className="auth-img" /> */}
        </div>
      </form>
    </div>
  );
};

export default Register;

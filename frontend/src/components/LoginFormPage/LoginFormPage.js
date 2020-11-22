import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link} from "react-router-dom";
import './LoginFormPage.style.css'



const LoginFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (!sessionUser) {
    document.title = "JustStocks - Login";
  }

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
      setErrors([]);
      return dispatch(sessionActions.login({ credential, password })).catch(
        (res) => {
          if (res.data && res.data.errors) setErrors(res.data.errors);
        });
  };

  return (
    <div className="loginform_container">
      <form onSubmit={handleSubmit} className="home_content-form">
        <div>
          <div className="login-error-box">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </div>
        </div>
        <div className="form">
          <h1>
            <Link className="loginform_title" to="/">JustStocks</Link>
          </h1>
          <h2 className="loginform_subheading">Login</h2>
          <div className="form_input-container">
            <label>Username or Email</label>
            <input
              placeholder="Enter Username or Email"
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
            />
          </div>
          <div className="form_input-container">
            <label>Password</label>
            <input
              placeholder="Enter Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form_input-container">
            <button className="loginbtn" type="submit">
              Log In
            </button>
          </div>
        </div>
        <span>
          Not a member?{" "}
          <Link to="/register" className="register_link">
            Register
          </Link>
        </span>
      </form>
    </div>
  );
}

export default LoginFormPage;

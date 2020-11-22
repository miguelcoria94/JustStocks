import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./DefaultHomePage.style.css";


function DefaultHomePage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
      e.preventDefault();
      if (password === confirmPassword) {
        setErrors([]);
        return dispatch(
          sessionActions.signup({ email, username, password })
        ).catch((res) => {
          if (res.data && res.data.errors) setErrors(res.data.errors);
        });
      }
      return setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    };

    return (
      <div className="HomeDefault_container">
        <div className="DefaultHome_container">
          <h1 className="DefaultHome_title">What we offer</h1>
        </div>
        <div className="registerform_container">
          <form onSubmit={handleSubmit} className="registerhome_content-form">
            <div className="registerform">
              <div>
                <div className="register-login-error-box">
                  {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                  ))}
                </div>
              </div>
              <h1>
                <Link className="registerform_title" to="/">
                  JustStocks
                </Link>
              </h1>
              <h2 className="registerform_subheading">Register</h2>
              <div className="form_input-container">
                <label>Email</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form_input-container">
                <label>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form_input-container">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form_input-container">
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="form_input-container">
                <button className="registerbtn" type="submit">
                  Register
                </button>
              </div>
            </div>
          </form>
          <span>
            Already a member?{" "}
            <Link to="/login" className="register_link">
              Login
            </Link>
          </span>
        </div>
      </div>
    );
}

export default DefaultHomePage
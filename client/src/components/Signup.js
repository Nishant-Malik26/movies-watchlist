import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../store/authSlice";
import { useDispatch } from "react-redux";

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ username, password }));
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid-container">
        <section className="landingImage">
          <div className="grid-child purple">
            <div className="leftContainer">
              <p className="landingSubheading">Glad to see you!</p>
              <p className="messageText">
                Dive into our curated collection of must-watch movies and
                discover your next favorite flick.
                <br /> Happy watching! 🍿✨
              </p>
            </div>
          </div>
        </section>
        <div className="grid-child green">
          <div className="rightContainer">
            <h2>Welcome to MovieWatch</h2>
            <div className="internalContainer">
              <div>Sign in to continue</div>
              <div className="not-member">
                Already a member?&nbsp;
                <Link to="/signin">Signin Now</Link>
              </div>
            </div>
            <div className="input-container">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
              <input
                type="password"
                value={password}
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="loginButton" type="submit">
              Signup
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

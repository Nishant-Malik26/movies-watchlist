import React from "react";
import { Link } from "react-router-dom";

export const Signup = () => {
  return (
    <div className="grid-container">
      <section className="landingImage">
        <div className="grid-child purple">
          <div className="leftContainer">
            <p className="landingSubheading">Glad to see you!</p>
            <p className="messageText">
              Dive into our curated collection of must-watch movies and discover
              your next favorite flick.
              <br /> Happy watching! 🍿✨
            </p>
          </div>
        </div>
      </section>
      <div className="grid-child green">
        <div className="rightContainer">
          <h2>Welcome to Company name</h2>
          <div className="internalContainer">
            <div>Sign in to continue</div>
            <div className="not-member">
              Not a member yet?&nbsp;
              <Link to="/register">Register Now</Link>
            </div>
          </div>
          <div className="input-container">
            <input placeholder="Enter email" />
            <input type="password" placeholder="Enter password" />
          </div>
          <div className="label">
            <label>
              <input type="checkbox"></input>
              Keep me logged in
            </label>
          </div>
          <button className="loginButton">Login</button>
        </div>
      </div>
    </div>
  );
};

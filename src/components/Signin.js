import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log("🚀 ~ Signin ~ isAuthenticated:", isAuthenticated);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginUser({ username, password }));
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/watchlist");
    }
  }, [isAuthenticated, navigate]);

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
            <h2>Welcome to Company name</h2>
            <div className="internalContainer">
              <div>Sign in to continue</div>
              <div className="not-member">
                Not a member yet?&nbsp;
                <Link to="/signup">Signup Now</Link>
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
              Login
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Signin;

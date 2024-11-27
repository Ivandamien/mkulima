// LoginPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle username input change
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // Handle form submission (redirect to password page)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username) {
      setError("Username is required!");
      return;
    }

    // Store the username in localStorage or pass it to the password page via state
    localStorage.setItem("username", username);

    // Redirect to the password page
    navigate("/password");
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="image-container">
          <img
            src="/assets/bg.png"
            alt="Farmer in the field"
            className="login-image"
          />
          <div className="logo-overlay">
            <img
              src="/assets/logo.png"
              alt="GO BANK Logo"
              className="logo-image"
            />
          </div>
        </div>
      </div>
      <div className="login-right">
        <div className="login-box">
          <div className="image-overlay">
            <img
              src="/assets/green-leaves-white-background.png"
              alt="Overlay"
            />
          </div>
          <h2>Welcome to</h2>
          <h1>Inua Mkulima - Subsidy Program</h1>
          <p>Enter your username to continue</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter Username"
              required
            />
            <div className="btn">
              <button type="submit" className="login-button">
                Continue <FaAngleRight />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

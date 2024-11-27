import React, { useState } from "react";
// import logo from "/assets/logo.png"; // Adjust the path to where the logo file is stored
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Get username from localStorage
  const username = localStorage.getItem("username");

  // Handle password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handle form submission (Login API call)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      setError("Password is required!");
      return;
    }

    setLoading(true);

    try {
      // Replace this with your actual login API URL
      const response = await axios.post("https://dummyjson.com/auth/login", {
        username,
        password,
      });
      console.log(response.data.accessToken);
      // If login is successful, redirect to dashboard
      if (response.data.accessToken) {
        localStorage.setItem("acessToken", response.data.accessToken); // Save the token
        console.log("Login successful, redirecting to dashboard...");
        navigate("/dashboard");
      }
    } catch (err) {
      // Handle login error
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="image-container">
          <img
            src="/assets/bg.png" // Replace with the appropriate image URL
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
          <h1>
            Inua Mkulima - <br />
            Subsidy Program
          </h1>
          <p>Enter your password to continue</p>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"} // Toggle between text and password
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter Password"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="password-toggle"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
                {/* Toggle between icons */}
              </button>
            </div>
            <div className="btn">
              <button type="submit" className="login-button" disabled={loading}>
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

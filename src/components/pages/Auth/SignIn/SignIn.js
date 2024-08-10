import React, { useState } from "react";
import "../styles/Sign.css";
import { SlArrowLeft } from "react-icons/sl";

const SignInView = () => {
  const [activeRole, setActiveRole] = useState('manager');

  return (
    <div className="sign-in-wrapper">
      <header>
        <button className="back-button"><SlArrowLeft /></button>
        <h2>Sign In</h2>
      </header>
      <h1>Welcome Back</h1>
      <p>Please enter your email address and password for login</p>
      <div className="role-selector">
        <button
          className={`role-button ${activeRole === 'manager' ? 'active' : ''}`}
          onClick={() => setActiveRole('manager')}
        >
          As Manager
        </button>
        <button
          className={`role-button ${activeRole === 'contractor' ? 'active' : ''}`}
          onClick={() => setActiveRole('contractor')}
        >
          As Contractor
        </button>
        <div className={`switch-background ${activeRole}`}></div>
      </div>
      <input type="email" placeholder="Email Address" value="albart.ainstain@gmail.com" className="input-field" />
      <input type="password" placeholder="Enter your password" className="input-field" />
      <a href="#" className="forgot-password">Forgot Password?</a>
      <button className="sign-in-button">Sign In</button>
      <div className="continue-with">
        <p>Continue with</p>
        <div className="social-buttons">
          <button className="apple-login"></button>
          <button className="google-login">G</button>
        </div>
      </div>
      <p className="sign-up-text">Not Registered Yet? <a href="#">Sign Up</a></p>
    </div>
  );
};

export default SignInView;

import React, { useState } from "react";
import "../styles/SignIn.css";
import { SlArrowLeft } from "react-icons/sl";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SignInView = () => {
  const [activeRole, setActiveRole] = useState('manager');
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/SignUp"); // Cambia "/new-page" por la ruta a la que deseas navegar
  };
   const handleBackButtonClick = () => {
    navigate(-1); // Redirige a la página anterior
  };

  return (
    <div className="sign-in-wrapper">
      <header>
        <button className="back-button" onClick={handleBackButtonClick}>
          <SlArrowLeft />
        </button>
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
      <input type="email" placeholder="Enter your Email" className="input-field" />
      <input type="password" placeholder="Enter your password" className="input-field" />
      <a href="#" className="forgot-password">Forgot Password?</a>
      <button className="sign-in-button" onClick={handleButtonClick}>Sign In</button>
      <div className="continue-with">
        <p>Continue with</p>
        <div className="social-buttons">
          <button className="apple-login"><FaApple />
</button>
          <button className="google-login"><FcGoogle />
</button>
        </div>
      </div>
      <p className="sign-up-text">Not Registered Yet? <a href="#">Sign Up</a></p>
    </div>
  );
};

export default SignInView;

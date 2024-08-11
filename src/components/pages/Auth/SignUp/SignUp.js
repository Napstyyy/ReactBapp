import React, { useState } from "react";
import "../styles/SignUp.css";
import { SlArrowLeft } from "react-icons/sl";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { FaApple } from "react-icons/fa";

const SignUpView = () => {
      const navigate = useNavigate(); // Hook para redirigir

  const handleButtonClick = () => {
    navigate("/Home"); // Cambia "/new-page" por la ruta a la que deseas navegar
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
        <h2>Sign Up</h2>
      </header>
      <h1>Create Account</h1>
      <p className="info-paragraph">Please enter your information and create your account</p>
      <input type="name" placeholder="Enter your full name" className="input-field" />
      <input type="email" placeholder="Enter your Email" className="input-field" />
      <input type="password" placeholder="Enter your password" className="input-field" />
      <button className="sign-in-button" onClick={handleButtonClick}>Sign Up</button>
      <div className="continue-with">
        <p>Continue with</p>
        <div className="social-buttons">
          <button className="apple-login"><FaApple />
</button>
          <button className="google-login"><FcGoogle />
</button>
        </div>
      </div>
      <p className="sign-up-text">Have an Account? <a href="#">Sign In</a></p>
    </div>
  );
};

export default SignUpView;

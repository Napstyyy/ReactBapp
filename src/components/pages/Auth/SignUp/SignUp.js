import React, { useState } from "react";
import "../styles/SignUp.css";
import { SlArrowLeft } from "react-icons/sl";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { FaApple } from "react-icons/fa";
import config from '../../../../server/config/config.js'; // Import the config

const SignUpView = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleButtonClick = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/auth/signup`, { // Use globalized API URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Signup successful! Please log in.');
        navigate('/SignIn'); // Navigate to SignIn page after successful signup
      } else {
        console.log('Signup failed:', data.message);
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert(`Failed to sign up: ${error.message}`);
    }
  };

  const handleBackButtonClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="sign-up-wrapper">
      <header>
        <button className="back-button" onClick={handleBackButtonClick}>
          <SlArrowLeft />
        </button>
        <h2>Sign Up</h2>
      </header>
      <h1>Create Account</h1>
      <p className="info-paragraph">Please enter your information and create your account</p>
      <input 
        type="text" 
        placeholder="Enter your full name" 
        className="input-field" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        type="email" 
        placeholder="Enter your Email" 
        className="input-field" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Enter your password" 
        className="input-field" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button className="sign-up-button" onClick={handleButtonClick}>Sign Up</button>
      <div className="continue-with">
        <p>Continue with</p>
        <div className="social-buttons">
          <button className="apple-login"><FaApple /></button>
          <button className="google-login"><FcGoogle /></button>
        </div>
      </div>
      <p className="sign-up-text">Have an Account? <a href="#" onClick={() => navigate('/SignIn')}>Sign In</a></p>
    </div>
  );
};

export default SignUpView;

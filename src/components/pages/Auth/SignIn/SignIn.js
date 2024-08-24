import React, { useState } from "react";
import "../styles/SignIn.css";
import { SlArrowLeft } from "react-icons/sl";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import config from '../../../../server/config/config'; // Import the config

const SignInView = () => {
  const [activeRole, setActiveRole] = useState('manager');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleButtonClick = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/auth/signin`, { // Use globalized API URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Sign-in successful!');
        // Save user info to state or local storage as needed
        navigate('/Home');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      alert('Failed to sign in');
    }
  };

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const handleSignUpClick = () => {
    navigate('/SignUp');
  };

  return (
    <div className="sign-in-wrapper">
      <header>
        <button className="back-button" onClick={handleBackButtonClick}>
          <SlArrowLeft />
        </button>
        <h2>Sign In</h2>
      </header>
      <h1 className="Welcome-back">Welcome Back</h1>
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
      <a href="#" className="forgot-password">Forgot Password?</a>
      <button className="sign-in-button" onClick={handleButtonClick}>Sign In</button>
      <div className="continue-with">
        <p>Continue with</p>
        <div className="social-buttons">
          <button className="apple-login"><FaApple /></button>
          <button className="google-login"><FcGoogle /></button>
        </div>
      </div>
      <p className="sign-up-text">
        Not Registered Yet? <a href="#" onClick={handleSignUpClick}>Sign Up</a>
      </p>
    </div>
  );
};

export default SignInView;

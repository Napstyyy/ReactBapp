// WelcomeView.js
import React from "react";
import "./styles/Welcome.css";
import welcomeImage from "../../../assets/images/Opentender-Logo-HD.png";
import phaseImage from "../../../assets/images/Welcome/Phase1.png";
import { useNavigate } from "react-router-dom";

const WelcomeView = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/Welcome1"); // Cambia "/new-page" por la ruta a la que deseas navegar
  };

  return (
    <div className="wrapper">
    <div className="welcome-container">
        <img src={welcomeImage} alt="Welcome" className="welcome-image" />
        <img src={phaseImage} alt="phase" className="phase-image" />
        <h1 className="welcome-title">Welcome!</h1>
        <p className="welcome-subtitle">
          Get Quotes | AI Comparison | Zero % Installment
        </p>
        <button className="welcome-button" onClick={handleButtonClick}>
          <span>Get Started</span>
        </button>
    </div>
    </div>
  );
};

export default WelcomeView;

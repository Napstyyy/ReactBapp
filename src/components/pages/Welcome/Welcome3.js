import React from "react";
import Welcome3 from "../../../assets/images/Welcome/Welcome3.png";
import Step3 from "../../../assets/images/Welcome/Step3.png";
import "./styles/Welcomes.css";
import CurvedButton from "./widgets/CurvedButton.js"; // Import the button component
import { useNavigate } from "react-router-dom";

const Welcome3View = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/SignIn");// Add navigation or any other action here
  };

  const handleSkipClick = () => {
    navigate("/SignIn"); // Replace with your target route
  };

  return (
    <div className="wrapper">
      <img src={Welcome3} alt="Welcome1" className="welcome-image" />
      <div className="padding-left">
        <div className="body-wrapper">
          <p className="text-left title">Compare Quotation</p>
          <p className="text-left text-quotation">Comparison of </p>
          <p className="text-left text-quotation">
             <span className="highlight-blue">Quotes</span> using AI{" "}
          </p>
          <p className="text-left text-quotation">technology</p>
        </div>
        <div className="footer-container">
          <div className="image-and-skip">
            <img src={Step3} alt="phase" className="phase-image" />
            <span className="skip-text" onClick={handleSkipClick}>
              Skip
            </span>
          </div>
        </div>
      </div>
      <div className="curved-button-container">
        <CurvedButton onClick={handleButtonClick} />
      </div>
    </div>
  );
};

export default Welcome3View;

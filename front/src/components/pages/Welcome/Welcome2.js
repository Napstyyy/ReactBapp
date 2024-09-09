import React from "react";
import Welcome2 from "../../../assets/images/Welcome/Welcome2.png";
import Step2 from "../../../assets/images/Welcome/Step2.png";
import "./styles/Welcomes.css";
import CurvedButton from "./widgets/CurvedButton.js"; // Import the button component
import { useNavigate } from "react-router-dom";

const Welcome2View = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/Welcome3");
    // Add navigation or any other action here
  };

  const handleSkipClick = () => {
    navigate("/SignIn"); // Replace with your target route
  };

  return (
    <div className="wrapper">
      <img src={Welcome2} alt="Welcome1" className="welcome-image" />
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
            <img src={Step2} alt="phase" className="phase-image" />
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

export default Welcome2View;

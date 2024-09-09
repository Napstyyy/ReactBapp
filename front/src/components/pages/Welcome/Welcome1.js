import React from "react";
import Welcome1 from "../../../assets/images/Welcome/Welcome1.png";
import Step1 from "../../../assets/images/Welcome/Step1.png";
import "./styles/Welcomes.css";
import CurvedButton from "./widgets/CurvedButton.js"; // Import the button component
import { useNavigate } from "react-router-dom";

const Welcome1View = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/Welcome2");
    // Add navigation or any other action here
  };

  const handleSkipClick = () => {
    navigate("/SignIn"); // Replace with your target route
  };

  return (
    <div className="wrapper">
      <img src={Welcome1} alt="Welcome1" className="welcome-image" />
      <div className="padding-left">
        <div className="body-wrapper">
          <p className="text-left title">Obtain Quotation</p>
          <p className="text-left text-quotation">Let's get you </p>
          <p className="text-left text-quotation">
            more <span className="highlight-blue">quotes</span> for{" "}
          </p>
          <p className="text-left text-quotation">your projects</p>
        </div>
        <div className="footer-container">
          <div className="image-and-skip">
            <img src={Step1} alt="phase" className="phase-image" />
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

export default Welcome1View;

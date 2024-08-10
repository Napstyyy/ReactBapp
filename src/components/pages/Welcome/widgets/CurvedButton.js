import React from "react";
import "../styles/CurvedButton.css";
import NextImage from "../../../../assets/images/Welcome/NextButton.png";

const CurvedButton = ({ onClick }) => {
  return (
    <button className="curved-button" onClick={onClick}>
      <img src={NextImage} alt="Next" />
    </button>
  );
};

export default CurvedButton;

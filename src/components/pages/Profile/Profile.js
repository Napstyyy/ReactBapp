import React, { useState } from "react";
import "../Auth/styles/SignUp.css";
import { SlArrowLeft } from "react-icons/sl";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { FaApple } from "react-icons/fa";
import { hasAnyMessage, updateHasAnyMessage } from "../../../context/globalVariables.js";
import CustomBottomNavigation from "../../widgets/CustomBottomNavigation";
import users from "../../../data/mockMessagesData.json";
import getUserNameById from "../../../context/globalVariables.js";
import "./styles/Profile.css"
import roundedLogo from "../../../assets/images/RoundedLogo.png";

const ProfileView = () => {
  const navigate = useNavigate(); 

  const [name, setName] = useState("Albert Ainstain");
  const [email, setEmail] = useState("Alberto@gmai.com");
  const [number, setNumber] = useState("12345678");

  const [isEditable, setIsEditable] = useState(false); // Estado para controlar la edición

  const handleButtonClick = () => {
    // Aquí podrías guardar los cambios si fuera necesario
    setIsEditable(false);
  };

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  return (
    <div className="sign-in-wrapper">
      <header>
        <button className="back-button" onClick={handleBackButtonClick}>
          <SlArrowLeft />
        </button>
        <h2>Profile</h2>
      </header>
      
      <img src={roundedLogo} alt="Rounded Logo" className="rounded-logo" />
      
      <h1>JMB DMELOR RESIDENCY</h1>
      <p className="idInfo">@cyberjaya</p>

      <button className={`edit-button ${isEditable ? "active" : ""}`} onClick={toggleEdit}>
        {isEditable ? "Cancel" : "Edit"}
      </button>

      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        className="input-field" 
        disabled={!isEditable} // Deshabilitar si no está en modo edición
      />
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        className="input-field" 
        disabled={!isEditable} // Deshabilitar si no está en modo edición
      />
      <input 
        type="text" 
        value={number} 
        onChange={(e) => setNumber(e.target.value)} 
        className="input-field" 
        disabled={!isEditable} // Deshabilitar si no está en modo edición
      />
      <button 
        className="sign-in-button" 
        onClick={handleButtonClick} 
        disabled={!isEditable} // Deshabilitar si no está en modo edición
      >
        Save
      </button>
      <CustomBottomNavigation hasAnyMessage={hasAnyMessage} name="Home" />
    </div>
  );
};

export default ProfileView;

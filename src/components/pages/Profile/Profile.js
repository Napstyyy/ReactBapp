import React, { useState, useEffect } from "react";
import "../Auth/styles/SignUp.css";
import { SlArrowLeft } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import CustomBottomNavigation from "../../widgets/CustomBottomNavigation";
import "./styles/Profile.css";
import roundedLogo from "../../../assets/images/RoundedLogo.png";
import { useUser } from '../../context/UserContext';
import config from '../../../server/config/config';

const ProfileView = () => {
  const navigate = useNavigate();
  const { userEmail } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");  
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/userData/users?email=${userEmail}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data && data.length > 0) {
          setName(data[0].name || "");
          setEmail(data[0].email || "");
          setPhoneNumber(data[0].phone_number || "");  
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userEmail]);

  const handleSaveClick = async () => {
  // Verificación si el email está vacío
  if (!email.trim()) {
    console.error("El campo de email no puede estar vacío.");
    return;
  }

  const updatedData = {
    name: name || email,
    phone_number: phoneNumber || "phone_number"
  };

  console.log("Datos que se envían en el PATCH:", updatedData);

  try {
    // Construir la URL con el parámetro de consulta email
    const url = `${config.apiUrl}/userData/users?email=${encodeURIComponent(userEmail)}`;

    // Enviar la solicitud PATCH
    const response = await fetch(url, {
      method: "PUT",  // Usar PATCH para actualizar parcialmente
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Error del servidor:", errorResponse);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("User updated successfully:", data);
    setIsEditable(false);
  } catch (error) {
    console.error("Error updating user data:", error);
  }
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

      <h1 className="HName">{name}</h1>
      <p className="idInfo">{email}</p>

      <button className={`edit-button ${isEditable ? "active" : ""}`} onClick={toggleEdit}>
        {isEditable ? "Cancel" : "Edit"}
      </button>

      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        className="input-field" 
        disabled={!isEditable} 
        placeholder="Name" 
      />
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        className="input-field" 
        disabled={!isEditable} 
        placeholder="Email" 
      />
      <input 
        type="text" 
        value={phoneNumber} 
        onChange={(e) => setPhoneNumber(e.target.value)}  
        className="input-field" 
        disabled={!isEditable} 
        placeholder="Phone Number" 
      />
      <button 
        className="sign-in-button" 
        onClick={handleSaveClick} 
        disabled={!isEditable}
      >
        Save
      </button>
      <CustomBottomNavigation hasAnyMessage={false} name="Home" />
    </div>
  );
};

export default ProfileView;

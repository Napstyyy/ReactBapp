// CustomBottomNavigation.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { HiOutlinePlus } from 'react-icons/hi2';
import GoHome from "../../assets/images/Home/home.png";
import Folder from "../../assets/images/Home/Folder.png";
import MessageIcon from "../../assets/images/Home/Message.png";
import ProfileIcon from "../../assets/images/Home/Profile.png";
import MessageNIcon from "../../assets/images/Home/MessageN.png";
import './styles/BottomNav.css';

const CustomBottomNavigation = ({ hasAnyMessage }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <BottomNavigation showLabels className="root">
      <BottomNavigationAction 
        className="button" 
        icon={<img src={GoHome} alt="Home" className="image" />} 
        onClick={() => handleNavigation("/Home")}
      />
      <BottomNavigationAction 
        className="button" 
        icon={<img src={Folder} alt="Folder" className="image" />} 
        onClick={() => handleNavigation("/projects")}  // Ejemplo de otra ruta
      />
      <BottomNavigationAction
        className="button"
        icon={
          <div className="roundButton">
            <HiOutlinePlus className="icon" />
          </div>
        }
        onClick={() => handleNavigation("/newProject")}  // Ejemplo de otra ruta
      />
      <BottomNavigationAction 
        className="button" 
        icon={hasAnyMessage ? <img src={MessageNIcon} alt="Message" className="image" /> : <img src={MessageIcon} alt="Message" className="image" />} 
        onClick={() => handleNavigation("/Chat")}
      />
      <BottomNavigationAction 
        className="button" 
        icon={<img src={ProfileIcon} alt="Profile" className="image" />} 
        onClick={() => handleNavigation("/profile")}  // Ejemplo de otra ruta
      />
    </BottomNavigation>
  );
};

export default CustomBottomNavigation;

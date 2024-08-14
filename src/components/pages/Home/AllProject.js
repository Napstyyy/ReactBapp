import React, { useState } from "react";
import "./styles/Home.css";
import "./styles/AllProject.css";
import mockData from "../../../data/mockData.json";
import { RxDashboard } from "react-icons/rx";
import NotificationIcon from "../../../assets/images/Home/notificationIcon.png";
import { BsArrowRightCircle } from "react-icons/bs";
import MessageIcon from "../../../assets/images/Home/Message.png";
import MessageNIcon from "../../../assets/images/Home/MessageN.png";
import GoImage from "../../../assets/images/Home/GoImage.png";
import { IoIosArrowForward } from "react-icons/io";
import CustomBottomNavigation from "../../widgets/CustomBottomNavigation";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { CiSearch } from "react-icons/ci";

const AllProjectView = () => {
  const navigate = useNavigate(); // Usa useNavigate para la navegación
  const [activeRole, setActiveRole] = useState('participated');
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

  // Determinar si algún proyecto tiene mensajes
  let hasAnyMessage = mockData.projects.some(project => project.HasMessages);

  // Filtrar los proyectos basados en el término de búsqueda
  const filteredProjects = mockData.projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Limitar los proyectos a los primeros 3
  const limitedProjects = filteredProjects.slice(0, 3);

  // Función para manejar el clic en el ícono de "All Projects"
  const handleViewAllProjects = () => {
    navigate("/all-projects"); // Redirecciona a la página de "All Projects"
  };

  return (
    <div className="Home">
      <header>
        <button className="home-button left">
          <RxDashboard />
        </button>
        <h2>All Project</h2>
        <button className="home-button right">
          <img
            src={NotificationIcon}
            alt="Notification"
            className="notification-image"
          />
        </button>
      </header>
      <div className="Container">
       {/* Barra de búsqueda */}
        <div className="search-bar">
  <CiSearch />
  <input
    type="text"
    placeholder="Search ..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <div className="go-image-container">
    <img
      src={GoImage}
      alt="Go"
      className="go-image"
    />
    <span className="go-text">GO</span>
  </div>
</div>


        <div className="project-selector">
          <button
            className={`project-button ${activeRole === 'participated' ? 'active' : ''}`}
            onClick={() => setActiveRole('participated')}
          >
            Participated
          </button>
          <button
            className={`project-button ${activeRole === 'notjoined' ? 'active' : ''}`}
            onClick={() => setActiveRole('notjoined')}
          >
            Not Joined
          </button>
          <div className={`switch-background-project ${activeRole}`}></div>
        </div>

        <div className="all-projects">
          {limitedProjects.map((project, index) => (
            <div className="project-card" key={index}>
              <p>{project.quotations} quotation(s) uploaded</p>
              <h3>{project.title}</h3>
              <p>Average price @ {project.averagePrice}</p>
              {project.HasMessages ? (
                <img src={MessageNIcon} alt="Message Notification" />
              ) : (
                <img src={MessageIcon} alt="Message" />
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Pasa el prop hasAnyMessage al CustomBottomNavigation */}
      <CustomBottomNavigation hasAnyMessage={hasAnyMessage} name="Home" />
    </div>
  );
};

export default AllProjectView;

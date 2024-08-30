import React, { useState, useEffect } from "react";
import "./styles/Home.css";
import "./styles/AllProject.css";
import config from '../../../server/config/config'; // Importa la configuración
import axios from "axios";
import { RxDashboard } from "react-icons/rx";
import NotificationIcon from "../../../assets/images/Home/notificationIcon.png";
import MessageIcon from "../../../assets/images/Home/Message.png";
import MessageNIcon from "../../../assets/images/Home/MessageN.png";
import GoImage from "../../../assets/images/Home/GoImage.png";
import CustomBottomNavigation from "../../widgets/CustomBottomNavigation";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { CiSearch } from "react-icons/ci";
import { useUser } from '../../context/UserContext';

const AllProjectView = () => {
  const navigate = useNavigate(); // Usa useNavigate para la navegación
  const [activeRole, setActiveRole] = useState('participated');
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const { userType, userEmail } = useUser(); // Obtén userType del contexto
  const [projects, setProjects] = useState([]); // Estado para almacenar los proyectos
  // Determinar si algún proyecto tiene mensajes
  const [hasAnyMessage, setHasAnyMessage] = useState(false);

  useEffect(() => {
    // Si el usuario es del tipo 0, obtenemos los proyectos del backend
    axios.get(`${config.apiUrl}/projects/getProjects`)
      .then(response => {
        console.log("Projects fetched successfully!", response.data);
        setProjects(response.data);
        // Verifica si alguno de los proyectos tiene mensajes
        const anyMessage = response.data.some(project => project.HasMessages);
        setHasAnyMessage(anyMessage);
      })
      .catch(error => {
        console.error("There was an error fetching the projects!", error);
      });
  }, []); // La solicitud se hace solo una vez al cargar el componente

  // Filtrar los proyectos basados en el término de búsqueda
  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Limitar los proyectos a los primeros 3
  //const limitedProjects = filteredProjects.slice(0, 3);

  // Función para manejar el clic en el ícono de "All Projects"
  const handleViewAllProjects = () => {
    navigate("/all-projects"); // Redirecciona a la página de "All Projects"
  };

  const projectInfo = (proyectId) => {
    const projectUser = projects.find(project => project.id_project === proyectId)?.id_user;
    console.log(userEmail);
    console.log(projectUser);
    if (projectUser == userEmail)
      navigate("/ProjectPageManager", { state: { proyectId: proyectId, name: proyectId } });
    else
      navigate("/ProjectPage", { state: { proyectId: proyectId, name: proyectId } });

  };

  const projectChat = (proyectId) => {
    navigate("/Chat", { state: { proyectId: proyectId, name: proyectId } });
  };

  return (
    <div className="Home">
      <div className="homeHeader">
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
      </div>
      <div className="all-projects-container">
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
          {filteredProjects.map((project, index) => (
            <div className="project-card" key={index}>
              <p>{project.quotations} quotation(s) uploaded</p>
              <h3 onClick={() => projectInfo(project.id_project)}>{project.name}</h3>
              <p>{project.description.length > 40 ? `${project.description.substring(0, 40)}...` : project.description}</p>
              {project.HasMessages ? (
                <img src={MessageNIcon} alt="Message Notification" onClick={() => projectChat(project.id_project)} />
              ) : (
                <img src={MessageIcon} alt="Message" onClick={() => projectChat(project.id_project)} />
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

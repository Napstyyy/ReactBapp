import React, { useState, useEffect } from "react";
import axios from "axios";
import config from '../../../server/config/config'; // Importa la configuración
import "./styles/Home.css";
import { RxDashboard } from "react-icons/rx";
import NotificationIcon from "../../../assets/images/Home/notificationIcon.png";
import { IoIosArrowForward } from "react-icons/io";
import CustomBottomNavigation from "../../widgets/CustomBottomNavigation";
import { useNavigate } from "react-router-dom";
import { useUser } from '../../context/UserContext';
import MessageIcon from "../../../assets/images/Home/Message.png";
import MessageNIcon from "../../../assets/images/Home/MessageN.png";

const HomeView = () => {
  const [projects, setProjects] = useState([]);
  //const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { userType, userEmail } = useUser(); // Obtén userType del contexto
  console.log('UserType:', userType); // Verifica el valor de userType
  console.log('UserEmail:', userEmail); // Verifica el valor de email
  const [hasAnyMessage, setHasAnyMessage] = useState(false); // Estado para verificar si hay mensajes
  //const hasAnyMessage = mockData.projects.some((project) => project.HasMessages);
  const limitedProjects = projects.slice(0, 3);

  useEffect(() => {
    if (userType === 0) {
      // Si el usuario es del tipo 0, obtenemos los proyectos del backend
      axios.get(`${config.apiUrl}/projects/with-quotes/${userEmail}`)
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
    }
  }, [userType, userEmail]); // La solicitud se vuelve a hacer si userType o email cambian


  const handleViewAllProjects = () => {
    navigate("/AllProject");
  };

  const projectInfo = (proyectId) => {
    navigate("/ProjectPage", { state: { proyectId: proyectId, name: proyectId } });
  };

  const projectChat = (proyectId) => {
    navigate("/Chat", { state: { proyectId: proyectId, name: proyectId } });
  };

   const renderContent = () => {
    /*if (loading) {
      return <p>Loading...</p>;
    }*/

    if (userType === 1) {
      return (
        <>
          <div className="homeHeader">
            <button className="home-button left">
              <RxDashboard />
            </button>
            <h2>{new Date().toLocaleDateString("en-MY", { weekday: "long", day: "numeric" })}</h2>
            <button className="home-button right">
              <img src={NotificationIcon} alt="Notification" className="notification-image" />
            </button>
          </div>
          <div className="Container">
            <h1 className="greeting">
              Let's get started{" "}
              <span role="img" aria-label="wave">🙌</span>
            </h1>
            <div className="carousel-container">
              <div className="carousel">
                <div className="participated-project">
                  <h2>Pending Projects</h2>
                  <p>3 Pending projects</p>
                  <div className="project-details">
                    <div className="project-images">
                      <img src="https://via.placeholder.com/50" alt="Project 1" className="project-image" />
                      <img src="https://via.placeholder.com/50" alt="Project 2" className="project-image" />
                      <img src="https://via.placeholder.com/50" alt="Project 3" className="project-image" />
                    </div>
                    <button className="view-projects">View All Projects</button>
                  </div>
                </div>
                <div className="participated-project participated-project-1">
                  <h2>Not Joined Project</h2>
                  <p>Projects you joined but closed</p>
                  <div className="project-details-1">
                    <div className="project-images">
                      <img src="https://via.placeholder.com/50" alt="Project 1" className="project-image" />
                      <img src="https://via.placeholder.com/50" alt="Project 2" className="project-image" />
                      <img src="https://via.placeholder.com/50" alt="Project 3" className="project-image" />
                    </div>
                    <button className="view-projects">Progress</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="all-projects">
              <h2>
                All Projects
                <IoIosArrowForward className="all-projects-icon" onClick={handleViewAllProjects} />
              </h2>
              {projects.slice(0, 3).map((project, index) => (
                <div className="project-card" key={index}>
                  <p>{project.quotations} quotation(s) uploaded</p>
                  <h3>{project.name}</h3>
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
          <CustomBottomNavigation hasAnyMessage={projects.some(project => project.HasMessages)} name="Home" />
        </>
      );
    } else if (userType === 0) {
      return (
        <>
          <div className="homeHeader">
            <button className="home-button left">
              <RxDashboard />
            </button>
            <h2 className="HeaderText">{new Date().toLocaleDateString("en-MY", { weekday: "long", day: "numeric" })}</h2>
            <button className="home-button right">
              <img src={NotificationIcon} alt="Notification" className="notification-image" />
            </button>
          </div>
          <div className="Container">
            <h1 className="greeting">
              Let's get started{" "}
              <span role="img" aria-label="wave">🙌</span>
            </h1>
            <div className="carousel-container">
              <div className="carousel">
                <div className="participated-project">
                  <h2>Pending Projects</h2>
                  <p>3 Pending projects</p>
                  <div className="project-details">
                    <div className="project-images">
                      <img src="https://via.placeholder.com/50" alt="Project 1" className="project-image" />
                      <img src="https://via.placeholder.com/50" alt="Project 2" className="project-image" />
                      <img src="https://via.placeholder.com/50" alt="Project 3" className="project-image" />
                    </div>
                    <button className="view-projects">View All Projects</button>
                  </div>
                </div>
                <div className="participated-project participated-project-1">
                  <h2>Not Joined Project</h2>
                  <p>Projects you joined but closed</p>
                  <div className="project-details-1">
                    <div className="project-images">
                      <img src="https://via.placeholder.com/50" alt="Project 1" className="project-image" />
                      <img src="https://via.placeholder.com/50" alt="Project 2" className="project-image" />
                      <img src="https://via.placeholder.com/50" alt="Project 3" className="project-image" />
                    </div>
                    <button className="view-projects">Progress</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="all-projects">
              <h2>
                All Projects
                <IoIosArrowForward className="all-projects-icon" onClick={handleViewAllProjects} />
              </h2>
              {limitedProjects.map((project, index) => (
                <div className="project-card" key={index} >
                  <h3 onClick={() => projectInfo(project.id_project)}>{project.project_name}</h3>
                  <p>Average price @ {project.payment_terms}</p>
                  {project.HasMessages ? (
                    <img src={MessageNIcon} alt="Message Notification" onClick={() => projectChat(project.id_project)} />
                  ) : (
                    <img src={MessageIcon} alt="Message" onClick={() => projectChat(project.id_project)} />
                  )}
                </div>
              ))}
            </div>
          </div>
          <CustomBottomNavigation hasAnyMessage={projects.some(project => project.HasMessages)} name="Home" />
        </>
      );
    } else {
      return <p>Invalid user type</p>;
    }
  };

  return <div className="HomeView">{renderContent()}</div>;
};

export default HomeView;

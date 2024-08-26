import React, { useEffect, useState } from "react";
import "./styles/Home.css";
import { RxDashboard } from "react-icons/rx";
import NotificationIcon from "../../../assets/images/Home/notificationIcon.png";
import { IoIosArrowForward } from "react-icons/io";
import CustomBottomNavigation from "../../widgets/CustomBottomNavigation";
import { useNavigate } from "react-router-dom";
import { useUser } from '../../context/UserContext';
import MessageIcon from "../../../assets/images/Home/Message.png";
import MessageNIcon from "../../../assets/images/Home/MessageN.png";
import config from '../../../server/config/config';

const HomeView = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { userType, userEmail } = useUser();
  console.log(userEmail)

useEffect(() => {
  const fetchProjects = async () => {
    try {
      const requestBody = { email: userEmail }; // Email quemado
      console.log("Sending request body:", requestBody);

      const response = await fetch(`${config.apiUrl}/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody), // Asegúrate de que esté correctamente formateado
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProjects(data.projects);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setLoading(false);
    }
  };

  fetchProjects();
}, []);  // Eliminamos la dependencia 'email' ya que se está usando un valor estático






  const handleViewAllProjects = () => {
    navigate("/AllProject");
  };

  const renderContent = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (userType === 1) {
      return (
        <>
          <header>
            <button className="home-button left">
              <RxDashboard />
            </button>
            <h2>{new Date().toLocaleDateString("en-MY", { weekday: "long", day: "numeric" })}</h2>
            <button className="home-button right">
              <img src={NotificationIcon} alt="Notification" className="notification-image" />
            </button>
          </header>
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
                  <p>You have some quotations uploaded</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
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
          <header>
            <button className="home-button left">
              <RxDashboard />
            </button>
            <h2>{new Date().toLocaleDateString("en-MY", { weekday: "long", day: "numeric" })}</h2>
            <button className="home-button right">
              <img src={NotificationIcon} alt="Notification" className="notification-image" />
            </button>
          </header>
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
                  <p>You have some quotations uploaded</p>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
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
    } else {
      return <p>Invalid user type</p>;
    }
  };

  return <div className="HomeView">{renderContent()}</div>;
};

export default HomeView;

import React from "react";
import "./styles/Home.css";
import mockData from "../../../data/mockData.json";
import { RxDashboard } from "react-icons/rx";
import NotificationIcon from "../../../assets/images/Home/notificationIcon.png";
import { BsArrowRightCircle } from "react-icons/bs";
import MessageIcon from "../../../assets/images/Home/Message.png";
import MessageNIcon from "../../../assets/images/Home/MessageN.png";
import { IoIosArrowForward } from "react-icons/io";

const HomeView = () => {
  const options = { weekday: "long", day: "numeric" };
  const malaysiaTime = new Date().toLocaleDateString("en-MY", options);
  let hasAnyMessage = false;

  return (
    <div className="Home">
      <header>
        <button className="home-button left">
          <RxDashboard />
        </button>
        <h2>{malaysiaTime}</h2>
        <button className="home-button right">
          <img
            src={NotificationIcon}
            alt="Notification"
            className="notification-image"
          />
        </button>
      </header>
      <div className="Container">
        <h1 className="greeting">
          Let's get started{" "}
          <span role="img" aria-label="wave">
            🙌
          </span>
        </h1>
      
        <div className="carousel-container">
  <div className="carousel">
    <div className="participated-project">
      <h2>Participated Project</h2>
      <p>Projects you have quoted or chatted with</p>
      <div className="project-details">
        <div className="project-images">
          <img
            src="https://via.placeholder.com/50"
            alt="Project 1"
            className="project-image"
          />
          <img
            src="https://via.placeholder.com/50"
            alt="Project 2"
            className="project-image"
          />
          <img
            src="https://via.placeholder.com/50"
            alt="Project 3"
            className="project-image"
          />
        </div>
        <button className="view-projects">View All Projects</button>
      </div>
    </div>

    <div className="participated-project participated-project-1">
      <h2>Not Joined Project</h2>
      <p>Projects you joined but closed</p>
      <div className="project-details-1">
        <div className="project-images">
          <img
            src="https://via.placeholder.com/50"
            alt="Project 1"
            className="project-image"
          />
          <img
            src="https://via.placeholder.com/50"
            alt="Project 2"
            className="project-image"
          />
          <img
            src="https://via.placeholder.com/50"
            alt="Project 3"
            className="project-image"
          />
        </div>
        <button className="view-projects">Progress</button>
      </div>
    </div>
  </div>
</div>

        <div className="all-projects">
          <h2>
            All Projects <IoIosArrowForward  className="all-projects-icon" />
          </h2>
          {mockData.projects.map((project, index) => (
            <div className="project-card" key={index}>
              <p>{project.quotations} quotation(s) uploaded</p>
              <h3>{project.title}</h3>
              <p>Average price @ {project.averagePrice}</p>
              {project.HasMessages ? (
                <>
                  <img src={MessageNIcon} alt="Message Notification" />
                  {hasAnyMessage = true}
                </>
              ) : (
                <>
                  <img src={MessageIcon} alt="Message" />
                  {hasAnyMessage = false}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeView;

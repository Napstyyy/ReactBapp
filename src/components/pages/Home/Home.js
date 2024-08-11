import React from "react";
import "./styles/Home.css";
import mockData from "../../../data/mockData.json";
import { RxDashboard } from "react-icons/rx";
import NotificationIcon from "../../../assets/images/Home/notificationIcon.png";

const HomeView = () => {
  const options = { weekday: "long", day: "numeric" };
  const malaysiaTime = new Date().toLocaleDateString("en-MY", options);

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
            alt="Noty"
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
        <div class="participated-project">
          <h2>Participated Project</h2>
          <p>Project you have quoted or chat with</p>
          <div class="project-details">
            <div class="project-images">
              <img
                src="https://via.placeholder.com/50"
                alt="Project 1"
                class="project-image"
              />
              <img
                src="https://via.placeholder.com/50"
                alt="Project 2"
                class="project-image"
              />
              <img
                src="https://via.placeholder.com/50"
                alt="Project 3"
                class="project-image"
              />
            </div>
            <button class="view-projects">View All Projects</button>
          </div>
        </div>

        <div className="all-projects">
          <h2>All Projects</h2>
          {mockData.projects.map((project, index) => (
            <div className="project-card" key={index}>
              <p>{project.quotations} quotation uploaded</p>
              <h3>{project.title}</h3>
              <p>Average price @ {project.averagePrice}</p>
              {project.chatIcon && <img src="chat-icon.png" alt="chat" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeView;

import React, { useState, useEffect } from "react";
import Slider from 'react-slick';
import { Container } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles/ProjectPageManager.css';
import ProjectView from "../../../assets/images/Projects/ProjectView.png";
import Edit from "../../../assets/images/Projects/Edit.svg";
import DashboardChart from "../../widgets/DashboardChart";
import pdflogo from "../../../assets/images/Projects/pdflogo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import config from '../../../server/config/config'; // Importa la configuración

const ProjectPageManager = () => {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [quotes, setQuotes] = useState([]);
  const [project, setProject] = useState([]);
  const location = useLocation();
  // const { projectId, name } = location.state;
  const nameProjectId = /*name || projectId*/ 1;

  const goToComparison = () => {
    navigate("/Comparison", { state: { proyectId: 1, name: 1 } });
  }

  useEffect(() => {
    console.log(nameProjectId);
    axios.get(`${config.apiUrl}/projects/getProjectQuotes/${nameProjectId}`).then(response => {
      // console.log("Quotes", response.data);
      setQuotes(response.data);
    }).catch(error => {
      console.error('Error fetching project!', error);
    });
    axios.get(`${config.apiUrl}/projects/getOneProject/${nameProjectId}`).then(response => {
      console.log(response.data[0]);
      setProject(response.data[0]);
    }).catch(error => {
      console.error('Error fetching project!', error);
    });
  }, []);

  return (
    <>
      <div className="project-manager-imageContainer">
        <Slider {...settings}>
          <div>
            <img src={ProjectView} alt="Project 1" className="project-manager-image" />
          </div>
          <div>
            <img src="/path-to-image2.jpg" alt="Project 2" className="project-manager-image" />
          </div>
          <div>
            <img src="/path-to-image3.jpg" alt="Project 3" className="project-manager-image" />
          </div>
        </Slider>
        <Container maxWidth="sm" className="project-manager-container">
          <div className="project-manager-card">
            <div className="project-manager-content">
              <div className="project-manager-titleContainer">
                <div className="project-manager-title">
                  {project.name}
                </div>
                <img src={Edit} alt="Message" />
              </div>

              <DashboardChart quotes={quotes}/>
              <div className="project-manager-descriptionTitle">
                Descriptions
              </div>
              <div className="project-manager-description">
                We require the repainting of two residential building blocks, each comprising 100 units. The buildings are located in [Location]. This project aims to enhance the aesthetic appeal and protect the structural integrity of the buildings.
                Scope of Work

                Surface Preparation:
                Cleaning of all surfaces to be painted, including removal of dirt, mildew, and any loose or flaking paint.
                Repair of any surface imperfections, such as cracks or holes, to ensure a smooth painting surface. ..
              </div>
              <div className="project-manager-documentsTitle">
                Documents
              </div>
              <div className="project-manager-file-input-wrapper">
                <input
                  type="file"
                  className="project-manager-file-upload"
                  id="financial-statements"
                  accept="application/pdf"
                />
                <label htmlFor="financial-statements" className="project-manager-file-upload-label">
                  <img src={pdflogo} alt="Upload File" className="project-manager-upload-icon" />
                  <span className="project-manager-upload-text">Requirement_01</span>
                </label>
              </div>
              <div className="project-manager-file-input-wrapper">
                <input
                  type="file"
                  className="project-manager-file-upload"
                  id="financial-statements"
                  accept="application/pdf"
                />
                <label htmlFor="financial-statements" className="project-manager-file-upload-label">
                  <img src={pdflogo} alt="Upload File" className="project-manager-upload-icon" />
                  <span className="project-manager-upload-text">Floor Plan</span>
                </label>
              </div>

            </div>
            <button className="project-manager-submitButton" onClick={goToComparison}>
              Compare & Close Tender
            </button>
          </div>
        </Container>
      </div>
    </>
  );
}

export default ProjectPageManager;

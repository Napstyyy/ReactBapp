import React, { useState, useEffect } from "react";
import Slider from 'react-slick';
import { Container } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles/ProjectPageManager.css';
import Edit from "../../../assets/images/Projects/Edit.svg";
import DashboardChart from "../../widgets/DashboardChart";
import pdflogo from "../../../assets/images/Projects/pdflogo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from 'react-router-dom';

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
  const { projectId, name } = location.state;
  const nameProjectId = name || projectId;
  const apiUrl = process.env.REACT_APP_BACKEND_API_URL;

  const goToComparison = () => {
    navigate("/Comparison", { state: { nameProyectId: nameProjectId, name: nameProjectId } });
  }

  const goToEdit = () => {
    navigate("/EditProject", { state: { nameProyectId: nameProjectId, name: nameProjectId } });
  }

  const openPdf = (blob64) => {
    const binaryString = window.atob(blob64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const blob = new Blob([bytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const pdfWindow = window.open("");
    pdfWindow.document.write(
      `<iframe width="100%" height="100%" src="${url}"></iframe>`
    );
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 60000); // 1 minute 
  }

  useEffect(() => {
    console.log(nameProjectId);
    axios.get(`${apiUrl}/projects/getProjectQuotes/${nameProjectId}`).then(response => {
      // console.log("Quotes", response.data);
      setQuotes(response.data);
    }).catch(error => {
      console.error('Error fetching project!', error);
    });
    axios.get(`${apiUrl}/projects/getOneProject/${nameProjectId}`).then(response => {
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
            <img src={`data:image/jpeg;base64,${project.image1}`} alt="Project 1" className="imageContainer" />
          </div>
          <div>
            <img src={`data:image/jpeg;base64,${project.image2}`} alt="Project 2" className="imageContainer" />
          </div>
          <div>
            <img src={`data:image/jpeg;base64,${project.image3}`} alt="Project 3" className="imageContainer" />
          </div>
        </Slider>
        <Container maxWidth="sm" className="project-manager-container">
          <div className="project-manager-card">
            <div className="project-manager-content">
              <div className="project-manager-titleContainer">
                <div className="project-manager-title">
                  {project.name}
                </div>
                <button className="edit-project-button" onClick={goToEdit}>
                  <img src={Edit} alt="Message" />
                </button>
              </div>

              <DashboardChart quotes={quotes} />
              <div className="project-manager-descriptionTitle">
                Descriptions
              </div>
              <div className="project-manager-description">
                {project.description}
              </div>
              <div className="project-manager-documentsTitle">
                Documents
              </div>
              <div className="project-manager-file-input-wrapper">
                <button
                  className="project-manager-file-upload"
                  onClick={() => {
                    openPdf(project.pdf1);
                  }}
                >
                  <label htmlFor="financial-statements" className="project-manager-file-upload-label">
                    <img src={pdflogo} alt="Upload File" className="project-manager-upload-icon" />
                    <span className="project-manager-upload-text">Pdf 1</span>
                  </label>
                </button>
              </div>
              <div className="project-manager-file-input-wrapper">
                <button
                  className="project-manager-file-upload"
                  onClick={() => {
                    openPdf(project.pdf2);
                  }}
                >
                  <label htmlFor="financial-statements" className="project-manager-file-upload-label">
                    <img src={pdflogo} alt="Upload File" className="project-manager-upload-icon" />
                    <span className="project-manager-upload-text">Pdf 2</span>
                  </label>
                </button>
              </div>

            </div>
            <button className="project-manager-submitButton" onClick={goToComparison}>
              Compare & Close Tender
            </button>
          </div>
        </Container>
      </div >
    </>
  );
}

export default ProjectPageManager;

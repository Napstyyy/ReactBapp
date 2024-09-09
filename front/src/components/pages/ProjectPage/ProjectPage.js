import React, { useState, useEffect } from "react";
import Slider from 'react-slick';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Button, Typography, Container, Grid } from '@mui/material';
import pdflogo from "../../../assets/images/Projects/pdflogo.png";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles/ProjectPage.css';
import MessageIcon from "../../../assets/images/Home/Message.png";


const ProjectDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId, name } = location.state; // Obtiene el projectId de la ubicación
  const nameProjectId = name || projectId; // Usa projectId si name no está disponible
  const [project, setProjects] = useState([]); // Estado para almacenar los proyectos
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // Si el usuario es del tipo 0, obtenemos los proyectos del backend
    axios.get(`${apiUrl}/projects/getOneProject/${nameProjectId}`)
      .then(response => {
        console.log("Project fetched successfully!", response.data);
        setProjects(response.data[0]);
      })
      .catch(error => {
        console.error("There was an error fetching the projects!", error);
      });

  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const projectChat = (proyectId) => {
    navigate("/Chat", { state: { proyectId: proyectId, name: proyectId } });
  };

  const QuotationGenerator = (proyectId) => {
    navigate("/QuotationGenerator", { state: { proyectId: proyectId, name: proyectId } });
  };

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

  return (
    <>
      <div className="imageContainer">
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
      </div>
      <Container maxWidth="sm" className="container">
        <div className="card">
          <div className="content">
            <div className="titleContainer">
              <div className="title">
                {project.name}
              </div>
              <img src={MessageIcon} alt="Message" className="messageIcon" onClick={() => projectChat(project.id_project)} />
            </div>

            <div className="location">
              @cyberjaya, malaysia
            </div>

            <div className="descriptionTitle">
              Descriptions
            </div>
            <div className="description">
              {project.description}
            </div>

            <div className="documentsTitle">
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

            <div className="documentsTitle">
              Quotations:<br />
            </div>
            <div className="description">Upload your quotation here or sign up as
              registered contractor to use our online
              quotation generator.
            </div>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={12} sm={6}>
                <Button htmlFor="pdf-upload2" className="uploadButtonContainer"  >
                  <div className="uploadButtonText">Click to upload</div>
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <button className="quotationButton" onClick={() => QuotationGenerator(project.id_project)}>
                  Use Quotation Generator
                </button>
              </Grid>
            </Grid>
          </div>
          <button className="submitButton">
            Submit
          </button>
        </div>
      </Container>
    </>
  );
};

export default ProjectDetail;

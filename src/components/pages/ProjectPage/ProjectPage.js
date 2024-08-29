import React, { useState, useEffect } from "react";
import Slider from 'react-slick';
import axios from "axios";
import config from '../../../server/config/config'; // Importa la configuración
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Button, Typography, Container, Grid } from '@mui/material';
import { UploadFile, PictureAsPdf } from '@mui/icons-material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles/ProjectPage.css';
import ProjectView from "../../../assets/images/Projects/ProjectView.png";
import MessageIcon from "../../../assets/images/Home/Message.png";
import pdfIcon from "../../../assets/images/Projects/pdflogo.png";


const ProjectDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId, name } = location.state; // Obtiene el projectId de la ubicación
  const nameProjectId = name || projectId; // Usa projectId si name no está disponible
  const [project, setProjects] = useState([]); // Estado para almacenar los proyectos

  useEffect(() => {
      // Si el usuario es del tipo 0, obtenemos los proyectos del backend
      axios.get(`${config.apiUrl}/projects/getOneProject/${nameProjectId}`)
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

  const QuotationGenerator = () => {
    navigate("/QuotationGenerator");
  };

  

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
              <div gutterBottom className="title">
                {project.name}
              </div>
              <img src={MessageIcon} alt="Message" className="messageIcon" onClick={() => projectChat(project.id_project)} />
            </div>

            <div className="location">
              @cyberjaya, malaysia
            </div>

            <div  className="descriptionTitle">
              Descriptions
            </div>
            <div className="description">
            {project.description}
            </div>

            <div className="documentsTitle">
              Documents
            </div>
            <div className="file-input-wrapper-apr">
          <input
            type="file"
            className="file-uploadr"
            id="pdf-upload"
            accept="application/pdf"
          />
          <label htmlFor="pdf-upload" className="file-upload-labelr">
            <img src={pdfIcon} alt="Upload File" className="upload-iconr" />
            <span className="upload-text-apr">filename</span>
          </label>
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
                  <div  className="uploadButtonText">Click to upload</div>
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <button className="quotationButton" onClick={() => QuotationGenerator()}>
                  Use Quotation Generator
                </button>
              </Grid>
            </Grid>
          </div>
          <button  className="submitButton">
            Submit
          </button>
        </div>
      </Container>
    </>
  );
};

export default ProjectDetail;

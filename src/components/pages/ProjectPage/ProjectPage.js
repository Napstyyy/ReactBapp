import React, { useState, useEffect } from "react";
import Slider from 'react-slick';
import axios from "axios";
import config from '../../../server/config/config'; // Importa la configuración
import { useLocation } from 'react-router-dom';
import { Button, Typography, Container, Grid } from '@mui/material';
import { UploadFile, PictureAsPdf } from '@mui/icons-material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles/ProjectPage.css';
import ProjectView from "../../../assets/images/Projects/ProjectView.png";
import MessageIcon from "../../../assets/images/Home/Message.png";


const ProjectDetail = () => {
  const location = useLocation();
  const { projectId, name } = location.state; // Obtiene el projectId de la ubicación
  const nameProjectId = name || projectId; // Usa projectId si name no está disponible
  const [project, setProjects] = useState([]); // Estado para almacenar los proyectos

  useEffect(() => {
      // Si el usuario es del tipo 0, obtenemos los proyectos del backend
      axios.get(`${config.apiUrl}/projects/getOneProject/:${nameProjectId}`)
        .then(response => {
          console.log("Project fetched successfully!", response.data);
          setProjects(response.data);
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

  return (
    <>
      <div className="imageContainer">
        <Slider {...settings}>
          <div>
            <img src={ProjectView} alt="Project 1" className="imageContainer" />
          </div>
          <div>
            <img src="/path-to-image2.jpg" alt="Project 2" className="imageContainer" />
          </div>
          <div>
            <img src="/path-to-image3.jpg" alt="Project 3" className="imageContainer" />
          </div>
        </Slider>
      </div>
      <Container maxWidth="sm" className="container">
        <div className="card">
          <div className="content">
            <div className="titleContainer">
              <div gutterBottom className="title">
                {project.project_name}
              </div>
              <img src={MessageIcon} alt="Message" className="messageIcon" />
            </div>

            <div className="location">
              @cyberjaya, malaysia
            </div>

            <div  className="descriptionTitle">
              Descriptions
            </div>
            <div className="description">
              We require the repainting of two residential building blocks, each comprising 100 units. The buildings are located in [Location]. This project aims to enhance the aesthetic appeal and protect the structural integrity of the buildings.
            </div>

            <div className="documentsTitle">
              Documents
            </div>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Button startIcon={<PictureAsPdf />} fullWidth className="docButton">
                  Requirement _01
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button startIcon={<PictureAsPdf />} fullWidth className="docButton">
                  Floor Plan
                </Button>
              </Grid>
            </Grid>

            <div className="documentsTitle">
              Quotations:
            </div>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={12} sm={6}>
                <Button className="uploadButtonContainer"  >
      <div className="uploadButtonText">Click to upload</div>
    </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <button className="quotationButton" >
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

import React from "react";
import Slider from 'react-slick';
import { Button, Typography, Container, Grid } from '@mui/material';
import { UploadFile, PictureAsPdf } from '@mui/icons-material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles/ProjectPageManager.css';
import ProjectView from "../../../assets/images/Projects/ProjectView.png";
import Edit from "../../../assets/images/Projects/Edit.svg";
import DashboardChart from "../../widgets/DashboardChart";

const ProjectPageManager = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
                  Aca va el project name
                </div>
                <img src={Edit} alt="Message" />
              </div>

              <div className="project-manager-location">
                @cyberjaya, malaysia
              </div>

              <DashboardChart />
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
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Button startIcon={<PictureAsPdf />} fullWidth className="project-manager-docButton">
                    Requirement _01
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button startIcon={<PictureAsPdf />} fullWidth className="project-manager-docButton">
                    Floor Plan
                  </Button>
                </Grid>
              </Grid>
              <div className="file-input-wrapper-ap">
                <input
                  type="file"
                  className="file-upload"
                  id="financial-statements"
                  accept="application/pdf"
                />
                <label htmlFor="financial-statements" className="file-upload-label">
                  <img src={PictureAsPdf} alt="Upload File" className="upload-icon" />
                  <span className="upload-text-ap">filename</span>
                </label>
              </div>

            </div>
            <Button className="project-manager-submitButton">
              Compare & Close Tender
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
}

export default ProjectPageManager;

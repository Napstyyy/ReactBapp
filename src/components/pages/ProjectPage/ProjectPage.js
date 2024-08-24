import React from 'react';
import Slider from 'react-slick';
import { Button, Typography, Container, Grid } from '@mui/material';
import { UploadFile, PictureAsPdf } from '@mui/icons-material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles/ProjectPage.css';
import ProjectView from "../../../assets/images/Projects/ProjectView.png";
import MessageIcon from "../../../assets/images/Home/Message.png";


const ProjectDetail = () => {
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
            <img src={ProjectView} alt="Project 1" className="image" />
          </div>
          <div>
            <img src="/path-to-image2.jpg" alt="Project 2" className="image" />
          </div>
          <div>
            <img src="/path-to-image3.jpg" alt="Project 3" className="image" />
          </div>
        </Slider>
      </div>
      <Container maxWidth="sm" className="container">
        <div className="card">
          <div className="content">
            <div className="titleContainer">
              <Typography variant="h5" component="div" gutterBottom className="title">
                Repainting of building
              </Typography>
              <img src={MessageIcon} alt="Message" className="messageIcon" />
            </div>

            <Typography variant="subtitle2" color="textSecondary" gutterBottom className="location">
              @cyberjaya, malaysia
            </Typography>

            <Typography variant="body2" color="textSecondary" className="descriptionTitle">
              Descriptions
            </Typography>
            <Typography variant="body2" color="textSecondary" className="description">
              We require the repainting of two residential building blocks, each comprising 100 units. The buildings are located in [Location]. This project aims to enhance the aesthetic appeal and protect the structural integrity of the buildings.
            </Typography>

            <Typography variant="body2" color="textSecondary" className="documentsTitle">
              Documents:
            </Typography>
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

            <Typography variant="body2" color="textSecondary" component="div">
              Quotations:
            </Typography>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={12} sm={6}>
                <Button variant="outlined" startIcon={<UploadFile />} fullWidth>
                  Click to upload
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="contained" color="primary" fullWidth>
                  Use Quotation Generator
                </Button>
              </Grid>
            </Grid>
          </div>
          <Button variant="contained" color="primary" fullWidth className="submitButton">
            Submit
          </Button>
        </div>
      </Container>
    </>
  );
};

export default ProjectDetail;

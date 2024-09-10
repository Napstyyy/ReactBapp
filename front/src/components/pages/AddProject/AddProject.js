import React, { useState } from "react";
import "../Auth/styles/SignUp.css";
import { SlArrowLeft } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import "./styles/AddProject.css";
import { useUser } from "../../context/UserContext";
import uploadFile from "../../../assets/images/Projects/uploadFile.png";
import trashIcon from "../../../assets/images/trashIcon.png";
import pdfIcon from "../../../assets/images/pdfIcon.png";
import cameraIcon from "../../../assets/images/cameraIcon.png";

const AddProjectView = () => {
  const navigate = useNavigate();
  const { userEmail } = useUser();
  const [pdf1, setPdf1] = useState(null);
  const [pdf1Name, setPdf1Name] = useState(null);
  const [pdf2, setPdf2] = useState(null);
  const [pdf2Name, setPdf2Name] = useState(null);
  const [imageBlob1, setImageBlob1] = useState(null);
  const [imageBlob2, setImageBlob2] = useState(null);
  const [imageBlob3, setImageBlob3] = useState(null);
  const [imagePreview1, setImagePreview1] = useState(null);
  const [imagePreview2, setImagePreview2] = useState(null);
  const [imagePreview3, setImagePreview3] = useState(null);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const apiUrl = process.env.REACT_APP_BACKEND_API_URL; 

  const handleSaveClick = async () => {

    const toBase64 = (blob) => {
      console.log(blob);
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => resolve(reader.result.split(",")[1]); // Quita el encabezado del data URL
        reader.onerror = (error) => reject(error);
      });
    };

    const projectData = {
      name: taskName || "",
      description: description || "",
      id_user: userEmail || "jerkydock05045@gmail.com",
      image1: imageBlob1 ? await toBase64(imageBlob1) : null,
      image2: imageBlob2 ? await toBase64(imageBlob2) : null,
      image3: imageBlob3 ? await toBase64(imageBlob3) : null,
      pdf1: pdf1 ? await toBase64(pdf1) : null,
      pdf2: pdf2 ? await toBase64(pdf2) : null,
    };

    console.log("Data sent in PATCH:", projectData);

    try {
      const url = `${apiUrl}/projects/addProject`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Server error:", errorResponse);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Project updated successfully:", data);
    } catch (error) {
      console.error("Error updating project data:", error);
    }
  };

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const handleFileChange = (e, setFile, setFileName) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFile(file);
      setFileName(file.name); // Update file name
    } else {
      console.error("Please select a valid PDF file.");
    }
  };

  const handleRemoveFile = (setFile, setFileName, fileInputId, e) => {
    e.stopPropagation(); // Stops event propagation
    e.preventDefault();
    setFile(null);
    setFileName("");
    document.getElementById(fileInputId).value = ""; // Reset file input
  };

  const handleImageUpload = (e, setImagePreview, setImageBlob) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) { // Ensure the file is an image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Display the uploaded image

        // Convert the image to a Blob
        const blob = new Blob([reader.result], { type: file.type });
        setImageBlob(blob); // Store the Blob
      };
      reader.readAsDataURL(file);
    } else {
      console.error("Please select a valid image file.");
    }
  };

  const handleRemoveImage = (e, setImagePreview, setImageBlob, inputId) => {
    e.stopPropagation();
    setImagePreview(null); // Remove the uploaded image
    setImageBlob(null); // Remove the Blob
    document.getElementById(inputId).value = ""; // Reset file input
  };

  return (
    <div className="add-project-wrapper-ap">
      <header>
        <button className="back-button" onClick={handleBackButtonClick}>
          <SlArrowLeft />
        </button>
        <h2>Add Project</h2>
      </header>

      <div className="body-add-project">
        <div className="form-group">
          <label>Task Name</label>
          <textarea
            className="task-name-textarea"
            placeholder="Enter your task name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Descriptions</label>
          <textarea
            className="description-textarea"
            placeholder="Enter your descriptions if any"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <label className="label-ap">Document Uploads</label>

        <div className="file-input-wrapper-ap">
          <input
            type="file"
            className="file-upload"
            id="financial-statements"
            accept="application/pdf"
            onChange={(e) =>
              handleFileChange(e, setPdf1, setPdf1Name)
            }
          />
          <label htmlFor="financial-statements" className="file-upload-label">
            <img
              src={pdf1 ? pdfIcon : uploadFile}
              alt="Upload File"
              className="upload-icon"
            />
            <span className="upload-text-ap">
              {pdf1Name || "Click to upload"}
            </span>
            {pdf1 && (
              <img
                src={trashIcon}
                alt="Remove File"
                className="upload-icon-r"
                onClick={(e) =>
                  handleRemoveFile(setPdf1, setPdf1Name, "financial-statements", e)
                }
                style={{ cursor: "pointer" }}
              />
            )}
          </label>
        </div>

        {/* Company Profiles Upload */}
        <div className="file-input-wrapper-ap">
          <input
            type="file"
            className="file-upload"
            id="company-profiles"
            accept="application/pdf"
            onChange={(e) =>
              handleFileChange(e, setPdf2, setPdf2Name)
            }
          />
          <label htmlFor="company-profiles" className="file-upload-label">
            <img
              src={pdf2 ? pdfIcon : uploadFile}
              alt="Upload File"
              className="upload-icon"
            />
            <span className="upload-text-ap">
              {pdf2Name || "Click to upload"}
            </span>
            {pdf2 && (
              <img
                src={trashIcon}
                alt="Remove File"
                className="upload-icon-r"
                onClick={(e) =>
                  handleRemoveFile(setPdf2, setPdf2Name, "company-profiles", e)
                }
                style={{ cursor: "pointer" }}
              />
            )}
          </label>
        </div>

        <label className="label-ap">Images & Video Descriptions</label>

        {/* Image 1 */}
        <div className="file-input-wrapper-image">
          <input
            type="file"
            id="imageUpload1"
            name="image1"
            accept="image/*"
            className="file-upload-input-image"
            onChange={(e) => handleImageUpload(e, setImagePreview1, setImageBlob1)}
          />
          {imagePreview1 ? (
            <div className="image-preview-container-image">
              <img src={imagePreview1} alt="Preview" className="image-preview-image" />
              <img
                src={trashIcon}
                alt="Remove File"
                className="remove-icon-image"
                onClick={(e) => handleRemoveImage(e, setImagePreview1, setImageBlob1, "imageUpload1")}
              />
            </div>
          ) : (
            <label htmlFor="imageUpload1" className="file-upload-label-image">
              <img src={cameraIcon} alt="Upload Image" className="camera-icon-image" />
              <span className="upload-text-image">Upload Image</span>
            </label>
          )}
        </div>

        {/* Image 2 */}
        <div className="file-input-wrapper-image">
          <input
            type="file"
            id="imageUpload2"
            name="image2"
            accept="image/*"
            className="file-upload-input-image"
            onChange={(e) => handleImageUpload(e, setImagePreview2, setImageBlob2)}
          />
          {imagePreview2 ? (
            <div className="image-preview-container-image">
              <img src={imagePreview2} alt="Preview" className="image-preview-image" />
              <img
                src={trashIcon}
                alt="Remove File"
                className="remove-icon-image"
                onClick={(e) => handleRemoveImage(e, setImagePreview2, setImageBlob2, "imageUpload2")}
              />
            </div>
          ) : (
            <label htmlFor="imageUpload2" className="file-upload-label-image">
              <img src={cameraIcon} alt="Upload Image" className="camera-icon-image" />
              <span className="upload-text-image">Upload Image</span>
            </label>
          )}
        </div>

        {/* Image 3 */}
        <div className="file-input-wrapper-image">
          <input
            type="file"
            id="imageUpload3"
            name="image3"
            accept="image/*"
            className="file-upload-input-image"
            onChange={(e) => handleImageUpload(e, setImagePreview3, setImageBlob3)}
          />
          {imagePreview3 ? (
            <div className="image-preview-container-image">
              <img src={imagePreview3} alt="Preview" className="image-preview-image" />
              <img
                src={trashIcon}
                alt="Remove File"
                className="remove-icon-image"
                onClick={(e) => handleRemoveImage(e, setImagePreview3, setImageBlob3, "imageUpload3")}
              />
            </div>
          ) : (
            <label htmlFor="imageUpload3" className="file-upload-label-image">
              <img src={cameraIcon} alt="Upload Image" className="camera-icon-image" />
              <span className="upload-text-image">Upload Image</span>
            </label>
          )}
        </div>
      </div>

        <button className="sign-in-button-ap" onClick={handleSaveClick}>
          Save
        </button>
    </div>
  );
};

export default AddProjectView;

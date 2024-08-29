import React, { useState, useEffect } from "react";
import "../Auth/styles/SignUp.css";
import { SlArrowLeft } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import CustomBottomNavigation from "../../widgets/CustomBottomNavigation";
import "./styles/AddProject.css";
import roundedLogo from "../../../assets/images/RoundedLogo.png";
import { useUser } from "../../context/UserContext";
import config from "../../../server/config/config";
import uploadFile from "../../../assets/images/Projects/uploadFile.png";
import trashIcon from "../../../assets/images/trashIcon.png";
import pdfIcon from "../../../assets/images/pdfIcon.png";
import cameraIcon from "../../../assets/images/cameraIcon.png";

const AddProjectView = () => {
  const navigate = useNavigate();
  const { userEmail } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [companyProfiles, setCompanyProfiles] = useState(null);
  const [financialStatements, setFinancialStatements] = useState(null);
  const [companyProfilesName, setCompanyProfilesName] = useState("");
  const [financialStatementsName, setFinancialStatementsName] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${config.apiUrl}/userData/users?email=${userEmail}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data && data.length > 0) {
          setName(data[0].name || "");
          setEmail(data[0].email || "");
          setPhoneNumber(data[0].phone_number || "");
          setAddress(data[0].address || "");
          setWebsite(data[0].website || "");
          setCompanyProfiles(data[0].company_profiles || "");
          setFinancialStatements(data[0].financial_statements || "");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userEmail]);

  const handleSaveClick = async () => {
    if (!email.trim()) {
      console.error("El campo de email no puede estar vacío.");
      return;
    }

    const updatedData = {
      name: name || email,
      phone_number: phoneNumber || "phone_number",
      address: address || "address",
      website: website || "website",
      company_profiles: companyProfiles || "company profiles",
      financial_statements: financialStatements || "financial statements",
      task_name: taskName || "task_name",
      description: description || "description",
    };

    console.log("Datos que se envían en el PATCH:", updatedData);

    try {
      const url = `${config.apiUrl}/userData/users?email=${encodeURIComponent(
        userEmail
      )}`;

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Error del servidor:", errorResponse);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("User updated successfully:", data);
      setIsEditable(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleFileChange = (e, setFile, setFileName) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFile(file);
      setFileName(file.name); // Actualiza el nombre del archivo
    } else {
      console.error("Please select a valid PDF file.");
    }
  };

  const handleRemoveFile = (setFile, setFileName, fileInputId, e) => {
    e.stopPropagation(); // Detiene la propagación del evento
    setFile(null);
    setFileName("");
    document.getElementById(fileInputId).value = ""; // Resetea el input file
  };

   const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Muestra la imagen cargada
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setImagePreview(null); // Elimina la imagen cargada
    document.getElementById("imageUpload").value = ""; // Resetea el input file
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

        {/* Financial Statements Upload */}
        <div className="file-input-wrapper-ap">
          <input
            type="file"
            className="file-upload"
            id="financial-statements"
            accept="application/pdf"
            onChange={(e) =>
              handleFileChange(
                e,
                setFinancialStatements,
                setFinancialStatementsName
              )
            }
          />
          <label htmlFor="financial-statements" className="file-upload-label">
            <img
              src={financialStatements ? pdfIcon : uploadFile}
              alt="Upload File"
              className="upload-icon"
            />
            <span className="upload-text-ap">
              {financialStatementsName || "Click to upload"}
            </span>
            {financialStatements && (
              <img
                src={trashIcon}
                alt="Remove File"
                className="upload-icon-r"
                onClick={(e) =>
                  handleRemoveFile(
                    setFinancialStatements,
                    setFinancialStatementsName,
                    "financial-statements",
                    e
                  )
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
              handleFileChange(e, setCompanyProfiles, setCompanyProfilesName)
            }
          />
          <label htmlFor="company-profiles" className="file-upload-label">
            <img
              src={companyProfiles ? pdfIcon : uploadFile}
              alt="Upload File"
              className="upload-icon"
            />
            <span className="upload-text-ap">
              {companyProfilesName || "Click to upload"}
            </span>
            {companyProfiles && (
              <img
                src={trashIcon}
                alt="Remove File"
                className="upload-icon-r"
                onClick={(e) =>
                  handleRemoveFile(
                    setCompanyProfiles,
                    setCompanyProfilesName,
                    "company-profiles",
                    e
                  )
                }
                style={{ cursor: "pointer" }}
              />
            )}
          </label>
        </div>

        <label className="label-ap">Images & Video Descriptions</label>
        <div className="file-input-wrapper-image">
      <input
        type="file"
        id="imageUpload"
        name="image"
        accept="image/*"
        className="file-upload-input-image"
        onChange={handleImageUpload}
      />
      {imagePreview ? (
        <div className="image-preview-container-image">
          <img src={imagePreview} alt="Preview" className="image-preview-image" />
          <img
            src={trashIcon}
            alt="Remove"
            className="remove-icon-image"
            onClick={handleRemoveImage}
          />
        </div>
      ) : (
        <label htmlFor="imageUpload" className="file-upload-label-image">
          <img src={cameraIcon} alt="Camera Icon" className="camera-icon-image" />
          <span className="upload-text-image">
            <span className="highlight-text-image">Click to Upload</span> or open your camera (Max. File size: 100 MB)
          </span>
        </label>
      )}
    </div>


    <div className="file-input-wrapper-image">
      <input
        type="file"
        id="imageUpload"
        name="image"
        accept="image/*"
        className="file-upload-input-image"
        onChange={handleImageUpload}
      />
      {imagePreview ? (
        <div className="image-preview-container-image">
          <img src={imagePreview} alt="Preview" className="image-preview-image" />
          <img
            src={trashIcon}
            alt="Remove"
            className="remove-icon-image"
            onClick={handleRemoveImage}
          />
        </div>
      ) : (
        <label htmlFor="imageUpload" className="file-upload-label-image">
          <img src={cameraIcon} alt="Camera Icon" className="camera-icon-image" />
          <span className="upload-text-image">
            <span className="highlight-text-image">Click to Upload</span> or open your camera (Max. File size: 100 MB)
          </span>
        </label>
      )}
    </div>

        <button
          className="sign-in-button-ap"
          onClick={handleSaveClick}
          disabled={!isEditable}
        >
          Add Project
        </button>
      </div>
    </div>
  );
};

export default AddProjectView;

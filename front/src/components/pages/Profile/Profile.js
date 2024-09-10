import React, { useState, useEffect } from "react";
import "../Auth/styles/SignUp.css";
import { SlArrowLeft } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import CustomBottomNavigation from "../../widgets/CustomBottomNavigation";
import "./styles/Profile.css";
import roundedLogo from "../../../assets/images/RoundedLogo.png";
import { useUser } from "../../context/UserContext";
import uploadFile from "../../../assets/images/Projects/uploadFile.png";

const ProfileView = () => {
  const navigate = useNavigate();
  const { userType, userEmail } = useUser();
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
  const apiUrl = process.env.REACT_APP_BACKEND_API_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/userData/users?email=${userEmail}`,
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
    const toBase64 = (blob) => {
      console.log(blob);
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => resolve(reader.result.split(",")[1]); // Quita el encabezado del data URL
        reader.onerror = (error) => reject(error);
      });
    };

    if (!email.trim()) {
      console.error("El campo de email no puede estar vacío.");
      return;
    }

    console.log(companyProfiles)
    console.log(financialStatements)
    const updatedData = {
      name: name || email,
      phone_number: phoneNumber || "phone_number",
      address: address || "address",
      website: website || "website",
      company_profiles: companyProfiles.type === "application/pdf" ? await toBase64(companyProfiles) : null,
      financial_statements: financialStatements.type === "application/pdf" ? await toBase64(financialStatements) : null,
    };

    console.log("Datos que se envían en el PATCH:", updatedData);

    try {
      const url = `${apiUrl}/userData/users?email=${encodeURIComponent(userEmail)}`;

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
      setFileName(file.name); // Update file name
    } else {
      console.error("Please select a valid PDF file.");
    }
  };

  return (
    <div className="sign-in-wrapper">
      <header>
        <button className="back-button" onClick={handleBackButtonClick}>
          <SlArrowLeft />
        </button>
        <h2>Profile</h2>
      </header>

      <img src={roundedLogo} alt="Rounded Logo" className="rounded-logo" />

      <h1 className="HName">{name}</h1>
      <p className="idInfo">{email}</p>

      <button
        className={`edit-button ${isEditable ? "active" : ""}`}
        onClick={toggleEdit}
      >
        {isEditable ? "Cancel" : "Edit"}
      </button>

      <div className="input-wrapper">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
          disabled={!isEditable}
          placeholder="Name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
          disabled={!isEditable}
          placeholder="Email"
        />
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="input-field"
          disabled={!isEditable}
          placeholder="Phone Number"
        />
        {userType === 0 && (
          <>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="input-field"
              disabled={!isEditable}
              placeholder="Address"
            />
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="input-field"
              disabled={!isEditable}
              placeholder="Website"
            />
            <div className="file-input-wrapper">
              <input
                type="file"
                onChange={(e) => handleFileChange(e, setCompanyProfiles, setCompanyProfilesName)}
                className="file-upload"
                id="company-profiles"
                disabled={!isEditable}
                accept="application/pdf"
              />
              <label htmlFor="company-profiles" className="file-upload-label">
                <span className="upload-text">Company Profiles</span>
                <img
                  src={uploadFile}
                  alt="Upload File"
                  className="upload-icon"
                />
              </label>
              {companyProfilesName && <p>{companyProfilesName}</p>} {/* Muestra el nombre del archivo */}
            </div>

            <div className="file-input-wrapper">
              <input
                type="file"
                onChange={(e) => handleFileChange(e, setFinancialStatements, setFinancialStatementsName)}
                className="file-upload"
                id="financial-statements"
                disabled={!isEditable}
                accept="application/pdf"
              />
              <label htmlFor="financial-statements" className="file-upload-label">
                <span className="upload-text">Financial Statements</span>
                <img
                  src={uploadFile}
                  alt="Upload File"
                  className="upload-icon"
                />
              </label>
              {financialStatementsName && <p>{financialStatementsName}</p>} {/* Muestra el nombre del archivo */}
            </div>
          </>
        )}

        <button
          className="sign-in-button"
          onClick={handleSaveClick}
          disabled={!isEditable}
        >
          Save
        </button>
      </div>
      <CustomBottomNavigation hasAnyMessage={false} name="Home" />
    </div>
  );
};

export default ProfileView;

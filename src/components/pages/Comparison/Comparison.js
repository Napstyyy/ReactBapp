import config from '../../../server/config/config'; // Importa la configuración
import React, { useState, useEffect, useCallback } from "react";
import './styles/Comparison.css';
import DashboardChart from '../../widgets/DashboardChart';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import _ from 'lodash';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import pdfImage from "../../../assets/images/Opentender-Logo-HD.png";

const ScrollableTable = (quotes) => {
  const data = quotes.quotes;

  return (
    <div className='comparison-table-container'>
      <table className="comparison-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Payment terms</th>
            <th>Warranty</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>
                <div className="comparison-table-company-cell">
                  <div>
                    <div className='comparison-table-company-name'>{item.name}</div>
                    <div className='comparison-table-price'>{item.price}</div>
                  </div>
                </div>
              </td>
              <td>
                <div className={`comparison-table-payment-terms payment-bg-green`}>
                  {item.payment_terms}
                </div>
              </td>
              <td>
                <div className={`comparison-table-warranty-cell`}>
                  {item.warranty}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ComparisonView = () => {
  const [quotes, setQuotes] = useState([]);
  const [project, setProject] = useState([]);
  const location = useLocation();
  const { projectId, name } = location.state;
  const nameProjectId = name || projectId;
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY; // Access API key from .env
  let isGeneratingPdf = false;

  function wrapText(text, maxLength) {
    let wrappedText = '';
    let currentLineLength = 0;

    // Split the text into words
    const words = text.split(' ');

    words.forEach((word) => {
      // If adding the next word exceeds maxLength, add a newline
      if (currentLineLength + word.length + 1 > maxLength) {
        wrappedText += '\n';
        currentLineLength = 0;
      }

      // Add the word to the wrapped text
      wrappedText += (currentLineLength > 0 ? ' ' : '') + word;
      currentLineLength += word.length + 1; // Update line length, including space
    });

    return wrappedText;
  }

  const generatePDF = async (projectData, quotesList) => {
    console.log("generando");
    if (isGeneratingPdf)
      return;

    isGeneratingPdf = true;
    const doc = new jsPDF();
    fetchOpenAI(project, quotes)
      .then(response => {
        console.log(response.data.choices[0].message.content);
        const aiResponse = wrapText(response.data.choices[0].message.content, 100);
        const project = {
          name: projectData.name,
          description: projectData.description
        };

        doc.setFontSize(16);
        doc.text('Project Information', 10, 10);
        doc.setFontSize(12);
        doc.text(`Project Name: ${project.name}`, 10, 20);
        doc.text(`Project Description: ${project.description}`, 10, 30);

        const tableData = quotesList.map((quote, index) => [index + 1, quote.name, quote.payment_terms, quote.warranty, quote.price]);

        doc.setFontSize(16);
        doc.text('Quotes Table', 10, 50);

        autoTable(doc, {
          startY: 60,
          head: [['#', 'Name', 'PaymentTerms', 'Warranty', 'Price']],
          body: tableData,
          theme: 'striped',
          headStyles: { fillColor: [22, 160, 133] },
          margin: { top: 10 },
          didDrawPage: (data) => {
            doc.setFontSize(16);
            doc.text('AI Summary', 10, data.cursor.y + 20);
            doc.setFontSize(12);
            doc.text(aiResponse, 10, data.cursor.y + 30);
          }
        });

        // Add the image to the bottom right corner
        const img = new Image();
        img.src = pdfImage;
        img.onload = () => {
          const imgWidth = 50; // Image width in mm
          const imgHeight = 50; // Image height in mm
          const pdfWidth = doc.internal.pageSize.getWidth();
          const pdfHeight = doc.internal.pageSize.getHeight();

          // Draw the image
          doc.addImage(img, 'PNG', pdfWidth - imgWidth - 10, pdfHeight - imgHeight - 10, imgWidth, imgHeight);

          // Convert PDF to Blob
          const pdfBlob = doc.output('blob');

          // Create a URL for the Blob
          const pdfUrl = URL.createObjectURL(pdfBlob);

          // Open the PDF in a new tab
          window.open(pdfUrl, '_blank');
        };
      })
      .catch(error => {
        console.error("Error making API request to OpenAI:", error);
      });

    // Add project info

    isGeneratingPdf = false;
  };


  const fetchOpenAI = (project, quotes) => {
    return axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo", // Use the correct model name
        messages: [
          { role: "system", content: "You are an assistant for a project." },
          { role: "user", content: `ProjectName: ${project.name}\nDescription: ${project.description}\nQuotes: ${JSON.stringify(quotes)}\nWhich one is the best quote? Argument using other quotes` }
        ],
        max_tokens: 100,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`, // Use the API key from .env
        },
      }
    );
  };

  useEffect(() => {
    // Wrap everything in an async function to handle the async logic
    console.log("useEffect");
    const fetchData = async () => {
      let validData = true;
      let projectLocal = {};
      let quotesLocal = [];

      console.log("fetchDataRunning");
      try {
        const quotesResponse = await axios.get(`${config.apiUrl}/projects/getProjectQuotes/${nameProjectId}`);
        quotesLocal = quotesResponse.data;
        setQuotes(quotesLocal); // Update state

        const projectResponse = await axios.get(`${config.apiUrl}/projects/getOneProject/${nameProjectId}`);
        projectLocal = projectResponse.data[0];
        setProject(projectLocal); // Update state

      } catch (error) {
        validData = false;
        console.error('Error fetching project or quotes!', error);
      }

      if (!validData) return;
      console.log(quotesLocal);
      console.log(projectLocal)
    };

    fetchData(); // Call the async function
  }, []);

  return (
    <div className="comparison-page">
      <div className="comparison-header">
        <h1>{project.name}</h1>
      </div>
      <DashboardChart quotes={quotes} />
      <div className="comparison-subtitle">
        <h1>At a Glance</h1>
      </div>
      <ScrollableTable quotes={quotes} />
      <button className="comparison-gradient-button" onClick={() => { generatePDF(project, quotes); }}>
        Edit Requirements & Re-quote
      </button>
    </div>
  );
};

export default ComparisonView;

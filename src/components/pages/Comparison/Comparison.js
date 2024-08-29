import config from '../../../server/config/config'; // Importa la configuración
import React, { useState, useEffect } from "react";
import './styles/Comparison.css';
import DashboardChart from '../../widgets/DashboardChart';
import axios from "axios";
import { useLocation } from 'react-router-dom';

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

  useEffect(() => {
    console.log(nameProjectId);
    axios.get(`${config.apiUrl}/projects/getProjectQuotes/${nameProjectId}`).then(response => {
      // console.log("Quotes", response.data);
      setQuotes(response.data);
    }).catch(error => {
      console.error('Error fetching project!', error);
    });
    axios.get(`${config.apiUrl}/projects/getOneProject/${nameProjectId}`).then(response => {
      console.log(response.data[0]);
      setProject(response.data[0]);
    }).catch(error => {
      console.error('Error fetching project!', error);
    });
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
      <button className="comparison-gradient-button" onClick={() => { console.log("Agogo"); }}>
        Edit Requirements & Re-quote
      </button>
    </div>
  );
};

export default ComparisonView;

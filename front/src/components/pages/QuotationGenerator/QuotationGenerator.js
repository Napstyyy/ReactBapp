import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../../context/UserContext';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import './styles/QuotationGenerator.css';

const QuotationGenerator = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId, name } = location.state; // Obtiene el projectId de la ubicación
  const nameProjectId = name || projectId; // Usa projectId si name no está disponible
  const { userType, userEmail } = useUser(); // Obtén userType del contexto
  const [rows, setRows] = useState([{ description: '', unit: '', price: '' }]);
  const [discountRows, setDiscountRows] = useState([{ description: '', price: '' }]);
  const [paymentTerms, setPaymentTerms] = useState('');
  const [warranty, setWarranty] = useState('');
  const [note, setNote] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;

  const goHome = () => {
    navigate("/Home");
  };

  // Function to add a new row in the item breakdown section
  const addRow = () => {
    setRows([...rows, { description: '', unit: '', price: '' }]);
  };

  // Function to add a new row in the discount section
  const addDiscountRow = () => {
    setDiscountRows([...discountRows, { description: '', price: '' }]);
  };

  // Calculate the total for items
  const calculateItemTotal = () => {
    return rows.reduce((total, row) => {
      const unit = parseFloat(row.unit) || 0;
      const price = parseFloat(row.price) || 0;
      return total + (unit * price);
    }, 0);
  };

  // Calculate the total for discounts
  const calculateDiscountTotal = () => {
    return discountRows.reduce((total, row) => {
      const price = parseFloat(row.price) || 0;
      return total + price;
    }, 0);
  };

  const itemTotal = calculateItemTotal();
  const discountTotal = calculateDiscountTotal();
  const grandTotal = itemTotal - discountTotal;

  // Function to handle form submission
  const handleSubmit = () => {
    const data = {
      id_user: userEmail,
      id_project: nameProjectId,
      payment_terms: paymentTerms,
      warranty: warranty,
      note: note,
      price: grandTotal, // This is the grand total after applying discounts
      items: rows,
      discounts: discountRows,
    };

    // Send 'data' to your server
    axios.post(`${apiUrl}/projects/addQuote`, data)
      .then(response => {
        console.log('Quote added successfully:', response.data);
        goHome();
        // You can handle success response here, like showing a success message or resetting the form
      })
      .catch(error => {
        console.error('There was an error adding the quote!', error);
        // Handle the error, like showing an error message to the user
      });


  };

  return (
    <div className="quotation-container">
      <header>
        <div className="header-title">
          <h1>QUOTATION GENERATOR</h1>
        </div>
        <div className="header-subtitle">
          <p>Repainting of building @cyberjaya, malaysia</p>
        </div>
      </header>
      
      <div className="form-group">
        <label>Payment Terms</label>
        <input 
          type="text" 
          placeholder="Enter Payments Terms" 
          value={paymentTerms}
          onChange={(e) => setPaymentTerms(e.target.value)}
        />
      </div>
      
      <div className="form-group">
        <label>Warranty</label>
        <input 
          type="text" 
          placeholder="Enter Warranty"
          value={warranty}
          onChange={(e) => setWarranty(e.target.value)}
        />
      </div>
      
      <div className="item-breakdown">
        <h3>Item Breakdown</h3>
        <div className="table">
          <div className="table-header">
            <span>Descriptions</span>
            <span>Unit</span>
            <span>Price/Unit (RM)</span>
          </div>
          {rows.map((row, index) => (
            <div className="table-row" key={index}>
              <input 
                type="text" 
                value={row.description} 
                onChange={(e) => {
                  const newRows = [...rows];
                  newRows[index].description = e.target.value;
                  setRows(newRows);
                }} 
              />
              <input 
                type="number" 
                value={row.unit} 
                onChange={(e) => {
                  const newRows = [...rows];
                  newRows[index].unit = e.target.value;
                  setRows(newRows);
                }} 
              />
              <input 
                type="number" 
                value={row.price} 
                onChange={(e) => {
                  const newRows = [...rows];
                  newRows[index].price = e.target.value;
                  setRows(newRows);
                }} 
              />
            </div>
          ))}
        </div>
        <div className="item-footer">
          <button className="add-item" onClick={addRow}>Add Item</button>
          <div className="total">Total: RM {itemTotal.toFixed(2)}</div>
        </div>
      </div>
      
      <div className="discount-section">
        <h3>Discount</h3>
        <div className="table">
          <div className="table-header">
            <span>Descriptions</span>
            <span className='price_unit'>Price/Unit (RM)</span>
          </div>
          {discountRows.map((row, index) => (
            <div className="table-row" key={index}>
              <input 
                className='description-discount' 
                type="text" 
                value={row.description} 
                onChange={(e) => {
                  const newRows = [...discountRows];
                  newRows[index].description = e.target.value;
                  setDiscountRows(newRows);
                }} 
              />
              <input 
                type="number" 
                value={row.price} 
                onChange={(e) => {
                  const newRows = [...discountRows];
                  newRows[index].price = e.target.value;
                  setDiscountRows(newRows);
                }} 
              />
            </div>
          ))}
        </div>
        <div className="item-footer">
          <button className="add-item" onClick={addDiscountRow}>Add Discount</button>
          <div className="grand-total" style={{ color: '#756EF3' }}>Grand Total: RM {grandTotal.toFixed(2)}</div>
        </div>
      </div>
      
      <div className="form-group">
        <label>Additional Notes</label>
        <textarea 
          placeholder="Notes to clients"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
      
      <button className="submitButton" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default QuotationGenerator;

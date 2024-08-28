import React, { useState } from 'react';
import './styles/QuotationGenerator.css';

const QuotationGenerator = () => {
  // State for maintaining rows in the item breakdown section
  const [rows, setRows] = useState([{ description: '', unit: '', price: '' }]);
  
  // State for maintaining rows in the discount section
  const [discountRows, setDiscountRows] = useState([{ description: '', price: '' }]);

  // Function to add a new row in the item breakdown section
  const addRow = () => {
    setRows([...rows, { description: '', unit: '', price: '' }]);
  };

  // Function to add a new row in the discount section
  const addDiscountRow = () => {
    setDiscountRows([...discountRows, { description: '', price: '' }]);
  };

  // Function to handle form submission
  const handleSubmit = () => {
    const data = {
      items: rows,
      discounts: discountRows,
      // You can add other form data here as well
    };

    // Send 'data' to your server
    console.log('Data to be sent to the server:', data);
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
        <input type="text" placeholder="Enter Payments Terms" />
      </div>
      
      <div className="form-group">
        <label>Warranty</label>
        <input type="text" placeholder="Enter Warranty" />
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
              <input type="text" value={row.description} onChange={(e) => {
                const newRows = [...rows];
                newRows[index].description = e.target.value;
                setRows(newRows);
              }} />
              <input type="number" value={row.unit} onChange={(e) => {
                const newRows = [...rows];
                newRows[index].unit = e.target.value;
                setRows(newRows);
              }} />
              <input type="number" value={row.price} onChange={(e) => {
                const newRows = [...rows];
                newRows[index].price = e.target.value;
                setRows(newRows);
              }} />
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
              <input className='description-discount' type="text" value={row.description} onChange={(e) => {
                const newRows = [...discountRows];
                newRows[index].description = e.target.value;
                setDiscountRows(newRows);
              }} />
              <input type="number" value={row.price} onChange={(e) => {
                const newRows = [...discountRows];
                newRows[index].price = e.target.value;
                setDiscountRows(newRows);
              }} />
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
        <textarea placeholder="Notes to clients"></textarea>
      </div>
      
      <button className="submitButton" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default QuotationGenerator;

import React from 'react';
import './styles/DashboardChart.css';
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const calculateAveragePrice = products => 
  products.length === 0 ? '$0.00' : `$${(products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2)}`;

const calculateMaxPrice = products => 
  products.length === 0 ? '$0.00' : `$${Math.max(...products.map(p => p.price)).toFixed(2)}`;

const calculateMinPrice = products => 
  products.length === 0 ? '$0.00' : `$${Math.min(...products.map(p => p.price)).toFixed(2)}`;


const DashboardChart = (quotes) => {
  const data = quotes.quotes;
  return (
    <div className="dashboard-chart-container">
      <h3 className="dashboard-chart-title">{quotes.name}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid horizontal={true} vertical={false} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} height={40} />
          <Tooltip />
          <Bar dataKey="price" fill="#344BFD" barSize="3%" activeBar={{ fill: "#FF9359" }} radius={[10, 10, 10, 10]} />
        </BarChart>
      </ResponsiveContainer>
      <div className="dashboard-chart-summary">
        <div className="dashboard-chart-price-item">
          <span className="dashboard-chart-label"><strong>Highest</strong></span>
          <span className="dashboard-chart-value">{calculateAveragePrice(data)}</span>
        </div>
        <div className="dashboard-chart-price-item">
          <span className="dashboard-chart-label"><strong>Lowest</strong></span>
          <span className="dashboard-chart-value">{calculateMinPrice(data)}</span>
        </div>
        <div className="dashboard-chart-price-item">
          <span className="dashboard-chart-label"><strong>Average</strong></span>
          <span className="dashboard-chart-value">{calculateMaxPrice(data)}</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardChart;

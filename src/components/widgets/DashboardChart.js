import React from 'react';
import './styles/DashboardChart.css';
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'A', value: 1300890 },
  { name: 'B', value: 1890889 },
  { name: 'C', value: 1560000 },
  { name: 'D', value: 1780000 },
  { name: 'E', value: 1030890 },
];

const DashboardChart = () => (
  <div className="dashboard-chart-container">
    <h3 className="dashboard-chart-title">5 QUOTATION</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid horizontal={true} vertical={false} />
        <XAxis dataKey="name" axisLine={false} tickLine={false} height={40}/>
        <Tooltip />
        <Bar dataKey="value" fill="#344BFD" barSize="3%" activeBar={{ fill: "#FF9359" }} radius={[10, 10, 10, 10]} />
      </BarChart>
    </ResponsiveContainer>
    <div className="dashboard-chart-summary">
      <div className="dashboard-chart-price-item">
        <span className="dashboard-chart-label"><strong>Highest</strong></span>
        <span className="dashboard-chart-value">RM 1,890,889</span>
      </div>
      <div className="dashboard-chart-price-item">
        <span className="dashboard-chart-label"><strong>Lowest</strong></span>
        <span className="dashboard-chart-value">RM 1,030,890</span>
      </div>
      <div className="dashboard-chart-price-item">
        <span className="dashboard-chart-label"><strong>Average</strong></span>
        <span className="dashboard-chart-value">RM 1,563,000</span>
      </div>
    </div>
  </div>
);

export default DashboardChart;

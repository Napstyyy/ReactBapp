import React from 'react';
import './styles/Comparison.css';
import DashboardChart from '../../widgets/DashboardChart';

const ScrollableTable = () => {
  const data = [
    {
      company: 'ABC Construction S/B',
      amount: 'RM 1,000,000',
      paymentTermsShort: '10% Upfront, in 10 months',
      paymentBgColorClass: 'payment-bg-green', // Class for background color
      warranty: "18 Months",
    },
    {
      company: 'Groove Repair S/B',
      amount: 'RM 890,087',
      paymentTermsShort: '10% Upfront, in 10 months',
      paymentBgColorClass: 'payment-bg-green',
      warranty: "18 Months",
    },
    {
      company: 'Easy Fix S/B',
      amount: 'RM 1,890,000',
      paymentTermsShort: '50% Upfront, in 10 months',
      paymentBgColorClass: 'payment-bg-yellow',
      warranty: "18 Months",
    },
    {
      company: 'ABC Construction S/B',
      amount: 'RM 1,030,890',
      paymentTermsShort: '30% Upfront, in 10 months',
      paymentBgColorClass: 'payment-bg-yellow',
      warranty: "18 Months",
    },
  ];

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
                    <div className='comparison-table-company-name'>{item.company}</div>
                    <div className='comparison-table-price'>{item.amount}</div>
                  </div>
                </div>
              </td>
              <td>
                <div className={`comparison-table-payment-terms ${item.paymentBgColorClass}`}>
                  {item.paymentTermsShort}
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
  return (
    <div className="comparison-page">
      <div className="comparison-header">
        <h1>Major Cock sucking</h1>
        <p>@cyberjaya malasya</p>
      </div>
      <DashboardChart />
      <div className="comparison-subtitle">
        <h1>At a Glance</h1>
      </div>
      <ScrollableTable />
      <button className="comparison-gradient-button" onClick={() => { console.log("Agogo"); }}>
        Edit Requirements & Re-quote
      </button>
    </div>
  );
};

export default ComparisonView;

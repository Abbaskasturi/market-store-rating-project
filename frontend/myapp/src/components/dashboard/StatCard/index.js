import React from 'react';
import './index.css';
const StatCard = ({ title, value }) => (
  <div className="stat-card">
    <h3 className="stat-title">{title}</h3>
    <p className="stat-value">{value}</p>
  </div>
);
export default StatCard;
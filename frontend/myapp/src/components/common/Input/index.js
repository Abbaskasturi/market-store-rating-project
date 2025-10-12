import React from 'react';
import './index.css';
const Input = ({ label, type = 'text', value, onChange, name, required = false }) => (
  <div className="input-group">
    <label>{label}</label>
    <input type={type} value={value} onChange={onChange} name={name} required={required} className="custom-input" />
  </div>
);
export default Input;
import React from 'react';
import './index.css';
const Button = ({ children, onClick, type = 'button', disabled = false }) => (
  <button type={type} onClick={onClick} className="custom-button" disabled={disabled}>
    {children}
  </button>
);
export default Button;
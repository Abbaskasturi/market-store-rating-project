import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const UnauthorizedPage = () => {
  return (
    <div className="unauthorized-container">
      <h1>403 - Forbidden</h1>
      <p>Sorry, you do not have permission to access this page.</p>
      <Link to="/" className="home-link">
        Return to Homepage
      </Link>
    </div>
  );
};

export default UnauthorizedPage;
import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './index.css';

const HomePage = () => {
  const { user } = useAuth();

  if (user) {
    switch (user.role) {
      case 'admin': return <Navigate to="/admin/dashboard" replace />;
      case 'owner': return <Navigate to="/owner/dashboard" replace />;
      case 'user': return <Navigate to="/dashboard" replace />;
      default: return <Navigate to="/login" replace />;
    }
  }

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to StoreRatings</h1>
        <p>Your one-stop platform to rate and review your favorite stores.</p>
        <div className="home-buttons">
          <Link to="/login" className="home-btn login-btn">Login</Link>
          <Link to="/signup" className="home-btn signup-btn">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
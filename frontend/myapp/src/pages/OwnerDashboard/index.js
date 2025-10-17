import React, { useState, useEffect } from 'react';
import { getOwnerDashboard } from '../../api';
import StatCard from '../../components/dashboard/StatCard';
import './index.css';
import { FaStar } from "react-icons/fa6";

const OwnerDashboard = () => {
  const [dashboardData, setDashboardData] = useState({ averageRating: 0, raters: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOwnerDashboard();
        setDashboardData(response.data.data);
      } catch (error) {
        console.error("Failed to fetch owner dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading your dashboard...</p>;

  const avgRating = dashboardData.averageRating ? dashboardData.averageRating.toFixed(2) : 'N/A';

  return (
    <div className="page-container">
      <h1>Your Store Dashboard</h1>
      <div className="owner-stats">
        <StatCard title="Average Rating" value={avgRating} />
        <StatCard title="Total Ratings Received" value={dashboardData.raters.length} />
      </div>

      <div className="raters-list">
        <h3>Users Who Rated Your Store</h3>
        {dashboardData.raters.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>User Name</th>
                <th>Email</th>
                <th>Rating Given</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.raters.map((rater, index) => (
                <tr key={index}>
                  <td>{rater.name}</td>
                  <td>{rater.email}</td>
                  <td>{rater.rating} <FaStar/></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No ratings have been submitted for your store yet.</p>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
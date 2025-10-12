import React, { useState, useEffect, useCallback } from 'react';
import { getAdminDashboard, adminGetUsers } from '../../api';
import StatCard from '../../components/dashboard/StatCard';
import UserList from '../../components/dashboard/UserList';
import Button from '../../components/common/Button';
import AddStoreModal from '../../components/dashboard/AddStoreModal';
import AddUserModal from '../../components/dashboard/AddUserModal'; 
import './index.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalStores: 0, totalRatings: 0 });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const fetchData = useCallback(async () => {
  
    setLoading(true);
    try {
      const statsRes = await getAdminDashboard();
      setStats(statsRes.data.data);
      const usersRes = await adminGetUsers();
      setUsers(usersRes.data.data);
    } catch (error) {
      console.error("Failed to fetch admin data", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleStoreAdded = () => {
    setIsStoreModalOpen(false);
    fetchData(); 
  };

  const handleUserAdded = () => {
    setIsUserModalOpen(false);
    fetchData();
  };

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="page-container">
      {isStoreModalOpen && <AddStoreModal onClose={() => setIsStoreModalOpen(false)} onSuccess={handleStoreAdded} />}
      {isUserModalOpen && <AddUserModal onClose={() => setIsUserModalOpen(false)} onSuccess={handleUserAdded} />}

      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="header-actions">
          <Button onClick={() => setIsUserModalOpen(true)}>+ Add New User</Button>
          <Button onClick={() => setIsStoreModalOpen(true)}>+ Add New Store</Button>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Total Stores" value={stats.totalStores} />
        <StatCard title="Total Ratings" value={stats.totalRatings} />
      </div>

      <div className="user-list-container">
        <h2>All Users</h2>
        <UserList users={users} />
      </div>
    </div>
  );
};

export default AdminDashboard;
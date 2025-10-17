import React, { useState, useEffect, useCallback } from 'react';
import { getAdminDashboard, adminGetUsers } from '../../api';
import StatCard from '../../components/dashboard/StatCard';
import UserList from '../../components/dashboard/UserList';
import Button from '../../components/common/Button';
import AddStoreModal from '../../components/dashboard/AddStoreModal';
import AddUserModal from '../../components/dashboard/AddUserModal';
import Loader from '../../components/Loader';
import './index.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalStores: 0, totalRatings: 0 });
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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
      setFilteredUsers(usersRes.data.data);
    } catch (error) {
      console.error('Failed to fetch admin data', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        [user.name, user.email, user.address, user.role]
          .filter(Boolean)
          .some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const handleStoreAdded = () => {
    setIsStoreModalOpen(false);
    fetchData();
  };

  const handleUserAdded = () => {
    setIsUserModalOpen(false);
    fetchData();
  };

  if (loading) return <Loader />;

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

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Name, Email, Address, or Role"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="user-list-container">
        <h2>All Users</h2>
        <UserList users={filteredUsers} />
      </div>
    </div>
  );
};

export default AdminDashboard;

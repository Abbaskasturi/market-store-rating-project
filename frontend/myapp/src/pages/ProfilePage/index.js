import React, { useState } from 'react';
import { updateUserPassword } from '../../api';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import './index.css';

const ProfilePage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    setLoading(true);
    try {
      await updateUserPassword({ password });
      setMessage('Password updated successfully!');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password. Please ensure it meets the requirements.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="profile-form-wrapper">
        <h2 className="form-title">Update Your Password</h2>
        <p className="form-subtitle">Enter and confirm your new password below. It must be 8-16 characters and include one uppercase letter and one special character.</p>
        <form onSubmit={handleSubmit} className="form-container">
          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}
          <Input
            label="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Password'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
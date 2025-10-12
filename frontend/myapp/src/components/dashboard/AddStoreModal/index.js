import React, { useState, useEffect } from 'react';
import { adminAddStore, adminGetUsers } from '../../../api';
import Input from '../../common/Input';
import Button from '../../common/Button';
import './index.css';

const AddStoreModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({ name: '', email: '', address: '', owner_id: '' });
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await adminGetUsers({ role: 'owner' });
        setOwners(response.data.data);
      } catch (err) { setError('Could not fetch store owners.'); }
    };
    fetchOwners();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.owner_id) { setError('You must select a store owner.'); return; }
    setError(''); setLoading(true);
    try {
      await adminAddStore(formData);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add store.');
    } finally { setLoading(false); }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Store</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <Input label="Store Name" name="name" value={formData.name} onChange={handleChange} required />
          <Input label="Store Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
          <Input label="Store Address" name="address" value={formData.address} onChange={handleChange} required />
          <div className="input-group">
            <label>Assign Owner</label>
            <select name="owner_id" value={formData.owner_id} onChange={handleChange} required className="custom-input">
              <option value="" disabled>-- Select an Owner --</option>
              {owners.map((owner) => (
                <option key={owner.id} value={owner.id}>{owner.name} ({owner.email})</option>
              ))}
            </select>
          </div>
          <div className="modal-actions">
            <Button type="button" onClick={onClose} disabled={loading}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Store'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddStoreModal;
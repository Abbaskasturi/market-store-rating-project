import { useEffect, useState } from 'react';
import { getUserStores, submitUserRating } from '../../api';
import StoreList from '../../components/dashboard/StoreList';
import './index.css';

const UserDashboard = () => {
  const [allStores, setAllStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchStores = async () => {
    setLoading(true);
    try {
      const response = await getUserStores({});
      const data = response.data.data || [];
      setAllStores(data);
      setFilteredStores(data);
    } catch (error) {
      console.error('Failed to fetch stores', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredStores(allStores);
    } else {
      const lowerSearch = searchTerm.toLowerCase();
      const results = allStores.filter(
        store =>
          store.name.toLowerCase().includes(lowerSearch) ||
          store.address.toLowerCase().includes(lowerSearch)
      );
      setFilteredStores(results);
    }
  }, [searchTerm, allStores]);

  const handleRatingSubmit = async (storeId, rating) => {
    try {
      await submitUserRating({ store_id: storeId, rating });
      fetchStores();
    } catch (error) {
      console.error('Failed to submit rating', error);
      alert('Could not submit rating. Please try again.');
    }
  };

  return (
    <div className="page-container">
      <h1>Store Dashboard</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search stores by name or address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      {loading ? (
        <p>Loading stores...</p>
      ) : (
        <StoreList stores={filteredStores} onRate={handleRatingSubmit} />
      )}
    </div>
  );
};

export default UserDashboard;

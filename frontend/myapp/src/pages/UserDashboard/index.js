import { useCallback, useEffect, useState } from 'react';
import { getUserStores, submitUserRating } from '../../api';
import StoreList from '../../components/dashboard/StoreList';
import './index.css';

const UserDashboard = () => {
  const [stores, setStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchStores = useCallback(async () => {
    setLoading(true);
    try {
      const params = { name: searchTerm };
      const response = await getUserStores(params);
      setStores(response.data.data);
    } catch (error) {
      console.error("Failed to fetch stores", error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  const handleRatingSubmit = async (storeId, rating) => {
    try {
      await submitUserRating({ store_id: storeId, rating });
      fetchStores(); 
    } catch (error) { 
      console.error("Failed to submit rating", error);
      alert("Could not submit rating. Please try again.");
    }
  };

  return (
    <div className="page-container">
      <h1>Store Dashboard</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for stores by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      {loading ? (
        <p>Loading stores...</p>
      ) : (
        <StoreList stores={stores} onRate={handleRatingSubmit} />
      )}
    </div>
  );
};

export default UserDashboard;
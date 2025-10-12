import React, { useState } from 'react';
import './index.css';

const StoreList = ({ stores, onRate }) => {
  const [ratings, setRatings] = useState({});
  const handleRatingChange = (storeId, rating) => setRatings({ ...ratings, [storeId]: rating });
  const handleSubmitRating = (storeId) => {
    if (ratings[storeId]) onRate(storeId, ratings[storeId]);
  };

  if (!stores || stores.length === 0) return <p>No stores found.</p>;

  return (
    <div className="store-list">
      {stores.map((store) => (
        <div key={store.id} className="store-card">
          <div className="store-info">
            <h3>{store.name}</h3>
            <p>{store.address}</p>
            <p className="rating-info">Overall: {store.overallRating ? store.overallRating.toFixed(1) : 'N/A'} ★</p>
            {store.userSubmittedRating && <p className="user-rating-info">Your Rating: {store.userSubmittedRating} ★</p>}
          </div>
          <div className="rating-action">
            <select onChange={(e) => handleRatingChange(store.id, e.target.value)} value={ratings[store.id] || ''} className="rating-select">
              <option value="" disabled>Rate</option>
              {[1, 2, 3, 4, 5].map(r => <option key={r} value={r}>{r} ★</option>)}
            </select>
            <button onClick={() => handleSubmitRating(store.id)} className="rate-button">Submit</button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default StoreList;
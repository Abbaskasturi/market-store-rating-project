
const db = require('../config/db');

const Rating = {};

Rating.createOrUpdate = (data, callback) => {
  const { user_id, store_id, rating } = data;
  db.run(
    'INSERT INTO Ratings (user_id, store_id, rating) VALUES (?, ?, ?) ON CONFLICT(user_id, store_id) DO UPDATE SET rating = excluded.rating',
    [user_id, store_id, rating],
    function(err) {
      callback(err, { changes: this.changes, id: this.lastID });
    }
  );
};

Rating.update = (data, callback) => {
    const { user_id, store_id, rating } = data;
    db.run('UPDATE Ratings SET rating = ? WHERE user_id = ? AND store_id = ?', [rating, user_id, store_id], function(err) {
        callback(err, { changes: this.changes });
    });
};

Rating.getTotalCount = (callback) => db.get('SELECT COUNT(*) as count FROM Ratings', [], callback);

module.exports = Rating;

const db = require('../config/db');

const Store = {};

Store.create = (store, callback) => {
    const { name, email, address, owner_id } = store;
    db.run('INSERT INTO Stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)', [name, email, address, owner_id], function(err) {
        callback(err, { id: this.lastID });
    });
};

Store.findAllForAdmin = (filters, callback) => {
    let sql = `SELECT s.*, (SELECT AVG(r.rating) FROM Ratings r WHERE r.store_id = s.id) as rating FROM Stores s`;
    
    db.all(sql, [], callback);
};

Store.findAllForUser = (filters, userId, callback) => {
    let sql = `
      SELECT s.id, s.name, s.address,
        (SELECT AVG(r.rating) FROM Ratings r WHERE r.store_id = s.id) as overallRating,
        (SELECT r.rating FROM Ratings r WHERE r.store_id = s.id AND r.user_id = ?) as userSubmittedRating
      FROM Stores s WHERE 1=1
    `;
    const params = [userId];
    if (filters.name) { sql += ' AND s.name LIKE ?'; params.push(`%${filters.name}%`); }
    if (filters.address) { sql += ' AND s.address LIKE ?'; params.push(`%${filters.address}%`); }
    db.all(sql, params, callback);
};

Store.findDashboardByOwnerId = (ownerId, callback) => {
    const avgRatingSql = `SELECT AVG(r.rating) as averageRating FROM Ratings r JOIN Stores s ON r.store_id = s.id WHERE s.owner_id = ?`;
    const ratersSql = `SELECT u.name, u.email, r.rating FROM Ratings r JOIN Users u ON r.user_id = u.id JOIN Stores s ON r.store_id = s.id WHERE s.owner_id = ?`;

    db.get(avgRatingSql, [ownerId], (err1, avgData) => {
        if (err1) return callback(err1);
        db.all(ratersSql, [ownerId], (err2, ratersData) => {
            if (err2) return callback(err2);
            callback(null, {
                averageRating: avgData.averageRating,
                raters: ratersData
            });
        });
    });
};

Store.getTotalCount = (callback) => db.get('SELECT COUNT(*) as count FROM Stores', [], callback);

module.exports = Store;
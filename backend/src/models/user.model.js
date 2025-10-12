
const db = require('../config/db');

const User = {};

User.create = (user, callback) => {
  const { name, email, password, address, role } = user;
  db.run('INSERT INTO Users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)', 
    [name, email, password, address, role], function (err) {
    callback(err, { id: this.lastID });
  });
};

User.findByEmail = (email, callback) => {
  db.get('SELECT * FROM Users WHERE email = ?', [email], callback);
};

User.updatePassword = (id, hashedPassword, callback) => {
  db.run('UPDATE Users SET password = ? WHERE id = ?', [hashedPassword, id], function (err) {
    callback(err, { changes: this.changes });
  });
};

User.findAll = (filters, callback) => {
    let sql = `SELECT id, name, email, address, role FROM Users WHERE 1=1`;
    const params = [];

    if (filters.name) { sql += ' AND name LIKE ?'; params.push(`%${filters.name}%`); }
    if (filters.email) { sql += ' AND email LIKE ?'; params.push(`%${filters.email}%`); }
    if (filters.address) { sql += ' AND address LIKE ?'; params.push(`%${filters.address}%`); }
    if (filters.role) { sql += ' AND role = ?'; params.push(filters.role); }
    if (filters.sort) {
        const [field, order] = filters.sort.split(':');
        if (['name', 'email', 'role'].includes(field) && ['asc', 'desc'].includes(order.toLowerCase())) {
            sql += ` ORDER BY ${field} ${order.toUpperCase()}`;
        }
    }
    db.all(sql, params, callback);
};

User.findDetailsById = (id, callback) => {
    db.get('SELECT id, name, email, address, role FROM Users WHERE id = ?', [id], (err, user) => {
        if (err || !user || user.role !== 'owner') return callback(err, user);
        
        db.get(`SELECT AVG(r.rating) as averageRating FROM Ratings r JOIN Stores s ON r.store_id = s.id WHERE s.owner_id = ?`, [user.id], (err, ratingRow) => {
            if (err) return callback(err);
            user.storeRating = ratingRow ? ratingRow.averageRating : null;
            callback(null, user);
        });
    });
};

User.getTotalCount = (callback) => db.get('SELECT COUNT(*) as count FROM Users', [], callback);

module.exports = User;
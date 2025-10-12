
const db = require('../config/db');
const bcrypt = require('bcryptjs');

const createTables = () => {
  const usersTable = `
    CREATE TABLE IF NOT EXISTS Users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL CHECK(length(name) >= 20 AND length(name) <= 60),
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      address TEXT CHECK(length(address) <= 400),
      role TEXT NOT NULL CHECK(role IN ('admin', 'user', 'owner'))
    );
  `;

  const storesTable = `
    CREATE TABLE IF NOT EXISTS Stores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL CHECK(length(name) >= 20 AND length(name) <= 60),
      email TEXT UNIQUE NOT NULL,
      address TEXT CHECK(length(address) <= 400),
      owner_id INTEGER UNIQUE,
      FOREIGN KEY (owner_id) REFERENCES Users (id) ON DELETE CASCADE
    );
  `;

  const ratingsTable = `
    CREATE TABLE IF NOT EXISTS Ratings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      store_id INTEGER NOT NULL,
      rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE,
      FOREIGN KEY (store_id) REFERENCES Stores (id) ON DELETE CASCADE,
      UNIQUE (user_id, store_id)
    );
  `;
  
  const userEmailIndex = `CREATE INDEX IF NOT EXISTS idx_user_email ON Users(email);`;
  const storeNameIndex = `CREATE INDEX IF NOT EXISTS idx_store_name ON Stores(name);`;
  const ratingStoreIndex = `CREATE INDEX IF NOT EXISTS idx_rating_store_id ON Ratings(store_id);`;

  db.serialize(() => {
    db.run(usersTable, (err) => err && console.error("Error creating Users table", err.message));
    db.run(storesTable, (err) => err && console.error("Error creating Stores table", err.message));
    db.run(ratingsTable, (err) => err && console.error("Error creating Ratings table", err.message));
    db.run(userEmailIndex);
    db.run(storeNameIndex);
    db.run(ratingStoreIndex);
    console.log("Tables and indexes are ready.");
  });
};

const seedAdmin = async () => {
    const adminEmail = 'admin@example.com';
    db.get('SELECT * FROM Users WHERE email = ?', [adminEmail], async (err, row) => {
        if (err) return console.error('Error checking for admin:', err.message);
        if (!row) {
            console.log('Admin user not found, creating one...');
            const hashedPassword = await bcrypt.hash('Admin@1234', 10);
            db.run(
                'INSERT INTO Users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)',
                ['Default Administrator User', adminEmail, hashedPassword, '123 Admin Street', 'admin'],
                (err) => err ? console.error('Error seeding admin user:', err.message) : console.log('Default admin user created successfully.')
            );
        }
    });
};

const initDB = () => {
  createTables();
  seedAdmin();
};

module.exports = initDB;
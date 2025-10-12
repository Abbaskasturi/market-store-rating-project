
const app = require('./app');
const initDB = require('./database/initDB');

const PORT = process.env.PORT || 5000;


initDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const allRoutes = require('./routes');
const errorHandler = require('./middleware/error.middleware');

const app = express();


app.use(cors());
app.use(express.json());


app.use(allRoutes);


app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is healthy!' });
});


app.use(errorHandler);

module.exports = app;
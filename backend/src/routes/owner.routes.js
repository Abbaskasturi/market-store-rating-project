
const express = require('express');
const controller = require('../controllers/owner.controller');

const router = express.Router();

router.get('/dashboard', controller.getDashboard);

module.exports = router;
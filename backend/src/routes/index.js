
const express = require('express');
const protect = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');

const router = express.Router();

router.use('/api/auth', require('./auth.routes'));
router.use('/api/admin', protect, authorize('admin'), require('./admin.routes'));
router.use('/api/user', protect, authorize('user'), require('./user.routes'));
router.use('/api/owner', protect, authorize('owner'), require('./owner.routes'));

module.exports = router;
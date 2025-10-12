
const express = require('express');
const controller = require('../controllers/admin.controller');
const { addUserValidation, addStoreValidation } = require('../utils/validators');
const validate = require('../middleware/validate.middleware');

const router = express.Router();

router.post('/users', addUserValidation, validate, controller.addUser);
router.get('/users', controller.listUsers);
router.get('/users/:id', controller.getUserDetails);
router.post('/stores', addStoreValidation, validate, controller.addStore);
router.get('/stores', controller.listStores);
router.get('/dashboard', controller.getDashboardStats);

module.exports = router;

const express = require('express');
const controller = require('../controllers/user.controller');
const { ratingValidation, ratingUpdateValidation } = require('../utils/validators');
const validate = require('../middleware/validate.middleware');

const router = express.Router();

router.get('/stores', controller.listStores);
router.post('/ratings', ratingValidation, validate, controller.submitRating);
router.patch('/ratings/:storeId', ratingUpdateValidation, validate, controller.modifyRating);

module.exports = router;
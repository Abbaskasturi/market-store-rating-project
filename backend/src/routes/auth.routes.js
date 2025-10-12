
const express = require('express');
const controller = require('../controllers/auth.controller');
const { signupValidation, loginValidation, updatePasswordValidation } = require('../utils/validators');
const validate = require('../middleware/validate.middleware');
const protect = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/signup', signupValidation, validate, controller.signup);
router.post('/login', loginValidation, validate, controller.login);
router.patch('/update-password', protect, updatePasswordValidation, validate, controller.updatePassword);

module.exports = router;
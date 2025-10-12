
const { body, param } = require('express-validator');

const passwordValidation = body('password')
  .isLength({ min: 8, max: 16 }).withMessage('Password must be 8-16 characters.')
  .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/).withMessage('Password needs one uppercase letter and one special character.');

exports.signupValidation = [
  body('name').isLength({ min: 20, max: 60 }).withMessage('Name must be 20-60 characters.'),
  body('email').isEmail().withMessage('Please provide a valid email.'),
  body('address').isLength({ max: 400 }).withMessage('Address max 400 characters.'),
  passwordValidation,
];

exports.loginValidation = [
  body('email').isEmail().withMessage('Valid email is required.'),
  body('password').notEmpty().withMessage('Password is required.'),
];

exports.addUserValidation = [ ...this.signupValidation, body('role').isIn(['admin', 'user', 'owner']).withMessage('Invalid role.') ];

exports.updatePasswordValidation = [ passwordValidation ];

exports.addStoreValidation = [
    body('name').isLength({ min: 20, max: 60 }).withMessage('Store name must be 20-60 characters.'),
    body('email').isEmail().withMessage('A valid store email is required.'),
    body('address').isLength({ max: 400 }).withMessage('Address max 400 characters.'),
    body('owner_id').isInt().withMessage('A valid owner_id is required.')
];

exports.ratingValidation = [
    body('store_id').isInt().withMessage('store_id must be an integer.'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5.')
];

exports.ratingUpdateValidation = [
    param('storeId').isInt().withMessage('URL parameter storeId must be an integer.'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5.')
];
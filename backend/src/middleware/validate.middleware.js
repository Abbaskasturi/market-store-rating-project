
const { validationResult } = require('express-validator');
const { errorResponse } = require('../utils/response');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg).join(' ');
    return errorResponse(res, errorMessages, 422); 
  }
  next();
};

module.exports = validate;
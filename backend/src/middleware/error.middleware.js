
const { errorResponse } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  errorResponse(res, err.message || 'An unexpected server error occurred', 500);
};

module.exports = errorHandler;
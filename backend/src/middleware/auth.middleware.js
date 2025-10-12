
const { verifyToken } = require('../utils/jwt.utils');
const { errorResponse } = require('../utils/response');

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return errorResponse(res, 'Not authorized, no token', 401);
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return errorResponse(res, 'Not authorized, token failed', 401);
  }

  req.user = decoded;
  next();
};

module.exports = protect;
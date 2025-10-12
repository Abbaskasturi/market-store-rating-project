
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { generateToken } = require('../utils/jwt.utils');
const { successResponse, errorResponse } = require('../utils/response');

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, address } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    User.create({ name, email, password: hashedPassword, address, role: 'user' }, (err, user) => {
      if (err) return errorResponse(res, 'Email already exists.', 409);
      successResponse(res, 'User registered successfully!', { userId: user.id }, 201);
    });
  } catch (error) { next(error); }
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findByEmail(email, async (err, user) => {
    if (err || !user || !(await bcrypt.compare(password, user.password))) {
      return errorResponse(res, 'Invalid credentials', 401);
    }
    const token = generateToken(user);
    const { password: _, ...userWithoutPassword } = user;
    successResponse(res, 'Logged in successfully', { token, user: userWithoutPassword });
  });
};

exports.updatePassword = async (req, res, next) => {
    try {
        const { id } = req.user;
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        User.updatePassword(id, hashedPassword, (err, result) => {
            if (err || result.changes === 0) return errorResponse(res, 'Password not updated', 400);
            successResponse(res, 'Password updated successfully.');
        });
    } catch (error) { next(error); }
};
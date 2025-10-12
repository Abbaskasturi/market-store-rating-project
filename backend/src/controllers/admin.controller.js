
const bcrypt = require('bcryptjs');
const { User, Store, Rating } = require('../models');
const { successResponse, errorResponse } = require('../utils/response');

exports.addUser = async (req, res, next) => {
    try {
        const { name, email, password, address, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        User.create({ name, email, password: hashedPassword, address, role }, (err, user) => {
            if (err) return errorResponse(res, 'Email already exists.', 409);
            successResponse(res, 'User added successfully', { userId: user.id }, 201);
        });
    } catch (error) { next(error); }
};

exports.listUsers = (req, res, next) => {
    User.findAll(req.query, (err, users) => {
        if (err) return next(err);
        successResponse(res, 'Users fetched successfully', users);
    });
};

exports.getUserDetails = (req, res, next) => {
    User.findDetailsById(req.params.id, (err, user) => {
        if (err) return next(err);
        if (!user) return errorResponse(res, 'User not found', 404);
        successResponse(res, 'User details fetched', user);
    });
};

exports.addStore = (req, res, next) => {
    Store.create(req.body, (err, store) => {
        if (err) return errorResponse(res, 'Failed to create store. Check for unique constraints.', 409);
        successResponse(res, 'Store added successfully', { storeId: store.id }, 201);
    });
};

exports.listStores = (req, res, next) => {
    Store.findAllForAdmin(req.query, (err, stores) => {
        if (err) return next(err);
        successResponse(res, 'Stores fetched successfully', stores);
    });
};

exports.getDashboardStats = async (req, res, next) => {
    try {
        const userCount = await new Promise((res, rej) => User.getTotalCount((e, d) => e ? rej(e) : res(d.count)));
        const storeCount = await new Promise((res, rej) => Store.getTotalCount((e, d) => e ? rej(e) : res(d.count)));
        const ratingCount = await new Promise((res, rej) => Rating.getTotalCount((e, d) => e ? rej(e) : res(d.count)));
        successResponse(res, 'Dashboard data fetched', { totalUsers: userCount, totalStores: storeCount, totalRatings: ratingCount });
    } catch (error) { next(error); }
};
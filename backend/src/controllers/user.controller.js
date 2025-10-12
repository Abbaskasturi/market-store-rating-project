
const { Store, Rating } = require('../models');
const { successResponse, errorResponse } = require('../utils/response');

exports.listStores = (req, res, next) => {
    Store.findAllForUser(req.query, req.user.id, (err, stores) => {
        if (err) return next(err);
        successResponse(res, 'Stores fetched successfully', stores);
    });
};

exports.submitRating = (req, res, next) => {
    const data = { user_id: req.user.id, store_id: req.body.store_id, rating: req.body.rating };
    Rating.createOrUpdate(data, (err, result) => {
        if (err) return next(err);
        successResponse(res, 'Rating processed successfully', result);
    });
};

exports.modifyRating = (req, res, next) => {
    const data = { user_id: req.user.id, store_id: req.params.storeId, rating: req.body.rating };
    Rating.update(data, (err, result) => {
        if (err || result.changes === 0) return errorResponse(res, 'No rating found to update', 404);
        successResponse(res, 'Rating modified successfully', result);
    });
};
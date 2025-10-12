
const { Store } = require('../models');
const { successResponse } = require('../utils/response');

exports.getDashboard = (req, res, next) => {
    Store.findDashboardByOwnerId(req.user.id, (err, data) => {
        if (err) return next(err);
        successResponse(res, 'Owner dashboard fetched', data);
    });
};
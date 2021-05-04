reviewsRouter = require('express').Router();
const getReviewById = require('../controllers/getReviewById');
const patchReviewById = require('../controllers/patchReviewById');

reviewsRouter.route('/:review_id').get(getReviewById).patch(patchReviewById);

module.exports = reviewsRouter;

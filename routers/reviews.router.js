reviewsRouter = require('express').Router();
const getReviewById = require('../controllers/getReviewById');

reviewsRouter.route('/:review_id').get(getReviewById);

module.exports = reviewsRouter;

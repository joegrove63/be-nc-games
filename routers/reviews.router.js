reviewsRouter = require('express').Router();
const getReviewById = require('../controllers/getReviewById');
const patchReviewById = require('../controllers/patchReviewById');
const getReviews = require('../controllers/getReviews');
const getCommentsByReviewId = require('../controllers/getCommentsByReviewId');
const addComment = require('../controllers/addComment');

reviewsRouter.route('/').get(getReviews);
reviewsRouter.route('/:review_id').get(getReviewById).patch(patchReviewById);
reviewsRouter
  .route('/:review_id/comments')
  .get(getCommentsByReviewId)
  .post(addComment);

module.exports = reviewsRouter;

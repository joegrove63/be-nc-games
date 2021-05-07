const apiRouter = require('express').Router();
const categoriesRouter = require('./categories.router');
const reviewsRouter = require('./reviews.router');
const getEndpoints = require('../controllers/getEndpoints');

apiRouter.use('/categories', categoriesRouter);

apiRouter.use('/reviews', reviewsRouter);

apiRouter.route('/').get(getEndpoints);

module.exports = apiRouter;

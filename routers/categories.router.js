const categoriesRouter = require('express').Router();
const getCategories = require('../controllers/api.controller');

categoriesRouter.route('/').get(getCategories);

module.exports = categoriesRouter;

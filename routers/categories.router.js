const categoriesRouter = require('express').Router();
const getCategories = require('../controllers/getCategories');

categoriesRouter.route('/').get(getCategories);

module.exports = categoriesRouter;

const selectCategories = require('../models/api.model');

const getCategories = (request, response) => {
  selectCategories().then((categories) => {
    console.log('in the controller', categories);
    return response.status(200).send({ categories });
  });
};

module.exports = getCategories;

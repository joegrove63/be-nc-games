const selectCategories = require('../models/api.model');

const getCategories = (request, response) => {
  selectCategories()
    .then((categories) => {
      return response.status(200).send({ categories });
    })
    .catch(next);
};

module.exports = getCategories;

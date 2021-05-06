const arrangeReviews = require('../models/arrangeReviews');

const getReviews = (request, response) => {
  const { sort_by, order, category } = request.query;
  arrangeReviews(sort_by, order, category).then((reviews) => {
    return response.status(200).send({ reviews });
  });
  //.catch(next);
};

module.exports = getReviews;

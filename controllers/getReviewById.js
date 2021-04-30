const selectReviewById = require('../models/selectReviewById');

const getReviewById = (request, response, next) => {
  const { review_id } = request.params;
  selectReviewById(review_id)
    .then((review) => {
      response.status(200).send({ review });
    })
    .catch(next);
};

module.exports = getReviewById;

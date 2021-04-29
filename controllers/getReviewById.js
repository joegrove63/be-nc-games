const selectReviewById = require('../models/selectReviewById');

const getReviewById = (request, response) => {
  const { review_id } = request.params;
  selectReviewById(review_id).then((review) => {
    console.log(review);
    response.status(200).send({ review });
  });
};

module.exports = getReviewById;

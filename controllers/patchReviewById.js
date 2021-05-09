const updateReviewById = require('../models/updateReviewById');

const patchReviewById = (request, response, next) => {
  const inc_votes = request.body;
  const { review_id } = request.params;
  updateReviewById(inc_votes, review_id)
    .then((review) => {
      response.status(200).send({ review });
    })
    .catch(next);
};

module.exports = patchReviewById;

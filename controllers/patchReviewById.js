const updateReviewById = require('../models/updateReviewById');

const patchReviewById = (request, response, next) => {
  const { inc_votes } = request.body;
  const { review_id } = request.params;
  // console.log('inc_votes is', inc_votes, review_id);
  updateReviewById(inc_votes, review_id).then((review) => {
    console.log('review is', review);
    response.status(200).send({ review });
  });
  //.catch(next);
};

module.exports = patchReviewById;

const selectComments = require('../models/selectComments');

const getCommentsByReviewId = (request, response, next) => {
  const { review_id } = request.params;
  selectComments(review_id)
    .then((comments) => {
      response.status(200).send({ comments });
    })
    .catch(next);
};

module.exports = getCommentsByReviewId;

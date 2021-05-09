const insertComment = require('../models/insertComment');

const addComment = (request, response, next) => {
  const { review_id } = request.params;
  const { username } = request.body;
  const { body } = request.body;
  insertComment(review_id, username, body)
    .then((postedComment) => {
      response.status(200).send({ postedComment });
    })
    .catch(next);
};

module.exports = addComment;

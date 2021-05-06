const db = require('../db/connection');

const selectComments = (review_id) => {
  return db
    .query(
      `
    SELECT comment_id, votes, created_at, author, body FROM comments
    WHERE review_id = $1`,
      [review_id]
    )
    .then((comments) => comments.rows);
};

module.exports = selectComments;

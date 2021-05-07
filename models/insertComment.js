const db = require('../db/connection');

const insertComment = (review_id, username, body) => {
  return db
    .query(
      `
    INSERT INTO COMMENTS
    (review_id, author, body)
    VALUES
    ($1, $2, $3)
    RETURNING *`,
      [review_id, username, body]
    )
    .then((comment) => comment.rows);
};

module.exports = insertComment;

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
    .then((comment) => {
      if (!username || !body) {
        return Promise.reject({
          status: 400,
          msg: 'Bad Request - Missing required fields'
        });
      }
      return comment.rows;
    });
};

module.exports = insertComment;

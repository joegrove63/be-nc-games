const db = require('../db/connection');

const selectReviewById = (review_id) => {
  return db
    .query(
      `SELECT reviews.*, COUNT(comments.review_id) AS comment_count FROM reviews
    LEFT JOIN comments ON comments.review_id = reviews.review_id 
    WHERE reviews.review_id = $1
    GROUP BY reviews.review_id`,
      [review_id]
    )
    .then(({ rows }) => {
      const review = rows[0];
      if (!review) {
        return Promise.reject({
          status: 404,
          msg: `No review found for review_id: ${review_id}`
        });
      }
      return review;
    });
};

module.exports = selectReviewById;

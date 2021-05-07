const db = require('../db/connection');

const selectReviewById = (review_id) => {
  return db
    .query('SELECT * FROM reviews WHERE review_id = $1', [review_id])
    .then(({ rows }) => {
      const review = rows;
      if (review.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `No review found for review_id: ${review_id}`
        });
      }
      return review;
    });
};

module.exports = selectReviewById;

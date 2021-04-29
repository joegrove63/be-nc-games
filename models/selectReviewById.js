const db = require('../db/connection');

const selectReviewById = (review_id) => {
  console.log('in model!');
  return db
    .query('SELECT * FROM reviews WHERE review_id = $1', [review_id])
    .then((result) => result.rows[0]);
};

module.exports = selectReviewById;

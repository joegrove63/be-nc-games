const db = require('../db/connection');

const updateReviewById = (inc_votes, review_id) => {
  console.log('in the model!');
  return db
    .query(
      `UPDATE reviews
            SET
            votes = votes + $1
          WHERE review_id = $2
          RETURNING *`,
      [inc_votes, review_id]
    )
    .then((review) => review.rows[0]);
};

module.exports = updateReviewById;

// UPDATE reviews
//       SET
//       votes = votes + $1
//     WHERE review_id = $2
//     RETURNING *

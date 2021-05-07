const db = require('../db/connection');

const updateReviewById = (inc_votes, review_id) => {
  return db
    .query(
      `UPDATE reviews
            SET
            votes = votes + $1
          WHERE review_id = $2
          RETURNING *`,
      [inc_votes, review_id]
    )
    .then((review) => review.rows);
};

module.exports = updateReviewById;

// UPDATE reviews
//       SET
//       votes = votes + $1
//     WHERE review_id = $2
//     RETURNING *

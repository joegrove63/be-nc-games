const db = require('../db/connection');

const updateReviewById = (inc_votes, review_id) => {
  const inc_votes_by = inc_votes.inc_votes;
  return db
    .query(
      `UPDATE reviews
            SET
            votes = votes + $1
          WHERE review_id = $2
          RETURNING *`,
      [inc_votes_by, review_id]
    )
    .then(({ rows }) => {
      const review = rows[0];
      if (!review) {
        return Promise.reject({
          status: 404,
          msg: `No review found for review_id: ${review_id}`,
        });
      } else if (!inc_votes_by) {
        return Promise.reject({
          status: 400,
          msg: 'Bad Request :( Missing required fields',
        });
      } else if (!typeof inc_votes_by === Number) {
        return Promise.reject({
          status: 400,
          msg: 'Bad Request :( Invalid inc_votes',
        });
      } else if (Object.keys(inc_votes).length > 1) {
        return Promise.reject({
          status: 400,
          msg: 'Bad Request :( More than one property is not allowed',
        });
      }
      return review;
    });
};

module.exports = updateReviewById;

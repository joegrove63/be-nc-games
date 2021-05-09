const db = require('../db/connection');

async function checkReviewIdExists(review_id) {
  const result = await db.query(
    `SELECT * FROM reviews
    WHERE review_id = $1`,
    [review_id]
  );
  if (result.rowCount === 0) {
    return Promise.reject({
      status: 404,
      msg: 'Review id does not exist'
    });
  }
}

const selectComments = async (review_id) => {
  const { rows } = await db.query(
    `
    SELECT comment_id, votes, created_at, author, body FROM comments
    WHERE review_id = $1`,
    [review_id]
  );
  if (rows.length === 0) {
    await checkReviewIdExists(review_id);
  }
  return rows;
};

module.exports = selectComments;

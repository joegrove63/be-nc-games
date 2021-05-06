const db = require('../db/connection');

const arrangeReviews = (sort_by = 'created_at', order = 'DESC', category) => {
  const allowedSortByCollumns = [
    'created_at',
    'owner',
    'title',
    'review_id',
    'category',
    'review_img_url',
    'votes',
    'comment_count'
  ];

  const allowedOrder = ['ASC', 'DESC', 'asc', 'desc'];

  if (!allowedSortByCollumns.includes(sort_by)) {
    return Promise.reject({
      status: 400,
      msg: 'Invalid sort_by query'
    });
  }

  if (!allowedOrder.includes(order)) {
    return Promise.reject({
      status: 400,
      msg: 'Invalid order query'
    });
  }

  let queryStr = `
    SELECT owner, title, reviews.review_id, category, review_img_url, reviews.created_at, reviews.votes, COUNT(comments.review_id) AS comment_count FROM reviews
    LEFT JOIN comments 
    on comments.review_id = reviews.review_id
    `;

  const queryValues = [];

  if (category) {
    queryStr += `WHERE category = $1`;
    queryValues.push(category);
  }

  queryStr += `
    GROUP BY reviews.review_id
    ORDER BY ${sort_by} ${order.toUpperCase()}`;

  return db.query(queryStr, queryValues).then((reviews) => {
    return reviews.rows;
  });
};

module.exports = arrangeReviews;

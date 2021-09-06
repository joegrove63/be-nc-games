const db = require('../connection');
const { createTables, dropTables } = require('../manageTables');
const format = require('pg-format');
const {
  amendDate,
  createReviewLookupObj,
  formatComments,
} = require('../utils/data-manipulation');

const seed = ({ categoryData, commentData, reviewData, userData }) => {
  return dropTables()
    .then(() => {
      return createTables();
    })
    .then(() => {
      const insertCategoryQueryString = format(
        `
      INSERT INTO categories
      (slug, description)
      VALUES %L;`,
        categoryData.map(({ slug, description }) => [slug, description])
      );
      return db.query(insertCategoryQueryString);
    })
    .then(() => {
      const insertUsersQueryString = format(
        `INSERT INTO users
        (username, avatar_url, name)
        VALUES %L;`,
        userData.map(({ username, name, avatar_url }) => [
          username,
          avatar_url,
          name,
        ])
      );
      return db.query(insertUsersQueryString);
    })
    .then(() => {
      const amendedReviewData = amendDate(reviewData);
      const insertReviewsQueryString = format(
        `INSERT INTO reviews
        (title, review_body, designer, review_img_url, votes, category, owner, created_at)
        VALUES %L RETURNING *`,
        amendedReviewData.map(
          ({
            title,
            review_body,
            designer,
            review_img_url = 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
            votes,
            category,
            owner,
            created_at,
          }) => [
            title,
            review_body,
            designer,
            review_img_url,
            votes,
            category,
            owner,
            created_at,
          ]
        )
      );
      return db.query(insertReviewsQueryString);
    })
    .then((returnedReviewData) => {
      const amendedCommentData = amendDate(commentData);
      const reviewLookup = createReviewLookupObj(returnedReviewData.rows);
      const commentsWithReviewIds = formatComments(
        amendedCommentData,
        reviewLookup
      );

      const insertCommentsQueryString = format(
        `INSERT INTO comments
        (author, review_id, votes, created_at, body)
        VALUES %L
        `,
        commentsWithReviewIds.map(
          ({ created_by, review_id, votes, created_at, body }) => [
            created_by,
            review_id,
            votes,
            created_at,
            body,
          ]
        )
      );
      return db.query(insertCommentsQueryString);
    });
};

module.exports = seed;

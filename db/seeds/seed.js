const db = require('../connection');
const { createTables, dropTables } = require('../manageTables');
const format = require('pg-format');
const { amendDate } = require('../utils/data-manipulation');

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
          name
        ])
      );
      return db.query(insertUsersQueryString);
    })
    .then(() => {
      amendDate(reviewData);
      const insertReviewsQueryString = format(
        `INSERT INTO reviews
        (title, review_body, designer, review_img_url, votes, category, owner, created_at)
        VALUES %L RETURNING *`,
        reviewData.map(
          ({
            title,
            review_body,
            designer,
            review_img_url,
            votes,
            category,
            owner,
            created_at
          }) => [
            title,
            review_body,
            designer,
            review_img_url,
            votes,
            category,
            owner,
            created_at
          ]
        )
      );
      return db.query(insertReviewsQueryString);
    })
    .then((returnedReviewData) => {
      console.log(returnedReviewData.rows);
      amendDate(commentData);
      const insertCommentsQueryString = format(
        `INSERT INTO comments
        (author, review_id, votes, created_at, body)
        VALUES %L
        `,
        commentData.map(({ author, review_id, votes, created_at, body }) => [
          author,
          review_id,
          votes,
          created_at,
          body
        ])
      );
      return db.query(insertCommentsQueryString);
    });
};

module.exports = seed;

// add seeding functionality here
// this function should take as argument(s) all the data it needs to seed
// it should insert this data into the relevant tables in your database

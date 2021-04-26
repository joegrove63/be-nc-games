const db = require('../connection');
const { createTables, dropTables } = require('../manageTables');
const format = require('pg-format');

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
    });
};

module.exports = seed;

// add seeding functionality here
// this function should take as argument(s) all the data it needs to seed
// it should insert this data into the relevant tables in your database

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
    });
};

module.exports = seed;

// add seeding functionality here
// this function should take as argument(s) all the data it needs to seed
// it should insert this data into the relevant tables in your database

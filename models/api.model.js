const db = require('../db/connection');

const selectCategories = () => {
  return db.query(`SELECT * FROM categories;`).then((categories) => {
    return categories.rows;
  });
};

module.exports = selectCategories;

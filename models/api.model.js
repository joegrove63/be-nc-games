const db = require('../db/connection');

const selectCategories = () => {
  return db.query(`SELECT * FROM categories;`).then((categories) => {
    console.log('in the model', categories.rows);
    return categories.rows;
  });
};

module.exports = selectCategories;

const db = require('../connection');
const { createTables, dropTables } = require('../manageTables');

const seed = () => {
  return dropTables().then(() => {
    return createTables();
  });
  // add seeding functionality here
  // this function should take as argument(s) all the data it needs to seed
  // it should insert this data into the relevant tables in your database
};

module.exports = seed;

const seed = require('./seed');
const db = require('../connection');
const data = require('../data/development-data/index');

const runSeed = () => {
  return seed(data).then(() => db.end());
};

runSeed();

const seed = require('./seed');
const db = require('../connection');
const data = require('../data/development-data/index');
/*
Here you will need to require in:

- the seed function, 
- the dev data,
*/
const runSeed = () => {
  return seed(data).then(() => db.end());
  // run the seed with the data
};

runSeed();

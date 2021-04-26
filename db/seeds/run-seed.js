const seed = require('./seed');
const db = require('../connection');
/*
Here you will need to require in:

- the seed function, 
- the dev data,
*/
const runSeed = () => {
  return seed().then(() => db.end());
  // run the seed with the data
};

runSeed();

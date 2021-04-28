// // extract any functions you are using to manipulate your data, into this file

// const createRef = (games) => {
//   const refObj = {};
//   if (games.length === 0) return refObj;
//   refObj[games[0].title] = games[0].category;
//   return refObj;
// };

// module.exports = createRef;

// //key category
// //value slug

const amendDate = (data) => {
  data.forEach((object) => (object.created_at = new Date(object.created_at)));
};

const createReviewLookupObj = () => {
  return {};
};

module.exports = { amendDate, createReviewLookupObj };

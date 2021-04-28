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

const createReviewLookupObj = (reviews) => {
  const reviewLookUp = {};
  if (reviews.length === 0) return reviewLookUp;
  reviews.forEach((review) => (reviewLookUp[review.title] = review.review_id));
  return reviewLookUp;
};

const formatComments = (commentData, lookupObj) => {
  const formattedComment = {};
  if (commentData.length === 0) return [];
  formattedComment.review_id = lookupObj['JengARRGGGH!'];
  console.log(formattedComment);
  //spread rest of comment key value pairs into formattedComment (not belongs_to)
};

module.exports = { amendDate, createReviewLookupObj, formatComments };

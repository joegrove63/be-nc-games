const amendDate = (data) => {
  return data.map((object) => {
    const copyOfObject = { ...object };
    copyOfObject.created_at = new Date(object.created_at);
    return copyOfObject;
  });
};

const createReviewLookupObj = (reviews) => {
  const reviewLookUp = {};
  if (reviews.length === 0) return reviewLookUp;
  reviews.forEach((review) => (reviewLookUp[review.title] = review.review_id));
  return reviewLookUp;
};

const formatComments = (commentData, lookupObj) => {
  if (commentData.length === 0) return [];
  const formattedComments = commentData.map((comment) => {
    const formattedComment = {};
    formattedComment.review_id = lookupObj[comment.belongs_to];
    const { body, created_by, votes, created_at } = comment;
    formattedComment.body = body;
    formattedComment.created_by = created_by;
    formattedComment.votes = votes;
    formattedComment.created_at = created_at;
    return formattedComment;
  });
  return formattedComments;
};

module.exports = { amendDate, createReviewLookupObj, formatComments };

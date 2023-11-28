const reviewDAL = require("../../DALs/reviewDAL");

const createNewReview = (review) => {
  return reviewDAL.createNewReview(review);
};
const updateReview = (reviewId, updatedReview) => {
  const editedReview = {
    $set: {
      reviewBody: updatedReview.reviewBody,
      title: updatedReview.title,
      edited: new Date(),
    },
  };
  return reviewDAL.updateReview(reviewId, editedReview);
};
module.exports = { createNewReview, updateReview };

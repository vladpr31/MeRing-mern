const reviewDAL = require("../../DALs/reviewDAL");

const createNewReview = (review) => {
  return reviewDAL.createNewReview(review);
};

module.exports = { createNewReview };

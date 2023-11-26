const reviewDAL = require("../../DALs/");

const createNewReview = (review) => {
  return reviewDAL.createNewReview(review);
};

module.exports = { createNewReview };

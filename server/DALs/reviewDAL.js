const Review = require("../models/reviewModel");

const createNewReview = (review) => {
  const newReview = new Review(review);
  newReview.save();
  return newReview;
};

module.exports = { createNewReview };

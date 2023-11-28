const Review = require("../models/reviewModel");

const createNewReview = (review) => {
  const newReview = new Review(review);
  newReview.save();
  return newReview;
};
const updateReview = (reviewId, updatedReview) => {
  return Review.findByIdAndUpdate(reviewId, updatedReview, { new: true });
};
module.exports = { createNewReview, updateReview };

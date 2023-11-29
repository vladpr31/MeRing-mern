const Review = require("../models/reviewModel");

const createNewReview = (review) => {
  const newReview = new Review(review);
  newReview.save();
  return newReview;
};
const updateReview = (reviewId, updatedReview) => {
  return Review.findByIdAndUpdate(reviewId, updatedReview, { new: true });
};
const deleteReview = (reviewId) => {
  return Review.findOneAndDelete({ _id: reviewId });
};
module.exports = { createNewReview, updateReview, deleteReview };

const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  reviewerName: String,
  reviewBody: String,
  rating: Number,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;

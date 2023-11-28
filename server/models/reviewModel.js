const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  reviewerName: String,
  reviewerProfileImage: {},
  title: String,
  reviewBody: String,
  rating: Number,
  timestamp: {
    type: Date,
    default: Date.now,
  },
  edited: { type: Date, default: Date.now },
});
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;

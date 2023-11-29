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

reviewSchema.post("findOneAndDelete", async (doc) => {
  await Patient.findOneAndUpdate(
    { account: doc.reviewer },
    { $pull: { reviews: doc._id } }
  );
  const doctorWithReview = await Doctor.findOne({
    reviews: doc._id,
  });
  await Doctor.findOneAndUpdate(
    { _id: doctorWithReview._id },
    { $pull: { reviews: doc._id } }
  );
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
const Patient = require("./patientModel");
const Doctor = require("./doctorModel");

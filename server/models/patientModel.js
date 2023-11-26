const mongoose = require("mongoose");

const patientModel = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  apotropos: { type: mongoose.Schema.Types.ObjectId, ref: "Apotropos" } || null,
  location: String,
  phoneNumber: Number,
  illnesses: [],
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointments" }],
  account: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Messages" }],
  profileImage: Object,
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

const Patient = mongoose.model("Patients", patientModel);
module.exports = Patient;

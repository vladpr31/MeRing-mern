const mongoose = require("mongoose");

//removed for now.

const apotroposModel = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  apotroposOf:
    { type: mongoose.Schema.Types.ObjectId, ref: "Patients" } || null,
  phoneNumber: Number,
  livingPlace: String,
});

const Apotropos = mongoose.model("Apotropos", apotroposModel);
module.exports = Apotropos;

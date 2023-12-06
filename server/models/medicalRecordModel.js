const mongoose = require("mongoose");

const medicalRecordModel = new mongoose.Schema({
  Patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patients" },
  apotropos: { type: mongoose.Schema.Types.ObjectId, ref: "Apotropos" } || null,
  illnesses: [],
  weight: Number,
  height: Number,
  sensitivity: [],
  workout: { type: Boolean, default: false },
  allergies: [],
  medications: [],
  socioeconomic: { type: String, default: "Middle" },
  visits: [],
  previousRecords: [],
});

medicalRecordModel.post("save", async (doc) => {
  await Patient.findByIdAndUpdate(
    { _id: this.patient.toString() },
    { medicalRecord: this._id }
  );
});

const Record = mongoose.model("Records", medicalRecordModel);
module.exports = Record;
const Patient = require("./patientModel");

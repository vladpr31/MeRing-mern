const mongoose = require("mongoose");

const medicalRecordModel = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patients" },
  apotropos: { type: mongoose.Schema.Types.ObjectId, ref: "Apotropos" } || null,
  illnesses: [],
  weight: Number,
  height: Number,
  workout: { type: Boolean, default: false },
  allergies: [],
  medications: [],
  socioeconomic: { type: String, default: "Middle" },
  visits: [],
  previousRecords: [{ type: mongoose.Schema.Types.ObjectId, ref: "Records" }],
  patientDescription: String,
});

//update the patient with new medical record after creating it.
medicalRecordModel.post("save", async (doc) => {
  await Patient.findByIdAndUpdate(
    { _id: doc.patient.toString() },
    { medicalRecord: doc._id }
  );
});

const Record = mongoose.model("Records", medicalRecordModel);
module.exports = Record;
const Patient = require("./patientModel");

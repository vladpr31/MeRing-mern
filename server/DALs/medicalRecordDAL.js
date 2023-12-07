const MedicalRecord = require("../models/medicalRecordModel");

const createNewMedicalRecord = (recordData) => {
  const newMedicalRecord = new MedicalRecord(recordData);
  newMedicalRecord.save();
  return newMedicalRecord;
};

module.exports = { createNewMedicalRecord };

const medicalRecordDAL = require("../../DALs/medicalRecordDAL");

const createNewMedicalRecord = (recordData) => {
  return medicalRecordDAL.createNewMedicalRecord(recordData);
};

module.exports = { createNewMedicalRecord };

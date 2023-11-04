const ClinicDB = require("../models/clinicModel");

const createNewClinic = (clinic) => {
  const newClinic = new ClinicDB(clinic);
  newClinic.save();
};

const getClinicById = (clinicID) => {
  return ClinicDB.findById(clinicID);
};
const editClinic = (clinicID, updatedClinic) => {
  const clinic = ClinicDB.findOneAndUpdate({ _id: clinicID }, updatedClinic);
  return clinic;
};
const getAllClinics = () => {
  return ClinicDB.find({});
};
const removeClinic = (clinicID) => {
  return ClinicDB.findOneAndRemove({ _id: clinicID });
};

module.exports = {
  getAllClinics,
  createNewClinic,
  editClinic,
  removeClinic,
  getClinicById,
};

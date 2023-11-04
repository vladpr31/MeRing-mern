const clinicDAL = require("../../DALs/clinicDAL");

const createNewClinic = (clinic) => {
  return clinicDAL.createNewClinic(clinic);
};
const getClinicById = (clinicID) => {
  return clinicDAL.getClinicById(clinicId);
};
const editClinic = (clinicID, updatedClinic) => {
  return clinicDAL.editClinic(clinicID, updatedClinic);
};
const getAllClinics = () => {
  return clinicDAL.getAllClinics();
};
const removeClinic = (clinicID) => {
  return clinicDAL.removeClinic(clinicID);
};

module.exports = {
  getAllClinics,
  createNewClinic,
  editClinic,
  removeClinic,
  getClinicById,
};

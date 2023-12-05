const patientDAL = require("../../DALs/patientDAL");

const createNewPatient = (patientInfo) => {
  const { patientInfo: newPatient, account } = patientInfo;
  newPatient.account = account;
  return patientDAL.createNewPatient(newPatient);
};

const getAllPatients = () => {
  return patientDAL.getAllPatients();
};

const updateApotroposOfPatient = (id, apotropos) => {
  return patientDAL.updateApotroposOfPatient(id, apotropos);
};

const getPatientByID = async (id) => {
  return patientDAL.getPatientByID(id);
};

const addNewAppointment = (patientID, appointment) => {
  return patientDAL.addNewAppointment(patientID, appointment);
};

const getPatientByAccountID = (accountID) => {
  return patientDAL.getPatientByAccountID(accountID);
};

const getPatientAppointmentsByDoctor = (doctorId) => {
  return patientDAL.getPatientAppointmentsByDoctor(doctorId);
};

const updatePatient = async (userID, updateField, updateData) => {
  const updatedPatient = await patientDAL.updatePatient(
    userID,
    updateField,
    updateData
  );
  return updatedPatient;
};

module.exports = {
  createNewPatient,
  updateApotroposOfPatient,
  getPatientByID,
  addNewAppointment,
  getPatientByAccountID,
  getPatientAppointmentsByDoctor,
  updatePatient,
  getAllPatients,
};

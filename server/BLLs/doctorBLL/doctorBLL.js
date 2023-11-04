const doctorDAL = require("../../DALs/doctorDAL");

const createNewDoctor = (doctorDetails) => {
  return doctorDAL.createNewDoctor(doctorDetails);
};

const createNewDoctorWithCredential = async (doctorDetails) => {
  const { account, doctorInfo } = doctorDetails;
  doctorInfo.account = account;
  const doctor = await doctorDAL.createNewDoctorWithCredential(doctorInfo);
  return doctor;
};

const updateDoctor = (doctorID, updatedDetails) => {
  return doctorDAL.updateDoctor(doctorID, updatedDetails);
};
const updateDoctorShifts = (doctorID, shift) => {
  return doctorDAL.updateDoctorShifts(doctorID, shift);
};

const getAllDoctors = () => {
  return doctorDAL.getAllDoctors();
};

const getDoctorsByCategory = (category) => {
  return doctorDAL.getDoctorsByCategory(category);
};
const addNewAppointment = (doctorID, appointment) => {
  return doctorDAL.addNewAppointment(doctorID, appointment);
};

const addDoctorReview = (doctorID, review) => {
  return doctorDAL.addDoctorReview(doctorID, review);
};

const getDoctorByID = (doctorID) => {
  return doctorDAL.getDoctorByID(doctorID);
};

const removeDoctor = (doctorID) => {
  return doctorDAL.removeDoctor(doctorID);
};

const getDoctorByAccountID = (authID) => {
  return doctorDAL.getDoctorByAccountID(authID);
};

module.exports = {
  createNewDoctor,
  getAllDoctors,
  getDoctorsByCategory,
  addNewAppointment,
  addDoctorReview,
  getDoctorByID,
  updateDoctor,
  removeDoctor,
  createNewDoctorWithCredential,
  getDoctorByAccountID,
  updateDoctorShifts,
};

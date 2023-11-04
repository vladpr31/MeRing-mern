const appointmentDAL = require("../../DALs/appointmentsDAL");

const createAppointment = (appointment) => {
  return appointmentDAL.createAppointment(appointment);
};
const getPatientAppointments = (patientID) => {
  return appointmentDAL.getPatientAppointments(patientID);
};

const getAppointmentByID = (appointmentID) => {
  return appointmentDAL.getAppointmentByID(appointmentID);
};

const removeAppointmentByClinic = async (clinicID) => {
  return appointmentDAL.removeAppointmentByClinic(clinicID);
};
const getDoctorAppointments = async (doctorID) => {
  return appointmentDAL.getDoctorAppointments(doctorID);
};
const removeAppointmentByID = async (appointmentId, patientId) => {
  return appointmentDAL.removeAppointmentByID(appointmentId, patientId);
};
const getAppointmentByShiftID = async (shiftID) => {
  return appointmentDAL.getAppointmentByShiftID(shiftID);
};
module.exports = {
  createAppointment,
  getPatientAppointments,
  getAppointmentByID,
  getDoctorAppointments,
  getAppointmentByShiftID,
  removeAppointmentByClinic,
  removeAppointmentByID,
};

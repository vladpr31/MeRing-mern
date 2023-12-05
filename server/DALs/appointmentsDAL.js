const AppointmentsDB = require("../models/appointmentModel");

const createAppointment = (appointment) => {
  const newAppointment = new AppointmentsDB({
    appointment: appointment.appointmentId,
    patient: appointment.patientID,
    doctor: appointment.doctor._id,
    clinic: appointment.doctor.clinic._id,
    been: false,
  });
  newAppointment.save();
  return newAppointment;
};
const getAppointmentByID = (appointmentID) => {
  return AppointmentsDB.findById(appointmentID);
};
const getPatientAppointments = (patientID) => {
  return AppointmentsDB.find({ patient: patientID }, { patient: 0 })
    .populate({
      path: "doctor",
      model: "Doctors",
      select: { firstName: 1, lastName: 1, _id: 0 },
    })
    .populate({
      path: "clinic",
      model: "Clinics",
      select: { clinicName: 1, location: 1, _id: 0 },
    })
    .populate({
      path: "appointment",
      model: "Shifts",
      select: { shiftDate: 1, _id: 0 },
    });
};
const removeAppointmentByClinic = async (clinicID) => {
  return await AppointmentsDB.deleteMany({
    clinic: clinicID.toString(),
  })
    .then()
    .catch((err) => console.log("error in removeAppointmentsByClinic:", err));
};

const getDoctorAppointments = async (doctorID) => {
  return AppointmentsDB.find({ doctor: doctorID }).populate(
    {
      path: "patient",
      model: "Patients",
    },
    firstName,
    lastName
  );
};
const removeAppointmentByID = async (appointmentId, patientId) => {
  return AppointmentsDB.findOneAndDelete({
    _id: appointmentId,
    patient: patientId,
  });
};

const getAppointmentByShiftID = async (shiftID) => {
  return AppointmentsDB.findOne({ appointment: shiftID });
};
module.exports = {
  createAppointment,
  getPatientAppointments,
  getDoctorAppointments,
  getAppointmentByID,
  getAppointmentByShiftID,
  removeAppointmentByClinic,
  removeAppointmentByID,
};

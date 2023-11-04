const appointmentBLL = require("../BLLs/appointmentsBLL/appointmentBLL");
const patientBLL = require("../BLLs/patientBLL/patientBLL");
const shiftBLL = require("../BLLs/shiftsBLL/shiftsBLL");

const createNewAppointment = async (req, res) => {
  try {
    const { appointmentId, userID, doctor } = req.body;
    const patient = await patientBLL.getPatientByAccountID(userID);
    if (patient) {
      const appointment = await appointmentBLL.createAppointment({
        appointmentId,
        patientID: patient._id,
        doctor,
      });
      if (appointment) {
        await shiftBLL.updateShiftAvailability(appointmentId, false);
        res.status(200).json(appointment._id);
      }
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
};
const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId, id: userID } = req.params;
    const patient = await patientBLL.getPatientByAccountID(userID);
    if (patient) {
      const appointmentToBeRemoved = await appointmentBLL.getAppointmentByID(
        appointmentId
      );
      await shiftBLL.updateShiftAvailability(
        appointmentToBeRemoved.appointment._id,
        true
      );
      await appointmentBLL.removeAppointmentByID(appointmentId, patient._id);
      res.status(200).json("Appointment has been canceled");
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
};
const getUserAppointmentsByUserID = async (req, res) => {
  try {
    const { id: userID } = req.params;
    const user = await patientBLL.getPatientByAccountID(userID);
    if (user) {
      const patientID = user._id;
      const appointments = await appointmentBLL.getPatientAppointments(
        patientID
      );

      res.status(201).json(appointments);
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
};

const getDoctorAppointmentsByDoctorID = async (req, res) => {
  try {
    const { id } = req.params;
    const doctorAppointments = await appointmentBLL.getDoctorAppointments(id);
    if (doctor) {
      res.status(200).json(doctorAppointments);
    }
  } catch (err) {
    console.log("err in getting doctor appointments", err.message);
    res.status(400).json(err.message);
  }
};

module.exports = {
  createNewAppointment,
  getUserAppointmentsByUserID,
  getDoctorAppointmentsByDoctorID,
  cancelAppointment,
};

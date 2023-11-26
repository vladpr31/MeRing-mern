const patientBLL = require("../BLLs/patientBLL/patientBLL");
const axios = require("axios");
const getPatientByAccountID = async (req, res) => {
  try {
    const { id: userID } = req.params;

    const { _id: user } = await patientBLL.getPatientByAccountID(userID);
    if (user) {
      const patient = await patientBLL.getPatientByID(user);
      if (patient) {
        res.status(200).json(patient);
      }
    } else {
      res.status(400).json("No Such User");
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const getPatientAppointmentsByDoctor = async (req, res) => {
  const { id, doctorID } = req.params;
  const patientData = await patientBLL.getPatientAppointmentsByDoctor(doctorID);
};

module.exports = { getPatientByAccountID, getPatientAppointmentsByDoctor };

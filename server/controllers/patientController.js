const patientBLL = require("../BLLs/patientBLL/patientBLL");
const getPatientByAccountID = async (req, res, next) => {
  try {
    const { id: userID } = req.params;

    const { _id: user } = await patientBLL.getPatientByAccountID(userID);
    const patient = await patientBLL.getPatientByID(user);
    if (patient) {
      res.status(200).json(patient);
    } else {
      next({ status: 400, message: "No Such UserID" });
    }
  } catch (err) {
    next(err);
  }
};

const getPatientAppointmentsByDoctor = async (req, res, next) => {
  const { id, doctorID } = req.params;
  const patientData = await patientBLL.getPatientAppointmentsByDoctor(doctorID);
};

const getAllPatients = async (req, res, next) => {
  try {
    const patients = await patientBLL.getAllPatients();
    if (patients) {
      res.status(200).json(patients);
    } else {
      next({ status: 400, message: "No Such User" });
    }
  } catch (err) {
    next(err);
  }
};
module.exports = {
  getPatientByAccountID,
  getPatientAppointmentsByDoctor,
  getAllPatients,
};

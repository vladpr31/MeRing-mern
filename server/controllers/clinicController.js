const clinicBLL = require("../BLLs/clinicBLL/clinicBLL");
const appointmentBLL = require("../BLLs/appointmentsBLL/appointmentBLL");
const doctorBLL = require("../BLLs/doctorBLL/doctorBLL");

const createNewClinic = async (req, res) => {
  try {
    const clinic = req.body;
    await clinicBLL.createNewClinic(clinic);
    const allClinics = await clinicBLL.getAllClinics();
    if (allClinics) {
      res.status(200).json(allClinics);
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
};

const updateClinicByID = async (req, res) => {
  try {
    const { id: clinicID } = req.params;
    const updatedClinic = req.body;
    await clinicBLL.editClinic(clinicID, updatedClinic);
    const allClinics = await clinicBLL.getAllClinics();
    if (updatedClinic) {
      res.status(200).json(allClinics);
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
};
const deleteClinicByID = async (req, res) => {
  try {
    const { id: clinicID } = req.params;
    const { clinicWorkers } = await clinicBLL.getClinicById(clinicID);
    let doctorsToUpdate = [];
    for (let i = 0; i < clinicWorkers.length; i++) {
      let doctor = await doctorBLL.getDoctorByID(clinicWorkers[i]);
      doctorsToUpdate.push(doctor);
    }
    await appointmentBLL.removeAppointmentByClinic(clinicID);
    await clinicBLL.removeClinic(clinicID);
    const updatedClinics = await clinicBLL.getAllClinics();
    res.status(200).json(updatedClinics);
  } catch (err) {
    console.log("error Here:", err.message);
    res.status(400).json(err.message);
  }
};
const getAllClinics = async (req, res) => {
  try {
    const clinics = await clinicBLL.getAllClinics();
    if (clinics) {
      res.status(200).json(clinics);
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports = {
  createNewClinic,
  updateClinicByID,
  deleteClinicByID,
  getAllClinics,
};

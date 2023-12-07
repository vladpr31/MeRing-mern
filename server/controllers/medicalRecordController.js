const medicalRecordBLL = require("../BLLs/medicalRecordBLL/medicalRecordBLL");
const patientBLL = require("../BLLs/patientBLL/patientBLL");
const createNewMedicalRecord = async (req, res) => {
  try {
    const record = req.body;
    const { id: userId } = req.params;
    const patient = await patientBLL.getPatientByAccountID(userId);
    record.patient = patient._id;
    const newRecord = await medicalRecordBLL.createNewMedicalRecord(record);
    if (newRecord) {
      res.status(200).json(patient);
    } else {
      console.log(
        "error: newRecord return error, in medicalRecordController.js"
      );
      res
        .status(400)
        .json("Error creating newRecord inside medicalRecordController.js");
    }
  } catch (err) {
    console.log(
      "error in createNewMedicalRecord in medicalRecordController.js, error:",
      err.message
    );
    res.status(400).json(err.message);
  }
};

module.exports = {
  createNewMedicalRecord,
};

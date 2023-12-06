const medicalRecordBLL = require("../BLLs/medicalRecordBLL/medicalRecordBLL");
const patientBLL = require("../BLLs/patientBLL/patientBLL");
const createNewMedicalRecord = async (req, res) => {
  try {
    const { record } = req.body;
    const patient = await patientBLL.getPatientByAccountID(record.patient);
    record.patient = patient._id;
    const newRecord = await medicalRecordBLL.createNewMedicalRecord(record);
    if (newRecord) {
      res.status(200).json(newRecord);
    } else {
      console.log(
        "error: newRecord returned null, in medicalRecordController.js"
      );
      res
        .status(400)
        .json("Error creating newRecord inside medicalRecordController.js");
    }
  } catch (err) {
    console.log(
      "error in createNewMedicalRecord in medicalRecordController.js"
    );
    res.status(400).json(err.message);
  }
};

module.exports = {
  createNewMedicalRecord,
};

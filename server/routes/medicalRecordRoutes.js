const express = require("express");
const router = express.Router();
const medicalRecordController = require("../controllers/medicalRecordController");

router.post("/newRecord", medicalRecordController.createNewMedicalRecord);

module.exports = router;

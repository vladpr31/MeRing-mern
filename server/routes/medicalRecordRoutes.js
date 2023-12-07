const express = require("express");
const router = express.Router();
const medicalRecordController = require("../controllers/medicalRecordController");

router.post("/:id/new-record", medicalRecordController.createNewMedicalRecord);

module.exports = router;

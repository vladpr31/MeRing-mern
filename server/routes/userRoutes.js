const express = require("express");
const router = express.Router();
const patientService = require("../controllers/patientController");

router.get("/:id", patientService.getPatientByAccountID);
router.get("/patients/getAll", patientService.getAllPatients);
module.exports = router;

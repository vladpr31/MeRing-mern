const express = require("express");
const router = express.Router();
const patientService = require("../controllers/patientController");

router.get("/:id", patientService.getPatientByAccountID);

module.exports = router;

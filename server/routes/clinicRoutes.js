const express = require("express");
const router = express.Router();
const clinicController = require("../controllers/clinicController");

router.post("/new", clinicController.createNewClinic);
router.patch("/:id/update", clinicController.updateClinicByID);
router.get("/getAll", clinicController.getAllClinics);
router.delete("/:id/remove", clinicController.deleteClinicByID);
module.exports = router;

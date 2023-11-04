const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");

router.post("/new-appointment", appointmentController.createNewAppointment);
router.get("/:id", appointmentController.getUserAppointmentsByUserID);
router.get(
  "/authorized/:id",
  appointmentController.getDoctorAppointmentsByDoctorID
);
router.delete("/:id/:appointmentId", appointmentController.cancelAppointment);
module.exports = router;

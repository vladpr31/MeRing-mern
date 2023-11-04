const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctorController");

router.post("/newDoctor", doctorController.createNewDoctor);

router.patch("/:id/update", doctorController.updateDoctor);
router.get("/getAll", doctorController.getAllDoctors);

router.get("/getByCategory/:category", doctorController.getDoctorsByCategory);

router.post("/:id/add-review", doctorController.createDoctorReview);

router.get("/:id/getReviews", doctorController.getReviewByDoctorID);

router.delete("/:id/remove", doctorController.deleteDoctorByID);

router.get("/authorized/:id", doctorController.getDoctorDataByID);
module.exports = router;

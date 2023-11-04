const express = require("express");
const router = express.Router();
const scrapeController = require("../controllers/scrapeContoller");

router.get("/getAllDiseases", scrapeController.getAllDiseases);
router.get("/getAllSpecialties", scrapeController.getAllSpecialties);

module.exports = router;

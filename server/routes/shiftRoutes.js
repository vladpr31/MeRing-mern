const express = require("express");
const router = express.Router();
const shiftsController = require("../controllers/shiftsController");

router.post("/new-shift", shiftsController.createNewShift);
router.delete("/:doctorId/:shiftId", shiftsController.deleteShift);
module.exports = router;

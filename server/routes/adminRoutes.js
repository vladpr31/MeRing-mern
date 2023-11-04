const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/new-admin", authController.createAdmin);

module.exports = router;

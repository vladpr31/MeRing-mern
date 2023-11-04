const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", authController.login);
router.post("/register", authController.registerUser);
router.post("/register-worker", authController.registerWorker);

// router.post("/refresh_token");

module.exports = router;

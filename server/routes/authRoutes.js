const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validation = require("../middlewares/validation-middleware");

router.post("/login", validation, authController.login);
router.post("/register", validation, authController.registerUser);
router.post("/register-worker", validation, authController.registerWorker);

// router.post("/refresh_token");

module.exports = router;

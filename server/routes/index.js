const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const scrapRoutes = require("./scrapRoutes");
const userRoutes = require("./userRoutes");
const doctorsRoutes = require("./doctorsRoutes");
const appointmentsRoutes = require("./appointmentsRoutes");
const clinicRoutes = require("./clinicRoutes");
const chatRoutes = require("./chatRoutes");
const shiftRoutes = require("./shiftRoutes");
const adminRoutes = require("./adminRoutes");
const articleRoutes = require("./articleRoutes");
const imageRoutes = require("./imageRoutes");
const medicalRecordRoutes = require("./medicalRecordRoutes");

// Define middleware for token verification
const verifyToken = require("../middlewares/jwtVerify");
const { upload } = require("../middlewares/uploadImage");

// Apply the token verification middleware to the routes that require it
router.use("/users", verifyToken, userRoutes);
router.use("/doctors", verifyToken, doctorsRoutes);
router.use("/appointments", verifyToken, appointmentsRoutes);
router.use("/clinics", verifyToken, clinicRoutes);
router.use("/chat", verifyToken, chatRoutes);
router.use("/shift", verifyToken, shiftRoutes);
router.use("/records", verifyToken, medicalRecordRoutes);

// Routes that don't require token verification
router.use("/auth", authRoutes);
router.use("/scrap", scrapRoutes);
router.use("/articles", upload.single("articleImage"), articleRoutes);
router.use("/images", imageRoutes);
router.use("/admin", adminRoutes);
module.exports = router;

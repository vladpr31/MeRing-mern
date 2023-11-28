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

// Define middleware for token verification
const verifyToken = require("../middlewares/jwtVerify"); // Make sure to implement or import this middleware

// Apply the token verification middleware to the routes that require it
router.use("/users", verifyToken, userRoutes);
router.use("/doctors", verifyToken, doctorsRoutes);
router.use("/appointments", verifyToken, appointmentsRoutes);
router.use("/clinics", verifyToken, clinicRoutes);
router.use("/chat", verifyToken, chatRoutes);
router.use("/shift", verifyToken, shiftRoutes);
router.use("/admin", adminRoutes);

// Routes that don't require token verification
router.use("/auth", authRoutes);
router.use("/scrap", scrapRoutes);

// You can also apply a common middleware to all routes under the '/api' prefix if needed
// router.use('/api', someCommonMiddleware, authRoutes, scrapRoutes, userRoutes, ...);

module.exports = router;

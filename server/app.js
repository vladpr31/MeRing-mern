//importing modules.
const connectDB = require("./config/mongoDB.config");
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const scrapRoutes = require("./routes/scrapRoutes");
const userRoutes = require("./routes/userRoutes");
const doctorsRoutes = require("./routes/doctorsRoutes");
const appointmentsRoutes = require("./routes/appointmentsRoutes");
const clinicRoutes = require("./routes/clinicRoutes");
const chatRoutes = require("./routes/chatRoutes");
const shiftRoutes = require("./routes/shiftRoutes");
const adminRoutes = require("./routes/adminRoutes");
const verifyToken = require("./middlewares/jwtVerify");
//Server Creation & Connection to DB.
connectDB();
const app = express();

app.use(cors());
app.use(express.json());

//Routes go here:
app.use("/auth", authRoutes);
app.use("/scrap", scrapRoutes);
app.use("/users", verifyToken, userRoutes);
app.use("/doctors", verifyToken, doctorsRoutes);
app.use("/appointments", verifyToken, appointmentsRoutes);
app.use("/clinics", verifyToken, clinicRoutes);
app.use("/chat", verifyToken, chatRoutes);
app.use("/shift", verifyToken, shiftRoutes);
app.use("/admin", adminRoutes);
module.exports = app;

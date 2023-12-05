//importing modules.
const { connectDB } = require("./config/mongoDB.config");
const express = require("express");
const cors = require("cors");
const api = require("./routes/index");
require("dotenv").config();

//Server Creation & Connection to DB.
const corsOptions = {
  origin: process.env.CLIENT_DEV_URI,
};
connectDB()
  .then(() => {
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use("/api", api);
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
const app = express();

//Routes go here:
module.exports = app;

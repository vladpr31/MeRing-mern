//importing modules.
const connectDB = require("./config/mongoDB.config");
const express = require("express");
const cors = require("cors");
const api = require("./routes/index");
//Server Creation & Connection to DB.
connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", api);
//Routes go here:
module.exports = app;

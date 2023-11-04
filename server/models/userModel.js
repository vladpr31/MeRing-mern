const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();
const userModel = new mongoose.Schema({
  email: String,
  password: String,
  secretAnswer: String,
  role: String,
});

userModel.pre("save", async function (next) {
  const hashPassword = await bcrypt.hash(
    this.password,
    Number(process.env.BCRYPT_SALT)
  );
  this.password = hashPassword;
  next();
});

const User = mongoose.model("Users", userModel);
module.exports = User;

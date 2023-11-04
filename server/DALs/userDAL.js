const UserDB = require("../models/userModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const createNewUser = (credentials) => {
  credentials.role = "user";
  const newUser = new UserDB(credentials);
  newUser.save();
  return newUser;
};
const createNewDoctor = (credentials) => {
  credentials.role = "doctor";
  const newUser = new UserDB(credentials);
  newUser.save();
  return newUser;
};
const getUserByID = (userID) => {
  return UserDB.findById(userID);
};

const validateUser = async (patientInfo) => {
  try {
    const user = await UserDB.findOne({
      email: patientInfo.email,
    });

    if (user.role !== "admin") {
      const isValid = await bcrypt.compare(patientInfo.password, user.password);
      if (!isValid) {
        throw new Error("Invalid or expired password reset token");
      }
      return user;
    } else {
      return user;
    }
  } catch (err) {
    return "No User Found";
  }
};

const checkAvailability = async (credentials) => {
  const user = await UserDB.findOne({ email: credentials.email });
  if (user) {
    return true;
  }
  return false;
};

const createNewAdmin = async () => {
  const adminUser = {
    email: "admin@admin.com",
    password: "admin",
    role: "admin",
  };
  const exist = await checkAvailability(adminUser);

  if (!exist) {
    const admin = new UserDB(adminUser);
    admin.save();
    return admin;
  }
  return exist;
};
module.exports = {
  createNewUser,
  getUserByID,
  validateUser,
  createNewDoctor,
  checkAvailability,
  createNewAdmin,
};

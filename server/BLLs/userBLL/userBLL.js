const userDAL = require("../../DALs/userDAL");

const createNewUser = async (credentials) => {
  credentials.role = "user";
  return userDAL.createNewUser(credentials);
};

const createNewDoctor = async (credentials) => {
  credentials.role = "doctor";
  return userDAL.createNewDoctor(credentials);
};

const getUserByID = async (userID) => {
  return userDAL.getUserByID(userID);
};

const validateUser = async (patientInfo) => {
  return userDAL.validateUser(patientInfo);
};

const checkAvailability = async (credentials) => {
  return userDAL.checkAvailability(credentials);
};

module.exports = {
  checkAvailability,
  validateUser,
  getUserByID,
  createNewDoctor,
  createNewUser,
};

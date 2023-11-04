const chatDAL = require("../../DALs/chatDAL");

const getChat = (chatID) => {
  return chatDAL.getChat(chatID);
};

const getAllChatsOfPatient = (patientID) => {
  return chatDAL.getAllChatsOfPatient(patientID);
};

const getAllChatsOfDoctor = (doctorID) => {
  return chatDAL.getAllChatsOfDoctor(doctorID);
};

const createNewChat = (patientID, doctorID) => {
  return chatDAL.createNewChat(patientID, doctorID);
};

const updateChatHistory = (chatID, newChatHistory) => {
  return chatDAL.updateChatHistory(chatID, newChatHistory);
};

const updatePatientLastViewed = async (chatID, sentMessage) => {
  return chatDAL.updatePatientLastViewed(chatID, sentMessage);
};

const updateDoctorLastViewed = async (chatID, sentMessage) => {
  return chatDAL.updateDoctorLastViewed(chatID, sentMessage);
};

module.exports = {
  getChat,
  getAllChatsOfPatient,
  getAllChatsOfDoctor,
  createNewChat,
  updateChatHistory,
  updatePatientLastViewed,
  updateDoctorLastViewed,
};

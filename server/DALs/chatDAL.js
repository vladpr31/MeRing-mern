const ChatDB = require("../models/chatModel");

const getChat = (chatID) => {
  return ChatDB.findById(chatID)
    .populate({
      path: "chatHistory",
      model: "Message",
    })
    .populate({
      path: "doctor",
      model: "Doctors",
      select: { firstName: 1, lastName: 1, account: 1 },
    })
    .populate({
      path: "patient",
      model: "Patients",
      select: { firstName: 1, lastName: 1, account: 1 },
    });
};

const getAllChatsOfPatient = (patientID) => {
  return ChatDB.find({ patient: patientID })
    .populate({
      path: "chatHistory",
      model: "Message",
    })
    .populate({
      path: "doctor",
      model: "Doctors",
      select: { firstName: 1, lastName: 1, _id: 0 },
    })
    .populate({
      path: "patient",
      model: "Patients",
      select: { firstName: 1, lastName: 1, _id: 0 },
    });
};

const getAllChatsOfDoctor = (doctorID) => {
  return ChatDB.find({ doctor: doctorID })
    .populate({
      path: "chatHistory",
      model: "Message",
    })
    .populate({
      path: "doctor",
      model: "Doctors",
      select: { firstName: 1, lastName: 1, _id: 0 },
    })
    .populate({
      path: "patient",
      model: "Patients",
      select: { firstName: 1, lastName: 1, _id: 0 },
    });
};

const createNewChat = (patientID, doctorID) => {
  const newChat = new ChatDB({
    patient: patientID,
    doctor: doctorID,
    patientLastViewed: {
      dateViewed: Date.now(),
      lastMessageCount: 0,
    },
    doctorLastViewed: {
      dateViewed: Date.now(),
      lastMessageCount: 0,
    },
  });
  newChat.save();
  return newChat;
};

const updateChatHistory = (chatID, newChatHistory) => {
  return ChatDB.findByIdAndUpdate(
    { _id: chatID },
    { $addToSet: { chatHistory: newChatHistory } }
  );
};

const updatePatientLastViewed = async (chatID, sentMessage) => {
  if (!sentMessage) {
    return ChatDB.findByIdAndUpdate(
      { _id: chatID },
      {
        patientLastViewed: { dateViewed: Date.now(), lastMessageCount: 0 },
      },
      { new: true }
    )
      .then()
      .catch((err) => console.log("patient lastView", err.message));
  } else {
    return ChatDB.findByIdAndUpdate(
      { _id: chatID },
      {
        $inc: { "doctorLastViewed.lastMessageCount": 1 },
        $set: { "patientLastViewed.dateViewed": new Date() },
      },
      { new: true }
    )
      .then()
      .catch((err) => console.log("patient lastView", err.message));
  }
};
const updateDoctorLastViewed = async (chatID, sentMessage) => {
  if (!sentMessage) {
    return ChatDB.findByIdAndUpdate(
      { _id: chatID },
      {
        doctorLastViewed: { dateViewed: Date.now(), lastMessageCount: 0 },
      },
      { new: true }
    )
      .then()
      .catch((err) => console.log("doc lastview", err.message));
  } else {
    return ChatDB.findByIdAndUpdate(
      { _id: chatID },
      {
        $inc: { "patientLastViewed.lastMessageCount": 1 },
        $set: { "doctorLastViewed.dateViewed": new Date() },
      },
      { new: true }
    );
  }
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

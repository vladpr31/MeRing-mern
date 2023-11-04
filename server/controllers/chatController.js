const chatBLL = require("../BLLs/chatBLL/chatBLL");
const messageBLL = require("../BLLs/messageBLL/messagesBLL");
const patientBLL = require("../BLLs/patientBLL/patientBLL");
const doctorBLL = require("../BLLs/doctorBLL/doctorBLL");

const getAllUserChats = async (req, res) => {
  try {
    const { id, role } = req.params;
    if (role === "user") {
      const user = await patientBLL.getPatientByAccountID(id);
      const chats = await chatBLL.getAllChatsOfPatient(user._id);
      if (chats) {
        res.status(200).json(chats);
      }
    }
    if (role === "doctor") {
      const user = await doctorBLL.getDoctorByAccountID(id);
      const chats = await chatBLL.getAllChatsOfDoctor(user._id);
      if (chats) {
        res.status(200).json(chats);
      }
    }
  } catch (e) {
    console.log(e.message);
    res.status(400).json(e.message);
  }
};

const createNewChat = async (req, res) => {
  try {
    const { patientID, doctorID } = req.body;
    const patientUser = await patientBLL.getPatientByAccountID(patientID);
    const newChat = await chatBLL.createNewChat(patientUser._id, doctorID);
    if (newChat) {
      res.status(200).json(newChat);
    }
  } catch (e) {
    res.status(400).json(e.message);
  }
};

const getChatByID = async (req, res) => {
  try {
    const { chatID, role } = req.params;
    if (role === "user") {
      const currentChat = await chatBLL.getChat(chatID);
      const currCount = currentChat.chatHistory.length;
      await chatBLL.updatePatientLastViewed(chatID, false, currCount);
      if (currentChat) {
        res.status(200).json(currentChat);
      }
    }
    if (role === "doctor") {
      const currentChat = await chatBLL.getChat(chatID);
      const currCount = currentChat.chatHistory.length;
      await chatBLL.updateDoctorLastViewed(chatID, false, currCount);

      if (currentChat) {
        res.status(200).json(currentChat);
      }
    }
  } catch (e) {
    console.log(e.message);
    res.status(400).json(e.message);
  }
};

const addNewMessageToChatHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const message = req.body;
    const newMessage = await messageBLL.newMessage(message);
    const updatedChat = await chatBLL.updateChatHistory(id);
    if (newMessage && updatedChat) {
      res.status(200).json(updatedChat);
    }
  } catch (e) {
    res.status(400).json(e.message);
  }
};

module.exports = {
  getAllUserChats,
  getChatByID,
  createNewChat,
  addNewMessageToChatHistory,
};

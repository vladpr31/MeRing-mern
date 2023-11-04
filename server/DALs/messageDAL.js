const MessageDB = require("../models/messageModel");

const newMessage = (message) => {
  const newMessage = new MessageDB(message);
  newMessage.save();
  return newMessage;
};

module.exports = { newMessage };

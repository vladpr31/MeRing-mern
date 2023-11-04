const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctors" },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  chatHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
});

const Chat = mongoose.model("Chats", chatSchema);
module.exports = Chat;

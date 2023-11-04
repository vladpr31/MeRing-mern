const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

router.post("/newChat", chatController.createNewChat);
router.post("/:chatID/newMessage", chatController.addNewMessageToChatHistory);
router.get("/:role/:id/getChats", chatController.getAllUserChats);
router.get("/:chatID/:role", chatController.getChatByID);

module.exports = router;

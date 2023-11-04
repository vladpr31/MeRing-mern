const messageDAL = require("../../DALs/messageDAL");

const newMessage = async (messageInfo) => {
  if (messageInfo.senderType === "USER") {
    const newMessage = {
      senderType: messageInfo.senderType,
      receiverType: "DOCTOR",
      content: messageInfo.content,
      timestamp: new Date(),
    };
    return await messageDAL.newMessage(newMessage);
  }
  if (messageInfo.senderType === "DOCTOR") {
    const newMessage = {
      senderType: messageInfo.senderType,
      receiverType: "USER",
      content: messageInfo.content,
      timestamp: new Date(),
    };
    return await messageDAL.newMessage(newMessage);
  }
};
module.exports = { newMessage };

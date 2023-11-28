const app = require("../app");
const server = require("http").createServer(app);
const chatBLL = require("../BLLs/chatBLL/chatBLL");
const messageBLL = require("../BLLs/messageBLL/messagesBLL");
const patientBLL = require("../BLLs/patientBLL/patientBLL");
const doctorBLL = require("../BLLs/doctorBLL/doctorBLL");
const reviewBLL = require("../BLLs/reviewBLL/reviewBLL");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
  },
});
const usersSet = new Map();
const notifications = {};

//on connection we keep key-value pairs of the userID and his SocketID, that way we can idenitify each user by his SocketID,
// and make actions using his ID.
io.on("connection", async (socket) => {
  //console.log("connecting", socket.id);
  if (socket.handshake.query.role === "user") {
    const user = await patientBLL.getPatientByAccountID(
      socket.handshake.query.userId
    );
    usersSet.set(user._id.toString(), socket.id);
  }
  if (socket.handshake.query.role === "doctor") {
    const doctor = await doctorBLL.getDoctorByAccountID(
      socket.handshake.query.userId
    );
    usersSet.set(doctor._id.toString(), socket.id);
  }

  //when joining a room, we notify the clients in the room that user has joined.
  socket.on("join_room", async (data) => {
    try {
      const { chatId, firstName, lastName } = data;
      socket.join(chatId);
      socket
        .to(chatId)
        .emit(
          "joined_message",
          `${firstName + " " + lastName} Joined The Chat.`
        );
      if (socket.handshake.query.role === "user") {
        if (Object.keys(notifications).length > 0) {
          if (notifications[chatId] && notifications[chatId][1] === "doctor") {
            notifications.total -= notifications[chatId][0];
            notifications[chatId][0] = 0;
            io.to(socket.id).emit("notifications", notifications);
          }
        }
      }

      if (socket.handshake.query.role === "doctor") {
        if (Object.keys(notifications).length > 0) {
          if (notifications[chatId] && notifications[chatId][1] === "user") {
            notifications.total -= notifications[chatId][0];
            notifications[chatId][0] = 0;
            io.to(socket.id).emit("notifications", notifications);
          }
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  });

  //when sending message into room.
  socket.on("send_message", async (data) => {
    const { message, room: chatId } = data;
    const newMessage = await messageBLL.newMessage(message);
    await chatBLL.updateChatHistory(chatId, newMessage);
    if (newMessage) {
      io.to(chatId).emit("received_message", newMessage);
    }
  });
  //when disconnecting from the room chat, we send message that user left and we disconnect the socket..
  socket.on("leave_room", async (data) => {
    const { chatId, firstName, lastName } = data;
    socket.leave(chatId);
    socket
      .to(chatId)
      .emit(
        "disconnect_message",
        `${firstName + " " + lastName} Left The Chat.`
      );
    socket.emit("disconnected");
  });
  //when new message received we update the notifications, based on who sent it.
  socket.on("new_message_notify", async (data) => {
    let receiver;

    if (io.sockets.adapter.rooms.get(data.room._id).size < 2) {
      const chat = await chatBLL.getChat(data.room._id);
      const patientId = chat.patient._id.toString();
      const doctorId = chat.doctor._id.toString();

      //if user sent message then we get the socket ID of the doctor, and emit to him the updated notifications object.
      if (socket.handshake.query.role === "user") {
        receiver = usersSet.get(doctorId);
        notifications[data.room._id] = [
          data.count,
          socket.handshake.query.role,
        ];
        notifications.total = data.count;
        io.to(receiver).emit("notifications", notifications);
      }
      // and if doctor sent message then we get the Socket Id of the patient and emit to him the updated notifications object.
      if (socket.handshake.query.role === "doctor") {
        receiver = usersSet.get(patientId);
        notifications[data.room._id] = [
          data.count,
          socket.handshake.query.role,
        ];

        notifications.total = data.count;
        io.to(receiver).emit("notifications", notifications);
      }
    }
  });

  socket.on("send_review", async (data) => {
    data.review.timestamp = new Date();
    const patient = await patientBLL.getPatientByAccountID(data.userId);
    data.review.reviewer = data.userId;
    const patientData = await patientBLL.getPatientByID(patient._id);
    data.review.reviewerProfileImage = patientData.profileImage;
    const review = await reviewBLL.createNewReview(data.review);
    const doctor = await doctorBLL.getDoctorByAccountID(data.doctorId);
    await patientBLL.updatePatient(patient._id, "reviews", review);
    await doctorBLL.updateDoctor(doctor._id, "reviews", review);
    io.emit("received_review", review);
  });

  socket.on("review_update", async (data) => {
    const editedReview = await reviewBLL.updateReview(
      data.reviewId,
      data.reviewEdit
    );
    io.emit("review_updated", editedReview);
  });
});

module.exports = server;

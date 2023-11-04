import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
const ChatForm = ({ socket, room }) => {
  const { user } = useSelector((state) => state.user);
  const { auth } = useSelector((state) => state.auth);
  const [userText, setUserText] = useState("");
  const [messageCount, setMessageCount] = useState(0);
  const messageHandler = (e) => {
    const { value } = e.target;
    setUserText(value);
  };
  const sendMessageHandler = (e) => {
    if (e.key === "Enter") {
      if (userText != "") {
        socket.emit("send_message", {
          room: room._id,
          user: user.firstName + " " + user.lastName,
          message: {
            content: userText,
            senderType: auth.role.toUpperCase(),
          },
        });
        socket.emit("new_message_notify", {
          room,
          user,
          count: messageCount + 1,
        });
        setMessageCount((prevState) => prevState + 1);
      }
      setUserText("");
    }
    if (e.target.id === "sendBtn") {
      if (userText != "") {
        socket.emit("send_message", {
          room: room._id,
          user: user.firstName + " " + user.lastName,
          message: {
            content: userText,
            senderType: auth.role.toUpperCase(),
          },
        });
      }
      setUserText("");
    }
  };
  useEffect(() => {
    socket.on("joined_message", (data) => {
      setMessageCount(0);
    });
  }, [socket]);
  return (
    <div className="flex p-2 items-center">
      <input
        className="input input-bordered input-info rounded-2xl w-full bg-base-300 items-center"
        placeholder="Your Message"
        onChange={messageHandler}
        onKeyDown={sendMessageHandler}
        value={userText}
      />
      <button
        className="bg-blue-600 ml-2 p-4 rounded-xl text-white"
        id="sendBtn"
        onClick={sendMessageHandler}
      >
        Send
      </button>
    </div>
  );
};

export default ChatForm;

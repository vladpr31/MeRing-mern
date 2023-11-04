import React, { useEffect, useState, useRef } from "react";
import { getExistingChat } from "../../../api/api";
import ChatForm from "../../Forms/ChatForm";
import { useSelector, useDispatch } from "react-redux";
import { getSocket } from "../../../api/socket";
const ChatWindow = ({ selectedChatId, currUser, leaveChatHandler }) => {
  const { auth } = useSelector((state) => state.auth);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(dispatch(getSocket()));
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchChatHistory = async () => {
      const chatID = selectedChatId.split("_")[1];
      const { data } = await getExistingChat(chatID, auth.role);
      setSelectedChat(data);
      setChatHistory(data.chatHistory);
      socket.emit("join_room", {
        chatId: data._id,
        firstName: currUser.firstName,
        lastName: currUser.lastName,
      });
    };
    if (selectedChatId !== null) {
      fetchChatHistory();
    }
    socket.on("received_message", (data) => {
      setChatHistory((prevState) => [...prevState, data]);
    });
    socket.on("disconnected", () => {
      setChatHistory([]);
    });
    socket.on("disconnect_message", (data) => {
      setChatHistory((prevState) => [
        ...prevState,
        { content: data, timestamp: Date.now(), senderType: "BOT" },
      ]);
    });
    socket.on("joined_message", (data) => {
      setChatHistory((prevState) => [
        ...prevState,
        { content: data, timestamp: Date.now(), senderType: "BOT" },
      ]);
    });

    return () => {
      socket.off("received_message");
      socket.off("joined_message");
      socket.off("disconnect_message");
    };
  }, [selectedChatId, socket]);

  useEffect(() => {
    if (selectedChatId && selectedChat) {
      scrollToBottom();
    }
  });
  return (
    <div className="flex flex-col items-center justify-center w-full lg:h-full xl:h-full h-screen bg-gray-100 text-gray-800">
      <div className="flex flex-col flex-grow w-full max-w-full bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
          <div className="flex flex-col bg-base-200 rounded-xl p-2">
            {currUser && selectedChat ? (
              <div className="flex p-2 mb-2">
                <h1 className="py-2 w-fit px-4 rounded-xl bg-blue-100 h-full mx-auto flex items-center text-black mb-1 ">
                  <span className="underline mr-1"> Chatting With: </span>
                  <span className="font-bold">
                    {auth.role === "user"
                      ? "Dr. " +
                        selectedChat.doctor.firstName +
                        " " +
                        selectedChat.doctor.lastName
                      : "     " +
                        selectedChat.patient.firstName +
                        " " +
                        selectedChat.patient.lastName}
                  </span>
                </h1>
                <button className="btn btn-success" onClick={leaveChatHandler}>
                  Leave Chat
                </button>
              </div>
            ) : null}
            <hr />
            {chatHistory.map((message, index) => {
              return message.senderType.toLowerCase() === auth.role ? (
                <div
                  className="chat chat-start items-center flex flex-row"
                  key={index}
                >
                  <span className="bg-info rounded-full p-2">
                    {auth.role === message.senderType.toLowerCase()
                      ? "You"
                      : null}
                  </span>

                  <span className="chat-bubble chat-bubble-info flex flex-col">
                    {message.content}
                  </span>
                  <time className="text-xs opacity-50">
                    {new Date(message.timestamp).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                </div>
              ) : message.senderType.toLowerCase() !== auth.role &&
                message.senderType !== "BOT" ? (
                <div
                  className="chat chat-end flex flex-row justify-end items-center"
                  key={index}
                >
                  <time className="text-xs opacity-50">
                    {new Date(message.timestamp).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                  <div className="chat-bubble bg-red-200 text-black">
                    {message.content}
                  </div>

                  <div className="chat-header">
                    <span className="bg-red-400 font-bold rounded-full p-2">
                      {" "}
                      {auth.role !== message.senderType.toLowerCase() &&
                      auth.role === "user"
                        ? selectedChat.doctor.firstName[0] +
                          selectedChat.doctor.lastName[0]
                        : selectedChat.patient.firstName[0] +
                          selectedChat.patient.lastName[0]}
                    </span>
                  </div>
                </div>
              ) : (
                <div
                  className="bg-gray-400 rounded-full text-center p-2"
                  key={index}
                >
                  {message.content}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>
        {selectedChat ? (
          <>
            <span className="mx-auto">
              Press <kbd className="kbd kbd-sm">Enter</kbd> To Send, Or Use Send
              Button.
            </span>
            <ChatForm socket={socket} room={selectedChat} />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default React.memo(ChatWindow);

///Chat Doesn't update when switching between them.

/*
 <div className="w-[80%] flex flex-col flex-1 p-2 items-center ">
      <h1 className="text-white">Messages</h1>
      {props && selectedChat ? (
        <div className="flex flex-col justify-between w-full p-2 bg-base-300 rounded-xl  overflow-y-auto ">
          <div className="border-2 border-solid border-black p-4 rounded-xl overflow-y-auto">
            <h1 className="chat-bubble bg-gray-300 flex items-center text-black mx-auto text-[12px] mb-1 ">
              Now Chatting With{" "}
              {auth.role === "user"
                ? "Dr. " +
                  selectedChat.doctor.firstName +
                  " " +
                  selectedChat.doctor.lastName
                : " " +
                  selectedChat.patient.firstName +
                  " " +
                  selectedChat.patient.lastName}
            </h1>
            <hr className="border-gray-300" />

            {chatHistory.map((message, index) => {
              return message.senderType.toLowerCase() === auth.role ? (
                <div className="chat chat-start" key={index}>
                  <div className="chat-header">
                    {auth.role === message.senderType.toLowerCase()
                      ? "You:"
                      : null}
                  </div>
                  <span className="chat-bubble chat-bubble-info flex flex-col">
                    {message.content}
                    <time className="text-xs opacity-50">
                      {new Date(message.timestamp).toLocaleTimeString("en-GB")}
                    </time>
                  </span>
                </div>
              ) : (
                <div className="chat chat-end" key={index}>
                  <div className="chat-header">
                    {auth.role !== message.senderType.toLowerCase() &&
                    auth.role === "user"
                      ? selectedChat.doctor.firstName +
                        " " +
                        selectedChat.doctor.lastName +
                        " Said:"
                      : selectedChat.patient.firstName +
                        " " +
                        selectedChat.patient.lastName +
                        " Said:"}
                  </div>
                  <div className="chat-bubble chat-bubble-accent flex flex-col">
                    {message.content}
                    <time className="text-xs opacity-50">
                      {new Date(message.timestamp).toLocaleTimeString("en-GB")}
                    </time>
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <ChatForm socket={Socket} room={selectedChat} />
          </div>
        </div>
      ) : (
        <h1>Here Will Be Messages</h1>
      )}
    </div>
*/

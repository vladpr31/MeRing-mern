import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatWindow from "./ChatWindow";
import Select from "react-select";
import { getAllDoctors } from "../../../Redux/Actions/doctorActions";
import Loader from "../../UI/Loader";
import {
  createChat,
  getAllUserChats,
} from "../../../Redux/Actions/chatActions";
import { getSocket } from "../../../api/socket";
import MessageIndicator from "../../UI/MessageIndicator";
import useWindowSize from "../../../hooks/useWindowSize";

const MessagesPage = () => {
  const { user, isLoading } = useSelector((state) => state.user);
  const { auth } = useSelector((state) => state.auth);
  const { doctors } = useSelector((state) => state.doctors);
  const { rooms } = useSelector((state) => state.chats);
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const dispatch = useDispatch();
  const [selectedChat, setSelectedChat] = useState(
    JSON.parse(localStorage.getItem("activeChat"))
  );
  const [socket, setSocket] = useState(dispatch(getSocket()));
  const [doctorOptions, setDoctorOptions] = useState([]);

  // Fetch doctors if not already loaded
  useEffect(() => {
    if (auth.role === "user" && doctors.length === 0) {
      dispatch(getAllDoctors());
    }
  }, [auth, doctors, dispatch]);

  // Initialize doctor options when doctors data is available
  useEffect(() => {
    if (doctors.length > 0) {
      const options = doctors.map((doctor) => ({
        value: doctor,
        label: `${doctor.firstName} ${doctor.lastName}`,
      }));

      // remove from options the doctors that already have open chat
      if (rooms.length > 0) {
        const labelsSet = new Set(
          rooms.map(
            (item) => item.doctor.firstName + " " + item.doctor.lastName
          )
        );
        const filteredArr2 = options.filter(
          (item) => !labelsSet.has(item.label)
        );
        setDoctorOptions(filteredArr2);
      } else {
        setDoctorOptions(options);
      }
    }
  }, [doctors.length]);

  // Fetch user chats when rooms change
  useEffect(() => {
    dispatch(getAllUserChats(auth.id, auth.role));
  }, [rooms.length, dispatch, auth.id, auth.role]);

  // Handle chat selection
  const handleChatSelection = (e) => {
    e.stopPropagation();
    const chatId = e.target.id;
    if (selectedChat !== chatId && selectedChat !== null) {
      socket.emit("leave_room", {
        chatId: selectedChat.split("_")[1],
        firstName: user.firstName,
        lastName: user.lastName,
      });

      localStorage.setItem("activeChat", JSON.stringify(chatId));
      setSelectedChat(chatId);
    } else {
      localStorage.setItem("activeChat", JSON.stringify(chatId));
      setSelectedChat(chatId);
    }
  };
  //Handle Leave Chat Room.
  const leaveChatHandler = () => {
    socket.emit("leave_room", {
      chatId: selectedChat.split("_")[1],
      firstName: user.firstName,
      lastName: user.lastName,
    });
    setSelectedChat(null);
    localStorage.removeItem("activeChat");
  };
  // Open new chat modal
  const openNewChatModal = () => {
    const modal = document.getElementById("chat_modal");
    modal.showModal();
  };

  // Create a new chat when a doctor is selected
  const createNewChat = async (selected) => {
    dispatch(await createChat(auth.id, selected.value._id));
    const modal = document.getElementById("chat_modal");
    modal.style.display = "none";
  };

  if (isLoading && doctorOptions.length === 0) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex w-full lg:h-full xl:h-full h-screen ">
        <div className="lg:w-[20%] xl:w-[20%] w-[60%] lg:h-full xl:h-full h-screen">
          <div className="bg-gray-600 flex flex-col justify-between p-2 lg:h-full xl:h-full h-screen">
            <div className="bg-gray-100 flex flex-col rounded-2xl">
              {rooms?.length > 0 ? (
                <div className="flex flex-col p-2">
                  <h1 className="text-center underline py-4">Active Chats</h1>
                  {rooms.map((chat) => (
                    <button
                      onClick={handleChatSelection}
                      id={`chat_${chat._id}`}
                      key={chat._id}
                      className={`${
                        selectedChat === `chat_${chat._id}`
                          ? "bg-cyan-600 text-white text rounded-lg p-2 mb-2 border-4 border-solid border-black text-center flex whitespace-nowrap items-center"
                          : "bg-white text-black text rounded-lg p-2 mb-2 border-2 border-black text-center flex  items-center text-[12px] whitespace-nowrap lg:text-[16px]"
                      }`}
                    >
                      <img
                        src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
                        className="w-8 rounded-full mask mask-decagon pointer-events-none"
                      />
                      <span className="px-1 pointer-events-none">
                        {auth.role === "user"
                          ? `Dr. ${chat.doctor.firstName} ${chat.doctor.lastName}`
                          : `${chat.patient.firstName} ${chat.patient.lastName}`}
                      </span>
                      <MessageIndicator
                        chatId={chat._id}
                        globalNotifications={false}
                      />
                    </button>
                  ))}
                </div>
              ) : (
                <h2 className="text-black p-4 text-center">
                  No Available Chats
                </h2>
              )}
            </div>

            <button className="btn btn-primary" onClick={openNewChatModal}>
              Create New Chat
            </button>
            <dialog id="chat_modal" className="modal">
              <div className="modal-box h-full">
                {doctorOptions.length >= 0 ? (
                  <Select options={doctorOptions} onChange={createNewChat} />
                ) : (
                  <Loader />
                )}
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
          </div>
        </div>
        {selectedChat ? (
          <ChatWindow
            selectedChatId={selectedChat}
            currUser={user}
            leaveChatHandler={leaveChatHandler}
          />
        ) : (
          <div
            className={
              isMobile
                ? `bg-white h-full w-full flex flex-col justify-evenly`
                : `bg-white h-full w-full`
            }
          >
            <h1 className="text-[24px] text-center py-4">Welcome to ME-Chat</h1>
            <img
              src="https://unblast.com/wp-content/uploads/2020/05/Group-Chat-Illustration.jpg"
              alt="chat"
              className="h-[40%] w-[100%] mx-auto lg:h-[60%] lg:w-[50%] xl:h-[70%] xl:w-[50%]"
            />
            <p className="text-center p-2">Chat with your favorite doctor.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(MessagesPage);

import { io } from "socket.io-client";

let socket; // Store a reference to the socket outside Redux
const URL = "http://localhost:9000";
export const initializeSocket = (auth) => {
  socket = io(URL, {
    autoConnect: false,
    query: { userId: auth?.id, role: auth?.role },
  });
  console.log("Socket Initialized");
  socket.onAny((event, ...args) => {
    console.log("event:", event);
    console.log(event, args);
  });
};

export const getSocket = () => () => {
  if (!socket) {
    throw new Error("Socket has not been initialized.");
  }
  return socket;
};

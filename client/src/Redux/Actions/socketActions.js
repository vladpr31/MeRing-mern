import { CONNECT_SOCKET, DISCONNECT_SOCKET } from "../typeDefs/typeDefs";

import { initializeSocket, getSocket } from "../../api/socket";

export const connectSocket = (auth) => (dispatch) => {
  initializeSocket(auth); // Initialize the socket
  dispatch({ type: CONNECT_SOCKET });
};

export const disconnectSocket = () => (dispatch) => {
  const socket = getSocket();
  if (socket) {
    socket.disconnect();
    socket.removeAllListeners(); // Remove any listeners to prevent memory leaks
    dispatch({ type: DISCONNECT_SOCKET });
  }
};

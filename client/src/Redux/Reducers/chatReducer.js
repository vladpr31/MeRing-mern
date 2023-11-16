import {
  CREATE_ROOM_SUCCESS,
  JOIN_ROOM_SUCCESS,
  SET_MESSAGE_NOTIFICATION,
} from "../typeDefs/typeDefs";

const initialState = {
  rooms: [],
  notifications: [],
};

const chatReducer = (state, action) => {
  if (typeof state === "undefined") {
    return initialState;
  }
  switch (action.type) {
    case CREATE_ROOM_SUCCESS:
      return { ...state, rooms: action.payload };

    case JOIN_ROOM_SUCCESS:
      return { ...state, rooms: action.payload };
    case SET_MESSAGE_NOTIFICATION:
      return { ...state, notifications: action.payload };
    default:
      return state;
  }
};

export default chatReducer;

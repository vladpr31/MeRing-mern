import * as API from "../../api/api";
import {
  CREATE_ROOM_SUCCESS,
  JOIN_ROOM_SUCCESS,
  SET_MESSAGE_NOTIFICATION,
} from "../typeDefs/typeDefs";

export const createChat = (patientID, doctorID) => async (dispatch) => {
  try {
    const response = await API.createNewChat(patientID, doctorID);
    dispatch({ type: CREATE_ROOM_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllUserChats = (userID, userRole) => async (dispatch) => {
  try {
    const response = await API.getAllUserChats(userID, userRole);
    dispatch({ type: JOIN_ROOM_SUCCESS, payload: response.data });
  } catch (err) {
    console.log(err.message);
  }
};
export const setMessageNotifications = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_MESSAGE_NOTIFICATION, payload: data });
  } catch (err) {
    console.log(err.message);
  }
};

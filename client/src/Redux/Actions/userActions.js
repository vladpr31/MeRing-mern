import {
  GET_USER,
  IS_LOADING,
  IS_DONE,
  REMOVE_APPOINTMENT_SUCCESS,
  ADD_APPOINTMENT_SUCCESS,
} from "../typeDefs/typeDefs";
import * as API from "../../api/api";

export const getUserData = (userID, role) => async (dispatch) => {
  dispatch({ type: IS_LOADING });
  if (role === "user") {
    const response = await API.getUserData(userID);
    if (response.data) {
      dispatch({ type: GET_USER, payload: response.data });
      dispatch({ type: IS_DONE });
    } else {
      console.log("Error in getUserData Action:", response);
    }
  }
  if (role === "doctor") {
    const response = await API.getDoctorById(userID);

    if (response.data) {
      dispatch({ type: GET_USER, payload: response.data });
      dispatch({ type: IS_DONE });
    } else {
      console.log("Error in getUserData Action:", response);
    }
  }
};
export const createPatientMedicalRecord =
  (userID, record) => async (dispatch) => {
    dispatch({ type: IS_LOADING });
    if (role === "user") {
      const response = await API.createPatientMedicalRecord(userID, record);
      if (response.data) {
        dispatch({ type: GET_USER, payload: response.data });
        dispatch({ type: IS_DONE });
      } else {
        console.log("Error in getUserData Action:", response);
      }
    }
  };
export const createNewAppointment =
  (appointmentId, userID, doctor) => async (dispatch) => {
    const response = await API.createAppointment(appointmentId, userID, doctor);
    if (response.data) {
      dispatch({ type: ADD_APPOINTMENT_SUCCESS, payload: response.data });
    } else {
      console.log("error happend:", response.data);
    }
  };

export const cancelAppointment =
  (appointmentId, userId) => async (dispatch) => {
    const response = await API.cancelAppointment(appointmentId, userId);
    if (response.data === "Appointment has been canceled") {
      dispatch({
        type: REMOVE_APPOINTMENT_SUCCESS,
        payload: appointmentId,
      });
    } else {
      console.log("error", response.data);
    }
  };
export const getPatientAppointments = (patientID) => async (dispatch) => {
  const response = await API.getPatientAppointments(patientID);
  if (response.data) {
    dispatch({ type: ADD_APPOINTMENT_SUCCESS, payload: response.data });
  } else {
    console.log("error", response);
  }
};

export const getDoctorAppointments = (doctorID) => async (dispatch) => {
  const response = await API.getDoctorAppointments(doctorID);
  if (response.data) {
    return response.data;
  } else {
    console.log("error:", response);
  }
};

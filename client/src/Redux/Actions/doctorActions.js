import {
  DOCTORS_LOADING,
  DOCTORS_LOADING_IS_DONE,
  SET_DOCTORS,
} from "../typeDefs/typeDefs";
import * as API from "../../api/api";

export const getDoctorsByCategory = (category) => async (dispatch) => {
  try {
    const doctors = await API.getDoctorsByCategory(category);
    if (doctors.data) {
      dispatch({ type: SET_DOCTORS, payload: doctors.data });
    }
  } catch (err) {
    console.log("error", err.message);
  }
};

export const getAllDoctors = () => async (dispatch) => {
  try {
    dispatch({ type: DOCTORS_LOADING });
    const response = await API.getAllDoctors();
    if (response.data) {
      dispatch({ type: SET_DOCTORS, payload: response.data });
      dispatch({ type: DOCTORS_LOADING_IS_DONE });
    } else {
      console.log("Wrong Response..", response);
    }
  } catch (err) {
    console.log("error", err.message);
  }
};

export const createNewDoctor = (doctorDetails) => async (dispatch) => {
  try {
    dispatch({ type: DOCTORS_LOADING });
    const response = await API.createNewDoctor(doctorDetails);
    if (response.data) {
      dispatch({ type: SET_DOCTORS, payload: response.data });
      dispatch({ type: DOCTORS_LOADING_IS_DONE });
    } else {
      return response;
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const updateDoctor = (doctorID, doctorDetails) => async (disptach) => {
  try {
    console.log(doctorID, doctorDetails);
    const response = await API.updateDoctor(doctorID, doctorDetails);
    if (response) {
      return "Doctor Updated.";
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const removeDoctor = (doctorID) => async (dispatch) => {
  try {
    dispatch({ type: DOCTORS_LOADING });
    const response = await API.removeDoctor(doctorID);
    if (response.data) {
      dispatch({ type: SET_DOCTORS, payload: response.data });
      dispatch({ type: DOCTORS_LOADING_IS_DONE });
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const createNewShift = (doctorID, role, shift) => async (dispatch) => {
  try {
    const newShift = await API.createNewShift(doctorID, role, shift);
    console.log("in shift action:", newShift);
    if (newShift.data && typeof newShift.data !== "string") {
      console.log("new shift created");
    } else {
      console.log(newShift.data);
      return newShift;
    }
  } catch (err) {
    console.log("error in createNewShift:", err);
  }
};

export const removeShift = (doctorID, shift) => async (dispatch) => {
  try {
    const response = await API.removeShift(doctorID, shift);
    console.log(response);
    if (response.data && typeof response.data !== "string") {
      console.log("Shift Removed.");
      return "Shift Removed";
    } else {
      console.log("error in dispatching deleteShift:", response);
      return "Shift Remove error";
    }
  } catch (err) {
    console.log("Error in dispatch deleteShift:", err.message);
  }
};

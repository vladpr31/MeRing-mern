import * as API from "../../api/api";
import {
  SET_CLINICS,
  LOADING_CLINICS,
  DONE_LOADING_CLINICS,
} from "../typeDefs/typeDefs";

export const getAllClinics = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING_CLINICS });
    const response = await API.getAllClinics();
    if (response.data) {
      dispatch({ type: SET_CLINICS, payload: response.data });
      dispatch({ type: DONE_LOADING_CLINICS });
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const createNewClinic = (clinic) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_CLINICS });
    const response = await API.createNewClinic(clinic);
    if (response.data) {
      dispatch({ type: SET_CLINICS, payload: response.data });
      dispatch({ type: DONE_LOADING_CLINICS });
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const updateClinic = (clinicID, updatedClinic) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_CLINICS });
    const response = await API.updateClinic(clinicID, updatedClinic);
    if (response.data) {
      dispatch({ type: SET_CLINICS, payload: response.data });
      dispatch({ type: DONE_LOADING_CLINICS });
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const removeClinic = (clinicID) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_CLINICS });
    const response = await API.removeClinic(clinicID);
    if (response.data) {
      dispatch({ type: SET_CLINICS, payload: response.data });
      dispatch({ type: DONE_LOADING_CLINICS });
    }
  } catch (err) {
    console.log(err.message);
  }
};

import {
  PATIENTS_LOADING,
  PATIENTS_LOADING_IS_DONE,
  SET_PATIENTS,
} from "../typeDefs/typeDefs";
import * as API from "../../api/api";

export const getAllPatients = () => async (dispatch) => {
  try {
    dispatch({ type: PATIENTS_LOADING });
    const response = await API.getAllPatients();
    console.log("response:", response);
    if (response.data) {
      dispatch({ type: SET_PATIENTS, payload: response.data });
      dispatch({ type: PATIENTS_LOADING_IS_DONE });
    } else {
      console.log("Wrong Response..", response);
    }
  } catch (err) {
    console.log("error", err.message);
  }
};

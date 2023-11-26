import { LOGIN, LOGOUT, REGISTER } from "../typeDefs/typeDefs";
import * as API from "../../api/api";

export const register = (info, location) => async (dispatch) => {
  const newUser = await API.register(info);
  if (
    newUser.data === "Email Already In Use" ||
    typeof newUser.data === "string"
  ) {
    return newUser.data;
  } else {
    dispatch({ type: REGISTER, payload: newUser.data });
    location(`/${newUser.data.role}/${newUser.data.id}`);
  }
};

export const registerWorker = (info) => async (dispatch) => {
  const newWorker = await API.registerWorker(info);
  if (newWorker.data === "Email Already In Use") {
    return newWorker.data;
  }
};
export const login = (credentials, location) => async (dispatch) => {
  const response = await API.login(credentials);
  if (response?.data) {
    dispatch({ type: LOGIN, payload: response.data });
    if (response.data.role !== "admin") {
      location(`/${response.data.role}/${response.data.id}`);
    } else {
      location("/admin");
    }
  } else {
    return { error: response };
  }
};

export const logout = (location) => (dispatch) => {
  if (!location) {
    window.location.href = "/";
    dispatch({ type: LOGOUT });
  } else {
    location("/");
    dispatch({ type: LOGOUT });
  }
};

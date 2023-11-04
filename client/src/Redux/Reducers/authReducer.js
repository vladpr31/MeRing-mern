import { LOGIN, LOGOUT, REFRESH_SESSION, REGISTER } from "../typeDefs/typeDefs";
const initialState = {
  auth: JSON.parse(localStorage.getItem("profile")) || null,
  socket: null,
};

const authReducer = (state, action) => {
  if (typeof state === "undefined") {
    return initialState;
  }
  switch (action.type) {
    case REGISTER:
    case LOGIN:
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return { ...state, auth: action.payload };
    case LOGOUT:
      localStorage.clear();
      return initialState;
    case REFRESH_SESSION:
      if (action?.payload?.access_token) {
        localStorage.removeItem("profile");
        localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
        return { ...state, auth: action.payload };
      } else {
        return state;
      }
    default:
      return state;
  }
};
export default authReducer;

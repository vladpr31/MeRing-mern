import {
  GET_USER,
  IS_LOADING,
  IS_DONE,
  REMOVE_APPOINTMENT_SUCCESS,
  ADD_APPOINTMENT_SUCCESS,
} from "../typeDefs/typeDefs";

const initialState = {
  user: {
    appointments: [],
  },
  isLoading: true,
};

const userReducer = (state, action) => {
  if (typeof state === "undefined") {
    return initialState;
  }
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    case IS_LOADING:
      return { ...state, isLoading: true };
    case IS_DONE:
      return { ...state, isLoading: false };
    case ADD_APPOINTMENT_SUCCESS:
      const addedAppointments = action.payload;
      return {
        ...state,
        user: {
          ...state.user,
          appointments: addedAppointments,
        },
      };
    case REMOVE_APPOINTMENT_SUCCESS:
      const removedAppointmentId = action.payload;
      const appointments = state.user.appointments.filter(
        (appointment) => appointment._id !== removedAppointmentId
      );
      return {
        ...state,
        user: {
          ...state.user,
          appointments: [...appointments],
        },
      };

    default:
      return state;
  }
};
export default userReducer;

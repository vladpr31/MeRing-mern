import {
  SET_DOCTORS,
  DOCTORS_LOADING_IS_DONE,
  DOCTORS_LOADING,
} from "../typeDefs/typeDefs";

const initialState = {
  doctors: [],
  isLoadingDoctors: true,
};

const doctorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DOCTORS:
      return { ...state, doctors: action.payload };
    case DOCTORS_LOADING:
      return { ...state, isLoadingDoctors: true };
    case DOCTORS_LOADING_IS_DONE:
      return { ...state, isLoadingDoctors: false };

    default:
      return state;
  }
};

export default doctorsReducer;

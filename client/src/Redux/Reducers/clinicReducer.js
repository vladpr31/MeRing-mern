import {
  SET_CLINICS,
  LOADING_CLINICS,
  DONE_LOADING_CLINICS,
} from "../typeDefs/typeDefs";

const initialState = {
  clinics: [],
  isLoading: true,
};

const clinicsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CLINICS:
      return { ...state, clinics: action.payload };
    case LOADING_CLINICS:
      return { ...state, isLoading: true };
    case DONE_LOADING_CLINICS:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default clinicsReducer;

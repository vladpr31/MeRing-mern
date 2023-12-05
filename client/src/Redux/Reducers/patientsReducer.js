import {
  SET_PATIENTS,
  PATIENTS_LOADING_IS_DONE,
  PATIENTS_LOADING,
} from "../typeDefs/typeDefs";

const initialState = {
  patients: [],
  isLoadingPatients: true,
};

const patientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PATIENTS:
      return { ...state, patients: action.payload };
    case PATIENTS_LOADING:
      return { ...state, isLoadingPatients: true };
    case PATIENTS_LOADING_IS_DONE:
      return { ...state, isLoadingPatients: false };

    default:
      return state;
  }
};

export default patientsReducer;

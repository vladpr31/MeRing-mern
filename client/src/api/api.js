import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const API = axios.create({ baseURL: BASE_URL });

//Axios Interceptor, before each call send Authorixation in the headers as {Key,Value}=>{bearer,token}
API.interceptors.request.use((req, res) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).accessToken
    }`;
  }
  return req;
});
API.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    console.log(err.response.data.message);
    if (err.response.data.message === "JWT REFRESH TOKEN EXPIRED") {
      window.location.href = "/";
      localStorage.clear();
    }
    return err.response.data.message;
  }
);

//user actions login\register

export const registerWorker = (info) => {
  return API.post("api/auth/register-worker", info);
};

export const register = (info) => {
  return API.post("api/auth/register", { info });
};
export const login = (userCredentials) => {
  return API.post("api/auth/login", userCredentials);
};

//data fetching
export const getDiseasesData = () => {
  return API.get("api/scrap/getAllDiseases");
};
export const getSpecialtiesData = () => {
  return API.get("api/scrap//getAllSpecialties");
};

//user data fetching & actions
export const getUserData = (userID) => {
  return API.get(`api/users/${userID}`);
};
export const getPatientAppointments = (patientID) => {
  return API.get(`api/appointments/${patientID}`);
};
export const createAppointment = (appointmentId, userID, doctor) => {
  return API.post(`api/appointments/new-appointment`, {
    appointmentId,
    userID,
    doctor,
  });
};
export const createReview = (review) => {
  return API.post(`api/review/newReview`, { review });
};
export const cancelAppointment = (appointmentId, userId) => {
  return API.delete(`api/appointments/${userId}/${appointmentId}`);
};

//doctors api calls.
export const getDoctorsByCategory = (category) => {
  return API.get(`api/doctors/getByCategory/${category}`);
};

export const getAllDoctors = () => {
  return API.get("api/doctors/getAll");
};

export const createNewDoctor = (doctorDetails) => {
  return API.post("api/doctors/newDoctor", doctorDetails);
};
export const updateDoctor = (doctorID, doctorDetails) => {
  return API.patch(`api/doctors/${doctorID}/update`, doctorDetails);
};
export const removeDoctor = (doctorID) => {
  return API.delete(`api/doctors/${doctorID}/remove`);
};
export const getDoctorById = (doctorID) => {
  return API.get(`api/doctors/authorized/${doctorID}`);
};
export const getDoctorAppointments = (doctorID) => {
  return API.get(`api/appointments/authorized/${doctorID}`);
};

//clinic api calls
export const getAllClinics = () => {
  return API.get("api/clinics/getAll");
};
export const createNewClinic = (clinic) => {
  return API.post("api/clinics/new", clinic);
};

export const updateClinic = (clinicID, updatedClinic) => {
  return API.patch(`api/clinics/${clinicID}/update`, updatedClinic);
};

export const removeClinic = (clinicID) => {
  return API.delete(`api/clinics/${clinicID}/remove`);
};

//chat api calls

export const createNewChat = (patientID, doctorID) => {
  return API.post("api/chat/newChat", { patientID, doctorID });
};

export const getExistingChat = (chatID, role) => {
  return API.get(`api/chat/${chatID}/${role}`);
};

export const getAllUserChats = (userID, userRole) => {
  return API.get(`api/chat/${userRole}/${userID}/getChats`);
};

//shifts api

export const createNewShift = (doctorID, role, shift) => {
  return API.post("api/shift/new-shift", { doctorID, role, shift });
};

export const removeShift = (doctorID, shiftID) => {
  return API.delete(`api/shift/${doctorID}/${shiftID}`);
};

// for development

export const createAdmin = () => {
  return API.get("api/admin/new-admin");
};

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
  return API.post("/auth/register-worker", info);
};

export const register = (info) => {
  return API.post("/auth/register", { info });
};
export const login = (userCredentials) => {
  console.log("in login api call");
  return API.post("/auth/login", userCredentials);
};

//data fetching
export const getDiseasesData = () => {
  return API.get("/scrap/getAllDiseases");
};
export const getSpecialtiesData = () => {
  return API.get("/scrap//getAllSpecialties");
};

//user data fetching & actions
export const getUserData = (userID) => {
  return API.get(`/users/${userID}`);
};
export const getPatientAppointments = (patientID) => {
  return API.get(`/appointments/${patientID}`);
};
export const createAppointment = (appointmentId, userID, doctor) => {
  return API.post(`/appointments/new-appointment`, {
    appointmentId,
    userID,
    doctor,
  });
};
export const cancelAppointment = (appointmentId, userId) => {
  return API.delete(`/appointments/${userId}/${appointmentId}`);
};

//doctors api calls.
export const getDoctorsByCategory = (category) => {
  return API.get(`/doctors/getByCategory/${category}`);
};

export const getAllDoctors = () => {
  return API.get("/doctors/getAll");
};

export const createNewDoctor = (doctorDetails) => {
  return API.post("/doctors/newDoctor", doctorDetails);
};
export const updateDoctor = (doctorID, doctorDetails) => {
  return API.patch(`/doctors/${doctorID}/update`, doctorDetails);
};
export const removeDoctor = (doctorID) => {
  return API.delete(`/doctors/${doctorID}/remove`);
};
export const getDoctorById = (doctorID) => {
  return API.get(`/doctors/authorized/${doctorID}`);
};
export const getDoctorAppointments = (doctorID) => {
  return API.get(`/appointments/authorized/${doctorID}`);
};

//clinic api calls
export const getAllClinics = () => {
  return API.get("/clinics/getAll");
};
export const createNewClinic = (clinic) => {
  return API.post("/clinics/new", clinic);
};

export const updateClinic = (clinicID, updatedClinic) => {
  return API.patch(`/clinics/${clinicID}/update`, updatedClinic);
};

export const removeClinic = (clinicID) => {
  return API.delete(`/clinics/${clinicID}/remove`);
};

//chat api calls

export const createNewChat = (patientID, doctorID) => {
  return API.post("/chat/newChat", { patientID, doctorID });
};

export const getExistingChat = (chatID, role) => {
  return API.get(`/chat/${chatID}/${role}`);
};

export const getAllUserChats = (userID, userRole) => {
  return API.get(`/chat/${userRole}/${userID}/getChats`);
};

//shifts api

export const createNewShift = (doctorID, role, shift) => {
  return API.post("/shift/new-shift", { doctorID, role, shift });
};

export const removeShift = (doctorID, shiftID) => {
  return API.delete(`/shift/${doctorID}/${shiftID}`);
};

// for development

export const createAdmin = () => {
  return API.get("/admin/new-admin");
};

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Components/Pages/UserPages/Homepage/Homepage";
import LoginPage from "./Components/Pages/UserPages/LoginPage/LoginPage";
import RegisterPage from "./Components/Pages/UserPages/RegisterPage/RegisterPage";
import UserInfo from "./Components/Pages/UserPages/UserPage/UserInfo";
import NewAppointment from "./Components/Pages/UserPages/NewAppointment/NewAppointment";
import AppointmentCategoryPage from "./Components/Pages/UserPages/NewAppointment/AppointmentCategoryPage";
import About from "./Components/Pages/UserPages/AboutPage/About";
import WorkerPage from "./Components/Pages/WorkerPages/WorkerPage/WorkerPage";
import AdminPage from "./Components/Pages/WorkerPages/AdminPage/AdminPage";
import ProtectedRoute from "./Components/Pages/UserPages/Protected/ProtectedRoutes";
import MessagesPage from "./Components/Pages/MessagesPage/MessagesPage";
import PatientAnalysis from "./Components/Pages/UserPages/PatientAnalysis/PatientAnalysis";
import MedicalRecords from "./Components/Pages/UserPages/MedicalRecordsPage/MedicalRecords";
import MyAppointments from "./Components/Pages/UserPages/MyAppointments/MyAppointments";
import EditProfile from "./Components/Pages/UserPages/EditProfile/EditProfile";
import CreateAdminPage from "./Components/Pages/WorkerPages/AdminPage/CreateAdminPage";
import WorkerShifts from "./Components/Pages/WorkerPages/WorkerPage/WorkerShifts";
import WorkerAppointments from "./Components/Pages/WorkerPages/WorkerPage/WorkerAppointments";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/user/:id"
          element={
            <ProtectedRoute>
              <UserInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/:role/:id/inbox"
          element={
            <ProtectedRoute>
              <MessagesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/:id/new-appointment/"
          element={<ProtectedRoute>{<NewAppointment />}</ProtectedRoute>}
        />
        <Route
          path="/user/:id/my-appointments/"
          element={<ProtectedRoute>{<MyAppointments />}</ProtectedRoute>}
        />
        <Route
          path="/user/:id/new-appointment/:doctorType"
          element={
            <ProtectedRoute>
              <AppointmentCategoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/:role/:id/analysis"
          element={<ProtectedRoute>{<PatientAnalysis />}</ProtectedRoute>}
        />
        <Route
          path="/:role/:id/records"
          element={<ProtectedRoute>{<MedicalRecords />}</ProtectedRoute>}
        />
        <Route
          path="/:role/:id/profile"
          element={<ProtectedRoute>{<EditProfile />}</ProtectedRoute>}
        />
        <Route
          path="/doctor/:id"
          element={
            <ProtectedRoute>
              <WorkerPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/create" element={<CreateAdminPage />} />
        <Route
          path="/doctor/:id/my-shifts"
          element={
            <ProtectedRoute>
              <WorkerShifts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/:id/my-appointments"
          element={
            <ProtectedRoute>
              <WorkerAppointments />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

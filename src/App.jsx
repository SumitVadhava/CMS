import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PatientDashboard from "./pages/PatientDashboard";

import BookAppointment from "./pages/BookAppointment";
import AdminDashboard from "./pages/AdminDashboard";
import ReceptionistDashboard from "./pages/ReceptionistDashboard";

import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";

import UserList from "./pages/UserList";

import AppointmentList from "./pages/AppointmentList";
import AppointmentDetails from "./pages/AppointmentDetails";
import ReportDetails from "./pages/ReportDetails";
import PrescriptionDetails from "./pages/PrescriptionDetails";
import TVDisplay from "./pages/TVDisplay";

import DoctorDashboard from "./pages/DoctorDashboard";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route
          path="/admin"
          element={ 
            <ProtectedRoute roles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={ 
            <ProtectedRoute roles={["admin"]}>
              <UserList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient"
          element={
            <ProtectedRoute roles={["patient"]}>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/book-appointment"
          element={
            <ProtectedRoute roles={["patient"]}>
              <BookAppointment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/appointments"
          element={
            <ProtectedRoute roles={["patient"]}>
              <AppointmentList />
            </ProtectedRoute>
          }
        />

         <Route
          path="/appointments/:id"

          element={
            <ProtectedRoute roles={["patient"]}>
              <AppointmentDetails />
            </ProtectedRoute>
          }
        />
        
         <Route
          path="/patient/prescriptions"
          element={
            <ProtectedRoute roles={["patient"]}>
              <PrescriptionDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/reports"
          element={
            <ProtectedRoute roles={["patient"]}>
              <ReportDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/receptionist"
          element={
            <ProtectedRoute roles={["receptionist"]}>
              <ReceptionistDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/receptionist/display" 
          element={
            <ProtectedRoute roles={["receptionist"]}>
              <TVDisplay />
            </ProtectedRoute>
          }      
        />

         <Route path="/doctor" 
          element={
            <ProtectedRoute roles={["doctor"]}>
              <DoctorDashboard />
            </ProtectedRoute>
          }      
        />
      </Routes>
    </BrowserRouter>
  );
}

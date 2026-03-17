import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../utils/axios";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);

  const fetchAppointments = async (date) => {
    setLoading(true);
    try {

      const response = await api.get("/doctor/queue/");

      setAppointments(response.data);

    } catch (error) {

      console.error("Error fetching appointments:", error);
     
      setAppointments([]);

    } 
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments(selectedDate);
  }, [selectedDate]);

  const handleStatusUpdate = async (id, status) => {
    try {
      
      await api.patch(`/appointments/${id}/status`, { status });
      
      fetchAppointments(selectedDate);
    } 
    catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar role="doctor" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-green-700 mb-6">Today's Queue</h1>
      

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-3 text-sm font-semibold text-gray-700">Token</th>
                  <th className="pb-3 text-sm font-semibold text-gray-700">Patient</th>
                  <th className="pb-3 text-sm font-semibold text-gray-700">Status</th>        
                  <th className="pb-3 text-sm font-semibold text-gray-700">Appointment ID</th>
                  <th className="pb-3 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                    <tr>
                        <td colSpan="6" className="py-8 text-center text-gray-500 text-sm">
                        Loading...
                        </td>
                    </tr>
                ) : appointments.length === 0 ? (
                    <tr>
                        <td colSpan="6" className="py-8 text-center text-gray-500 text-sm">
                        No appointments found for this date.
                        </td>
                    </tr>
                ) : (
                    appointments.map((app, index) => (
                    <tr key={app.id || index} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 text-sm text-gray-800">{app.tokenNumber || "—"}</td>
                        <td className="py-4 text-sm text-gray-600">{app.patientName || "—"}</td>
                         
                        <td className="py-4 text-sm">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium capitalize
                                ${app.status === 'waiting' ? 'bg-yellow-100 text-yellow-800' : 
                                  app.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 
                                  'bg-gray-100 text-gray-800'}`}>
                                {app.status || "—"}
                           
                                </span>
                        </td>
                        
                        <td className="py-4 text-sm text-gray-600">{app.appointmentId || "—"}</td>
                       
                        <td className="py-4 text-sm flex gap-2">
                            
                          {app.status === 'in-progress'&&
                              <button 
                                className="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700 transition-colors"
                                onClick={() => handleStatusUpdate(app.id, 'done')}
                             >
                                Done
                             </button>
                            }
                           
                            <button 
                                className="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700 transition-colors"
                                onClick={() => navigate(`/doctor/add-prescription/${app.appointmentId}`)}
                             >
                                Add Medicine
                             </button>
                             
                             <button 
                                className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded hover:bg-gray-300 transition-colors"
                                onClick={() => navigate(`/doctor/add-report/${app.appointmentId}`)}
                             >
                                Add Report
                            
                                </button>                     
                        </td>
                    </tr>
                    ))
                )}

              </tbody>

            </table>

          </div>

        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;

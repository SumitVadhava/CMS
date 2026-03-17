import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../utils/axios";
import { useNavigate } from 'react-router-dom';


const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  const navigate = useNavigate();

  const fetchAppointments = async () => {
    try {
      const response = await api.get("/appointments/my");
      
      setAppointments(response.data);
    } 
    catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);


  return (
    <div className="min-h-screen bg-slate-50">
     
      <Navbar role="patient" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-green-700 mb-6">My Appointments</h1>
       
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 overflow-hidden">
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-3 text-sm font-semibold text-gray-700">Date</th>
                  <th className="pb-3 text-sm font-semibold text-gray-700">Time</th>
                  <th className="pb-3 text-sm font-semibold text-gray-700">Token</th>
                  <th className="pb-3 text-sm font-semibold text-gray-700">Status</th>
                  <th className="pb-3 text-sm font-semibold text-gray-700">Action</th>

                </tr>
              </thead>
              <tbody>
                
              {appointments.map((app, index) => (
                  <tr key={app.id || index} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 text-sm text-gray-800">{app.queueEntry.queueDate || "—"}</td>
                    <td className="py-4 text-sm text-gray-600">{app.timeSlot || "—"}</td>
                    <td className="py-4 text-sm">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-600 capitalize">
                        {app.queueEntry.tokenNumber || "—"}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-gray-600">{app.queueEntry.status || "—"}</td>
                    <td className="py-4 text-sm">
                      <button 
                      className="p-1 cursor-pointer bg-green-400 border border-green-400 text-white font-medium rounded-lg hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-70"
                      onClick={() => navigate(`/appointments/${app.id}`)}
                      >
                        Medicines & Report  
                      </button> 
                    </td>
                  </tr>
                ))}
                
                {appointments.length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-gray-500 text-sm">
                      No appointments found.
                    </td>
                  </tr>
                )}
              </tbody>
            
              </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AppointmentList;
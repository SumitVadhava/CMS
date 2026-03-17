import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../utils/axios";

const ReportDetails = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [appointment, setAppointment] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const response = await api.get("/reports/my");

        setAppointment(response.data);

      } 
      catch (error) {
        console.error("Error fetching appointment details:", error);
      }
       finally {
        setLoading(false);
      }
    };

    fetchAppointmentDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar role="patient" />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <p className="text-gray-500">Loading report details...</p>
        </div>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar role="patient" />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <p className="text-red-500">Report details not found.</p>
          
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar role="patient" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <h1 className="text-2xl font-bold text-emerald-600 mb-4">Report Details</h1>

        <button
          onClick={() => navigate(-1)}
          className="mb-8  cursor-pointer inline-flex items-center px-4 py-2 bg-gray-200/60 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300/60 transition-colors"
        >
          Back
        </button>

        <div className="space-y-6 mt-4">

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Medical Report</h2>
            
            {appointment?.report ? (
              <p className="text-sm text-gray-600">{appointment.report}</p>
            ) 
            : (
              <p className="text-sm text-gray-500">No report added for this appointment yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetails;
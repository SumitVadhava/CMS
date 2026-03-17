import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../utils/axios";

const AddReport = () => {
  const { appointmentId: paramAppointmentId } = useParams();
  const navigate = useNavigate();
  const [appointmentId, setAppointmentId] = useState(paramAppointmentId || "");
  const [diagnosis, setDiagnosis] = useState("");
  const [testRecommended, setTestRecommended] = useState("");
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (paramAppointmentId) {
      setAppointmentId(paramAppointmentId);
    }
  }, [paramAppointmentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!appointmentId) {
      alert("Please enter or select an Appointment ID");
      return;
    }

    setLoading(true);
    try {
      await api.post(`/reports/${appointmentId}`, {
        diagnosis,
        testRecommended,
        remarks,
      });
      alert("Medical report saved successfully!");
      navigate("/doctor");
    } catch (error) {
      console.error("Error saving report:", error);
      alert("Failed to save report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar role="doctor" />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-green-700 mb-6">Add Medical Report</h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Appointment ID
              </label>
              <input
                type="text"
                value={appointmentId}
                onChange={(e) => setAppointmentId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter Appointment ID"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Diagnosis *
              </label>
              <input
                type="text"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="e.g. Viral Fever"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Test recommended (optional)
              </label>
              <input
                type="text"
                value={testRecommended}
                onChange={(e) => setTestRecommended(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="e.g. Blood Test"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Remarks (optional)
              </label>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="e.g. Rest for 3 days"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition-all disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Report"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReport;

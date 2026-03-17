import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../utils/axios";

const AddPrescription = () => {
  const { appointmentId: paramAppointmentId } = useParams();
  const navigate = useNavigate();

  const [appointmentId, setAppointmentId] = useState(paramAppointmentId || "");
  
  const [medicines, setMedicines] = useState([{ name: "", dosage: "", duration: "" }]);
  
  const [notes, setNotes] = useState("");
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (paramAppointmentId) {
      setAppointmentId(paramAppointmentId);
    }
  }, [paramAppointmentId]);

  const handleAddMedicine = () => {
    setMedicines([...medicines, { name: "", dosage: "", duration: "" }]);
  };

  const handleRemoveMedicine = (index) => {
    const newMedicines = medicines.filter((_, i) => i !== index);
    setMedicines(newMedicines);
  };

  const handleMedicineChange = (index, field, value) => {
    const newMedicines = [...medicines];
    newMedicines[index][field] = value;
    setMedicines(newMedicines);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!appointmentId) {
      alert("Please enter or select an Appointment ID");
      return;
    }

    setLoading(true);
    try {
      await api.post(`/prescriptions/${appointmentId}`, {
        medicines,
        notes,
      });
      alert("Prescription saved successfully!");
      navigate("/doctor");
    } catch (error) {
      console.error("Error saving prescription:", error);
      alert("Failed to save prescription. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar role="doctor" />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-green-700 mb-6">Add Prescription</h1>

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
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Medicines</h2>
              <div className="space-y-4">
                {medicines.map((med, index) => (
                  <div key={index} className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg relative">
                    <div className="flex-1 min-w-[200px]">
                      <label className="block text-xs font-medium text-gray-500 mb-1">Name</label>
                      <input
                        type="text"
                        value={med.name}
                        onChange={(e) => handleMedicineChange(index, "name", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="e.g. Paracetamol"
                        required
                      />
                    </div>
                    <div className="w-32">
                      <label className="block text-xs font-medium text-gray-500 mb-1">Dosage</label>
                      <input
                        type="text"
                        value={med.dosage}
                        onChange={(e) => handleMedicineChange(index, "dosage", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="e.g. 500mg"
                        required
                      />
                    </div>
                    <div className="w-32">
                      <label className="block text-xs font-medium text-gray-500 mb-1">Duration</label>
                      <input
                        type="text"
                        value={med.duration}
                        onChange={(e) => handleMedicineChange(index, "duration", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="e.g. 5 days"
                        required
                      />
                    </div>
                    {medicines.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMedicine(index)}
                        className="self-end px-3 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={handleAddMedicine}
                className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                Add medicine
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="e.g. After food"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition-all disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Prescription"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPrescription;

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../utils/axios";

const BookAppointment = () => {
  const [date, setDate] = useState("2026-03-16");
 
  const [timeSlot, setTimeSlot] = useState("15:45-16:00");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    
    try {
      console.log(date, timeSlot);
      
      await api.post("/appointments", { 
        appointmentDate : date, 
        timeSlot: timeSlot 
      });

      alert("Appointment booked successfully!");
    } 
    catch (error) {
      console.error("Error booking appointment:", error);
     
      alert("Failed to book appointment.");
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar role="patient" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-green-700 mb-6 font-sans">Book Appointment</h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          
        <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Date</label>
             
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5c4b]/50 focus:border-[#0f5c4b] transition-colors"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Time slot</label>
              
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-[#0f5c4b]/50 focus:border-[#0f5c4b] transition-colors"
                required
              >
                <option value="09:00-09:15">09:00-09:15</option>
                <option value="09:15-09:30">09:15-09:30</option>
                <option value="09:30-09:45">09:30-09:45</option>
                <option value="09:45-10:00">09:45-10:00</option>

                <option value="10:00-10:15">10:00-10:15</option>
                <option value="10:15-10:30">10:15-10:30</option>
                <option value="10:30-10:45">10:30-10:45</option>
                <option value="10:45-11:00">10:45-11:00</option>
                <option value="10:45-11:00">10:45-11:00</option>

                <option value="11:00-11:15">11:00-11:15</option>
                <option value="11:15-11:30">11:15-11:30</option>
                <option value="11:30-11:45">11:30-11:45</option>
                <option value="11:45-12:00">11:45-12:00</option>

                <option value="14:00-14:15">14:00-14:15</option>
                <option value="14:15-14:30">14:15-14:30</option>
                <option value="14:30-14:45">14:30-14:45</option>
                <option value="14:45-15:00">14:45-15:00</option>

                <option value="15:00-15:15">15:00-15:15</option>
                <option value="15:15-15:30">15:15-15:30</option>
                <option value="15:30-15:45">15:30-15:45</option>
                <option value="15:45-16:00">15:45-16:00</option>
                <option value="16:00-16:15">16:00-16:15</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-70"
            >
              {loading ? "Booking..." : "Book"}
            </button>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;

import React, { useState, useEffect } from "react";
import api from "../utils/axios";
import Navbar from "../components/Navbar";


const TVDisplay = () => {
    const [appointments, setAppointments] = useState([]);
    
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    
    const [loading, setLoading] = useState(false);

    const fetchAppointments = async (date) => {
        setLoading(true);
        try {
            const response = await api.get(`/queue/?date=${date}`);

            const activeQueue = response.data.filter(app => {
                const status = app.status || app.queueEntry?.status;
                return status === 'waiting' || status === 'in_progress';
            });
            setAppointments(activeQueue);
        } 
        catch (error) {
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

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar role="receptionist" />
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            <h1 className="text-3xl font-bold text-[#0f5c4b] mb-10">TV display</h1>
            
            <div className="max-w-4xl bg-white rounded-2xl shadow-md border border-gray-100 p-10">
                <div className="flex items-center gap-6 mb-12">
                    <span className="text-xl font-medium text-gray-600">Date</span>
                    <input 
                        type="date" 
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="px-5 py-3 border border-gray-200 rounded-xl text-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#0f5c4b]/20 focus:border-[#0f5c4b] transition-all"
                    />
                </div>

                <div className="space-y-6">
                    {loading && appointments.length === 0 ? (
                        <div className="text-2xl text-gray-400 animate-pulse">Loading queue...</div>
                    ) : appointments.length === 0 ? (
                        <div className="text-2xl text-gray-400">No active requests in queue</div>
                    ) : (
                        appointments.map((app, index) => (
                            <div key={app.id || index} className="flex items-center gap-8 py-2">
                                <div className="w-14 h-14 bg-[#0f5c4b] text-white rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg shadow-[#0f5c4b]/20">
                                    {app.tokenNumber || index + 1}
                                </div>
                                <div className="text-3xl font-semibold text-gray-700 capitalize">
                                    {app.appointment.patient.name.toLowerCase()}
                                </div>
                                { (app.status === 'in-progress' || app.queueEntry?.status === 'in-progress') && (
                                    <div className="ml-auto bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-lg font-bold animate-pulse">
                                        In Clinic
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
            </div>
          
        </div>
    );
};

export default TVDisplay;
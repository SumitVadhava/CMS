import React, { useEffect, useState } from 'react';
import { Hospital, User2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const PatientDashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar role="patient" />
      <div className="flex-1 p-8 bg-slate-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          
        <div className="">
            <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-emerald-50 p-2.5 rounded-lg">
                  <User2 className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Patient Dashboard
                </h3>
              </div>
              <div className="space-y-3.5 text-gray-700 text-sm">
                <p className='text-gray-600'>
                  Welcome!
                </p>
                
                <p className='text-gray-600 font-semibold'>
                  use the to book an appointrnent, view reports.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button className='bg-green-600 text-white hover:bg-green-700' onClick={() => navigate('/patient/book-appointment')}>Book an appointment</Button>
                  
                  <Button className='bg-green-600 text-white hover:bg-green-700' onClick={() => navigate('/patient/appointments')}>My Appointments</Button>
                  
                  <Button className='bg-green-600 text-white hover:bg-green-700' onClick={() => navigate('/patient/prescriptions')}>Prescriptions </Button>
                  
                  <Button className='bg-green-600 text-white hover:bg-green-700' onClick={() => navigate('/patient/reports')}>My Reports</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;
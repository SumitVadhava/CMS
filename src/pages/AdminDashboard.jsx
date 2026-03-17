import React, { useEffect, useState } from 'react';
import { Hospital } from 'lucide-react';
import api from '../utils/axios';
import Navbar from '../components/Navbar';

const AdminDashboard = () => {
  const [clinic, setClinic] = useState(null);

  const [users, setUsers] = useState([]);

  const getClinic = async () => {

    const response = await api.get("/admin/clinic");

    const usersData = await api.get("/admin/users");

    setClinic(response.data);

    setUsers(usersData.data);
  };
  useEffect(() => {
    (async () => {

      await getClinic();

    })();
  }, []);

  return (
    <div>
      <Navbar role="admin" />
      <div className="flex-1 p-8 bg-slate-50 min-h-screen">

        <div className="max-w-4xl mx-auto">
          <div className="">

            <div className="bg-white rounded-xl shadow p-6 border border-gray-100">

              <div className="flex items-center gap-3 mb-5">
                <div className="bg-emerald-50 p-2.5 rounded-lg">

                  <Hospital className="w-5 h-5 text-emerald-600" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900">
                  My Clinic
                </h3>
              </div>

              <div className="space-y-3.5 text-gray-700 text-sm">

                <p className='text-gray-600'>
                  Welcome to your clinic dashboard !
                </p>

                <p className='text-gray-600 font-semibold'>
                  Clinic Name: {clinic?.name || 'N/A'}
                </p>

                <p className='text-gray-600 font-semibold'>
                  Clinic Code: {clinic?.code || 'N/A'}
                </p>
                
                <p className='text-gray-600 font-semibold'>
                  Users: {users.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
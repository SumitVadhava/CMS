import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../utils/axios";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
    phone: "",

  });

  const fetchUsers = async () => {
    try {
      const response = await api.get("/admin/users");
      
      setUsers(response.data);
    } 
    catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {     
      await api.post("/admin/users", formData);

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "patient",
        phone: "",
      });

      fetchUsers();
    } 
    catch (error) {
      console.error("Error adding user:", error);
    } 
    
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
     
      <Navbar role="admin" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-green-700 mb-6">Clinic Users</h1>
       
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Add receptionist, doctor, or patient</h2>
          
          <p className="text-sm text-gray-500 mb-6">
            Create a user in your clinic. They will sign in with the email and password you set (no registration).
          </p>

          <form onSubmit={handleSubmit}>
           
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-6">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="At least 3 characters"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5c4b]/50 focus:border-[#0f5c4b] transition-colors"
                  required
                  minLength={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5c4b]/50 focus:border-[#0f5c4b] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min 6 characters"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5c4b]/50 focus:border-[#0f5c4b] transition-colors"
                  required
                  minLength={6}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5c4b]/50 focus:border-[#0f5c4b] transition-colors appearance-none bg-white"
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                    <option value="receptionist">Receptionist</option>
                  
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
                  
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5c4b]/50 focus:border-[#0f5c4b] transition-colors"
                  />
                </div>
              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-green-400 text-white font-medium rounded-lg hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#127763] disabled:opacity-70"
            >
              {loading ? "Adding..." : "Add user"}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 overflow-hidden">
          
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Users in this clinic</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-3 text-sm font-semibold text-gray-700">Name</th>
                  <th className="pb-3 text-sm font-semibold text-gray-700">Email</th>
                  <th className="pb-3 text-sm font-semibold text-gray-700">Role</th>
                  <th className="pb-3 text-sm font-semibold text-gray-700">Phone</th>
                </tr>
              </thead>
              <tbody>
                
              {users.map((user, index) => (
                  <tr key={user._id || index} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 text-sm text-gray-800">{user.name || "—"}</td>
                    <td className="py-4 text-sm text-gray-600">{user.email || "—"}</td>
                    <td className="py-4 text-sm">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-600 capitalize">
                        {user.role || "—"}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-gray-600">{user.phone || "—"}</td>
                  </tr>
                ))}
                
                {users.length === 0 && (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-gray-500 text-sm">
                      No users found in this clinic.
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

export default UserList;
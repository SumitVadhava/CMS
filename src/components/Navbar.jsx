import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X, LogOut, Activity } from "lucide-react";

const Navbar = ({ role }) => {
    
    const { user, logout } = useAuth();
    
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();


    const originalNavLinks = {
        admin: [
            { label: "My Clinic", href: "/admin" },
            { label: "Users", href: "/admin/users" },
        ],
        patient: [
            { label: "Dashboard", href: "/patient" },
            { label: "Book Appointment", href: "/patient/book-appointment" },
            { label: "My Appointment", href: "/patient/appointments" },
            { label: "Prescriptions", href: "/patient/prescriptions"},
            { label : "My reports" , href: "/patient/reports"}
        ],
        doctor: [
            { label: "Today's Queue", href: "/doctor" },
            { label: "Add Prescription", href: "/doctor/add-prescription" },
            { label: "Add Report", href: "/doctor/add-report" },
        ],
        receptionist: [
            { label: "Queue(manage)", href: "/receptionist" },
            { label: "TV Display", href: "/receptionist/display" },
        ],
    };

    const isLoggedIn = !!user;
    const userRole = isLoggedIn ? user?.role : role;
    
    const currentLinks = originalNavLinks[userRole] || [];

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 md:h-20">
                    <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
                        <span className="font-bold text-xl md:text-2xl bg-gradient-to-r from-green-600 to-green-600 bg-clip-text text-transparent">
                            CMS
                        </span>
                    </div>

                    <nav className="hidden md:flex items-center gap-1 lg:gap-2">
                        {currentLinks.map((link) => (
                            <Link
                                key={link.href}
                                to={link.href}
                                className="px-3 py-2 rounded-lg font-medium text-gray-600 hover:text-green-600 hover:bg-indigo-50 transition-all duration-200"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center gap-4">
                        {isLoggedIn ? (
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col items-end border rounded border-blue-800 p-1">
                                    <span className="text-xs  text-indigo-600 font-medium capitalize">{userRole}</span>
                                </div>
                                <button 
                                    onClick={() => navigate("/")}
                                    className="flex items-center gap-2 px-4 py-2 bg-transparent text-white rounded-xl  hover:shadow-lg transition-all duration-300 active:scale-95"
                                >
                                    <LogOut size={18} />
                                    <span className="font-medium">Logout</span>
                                </button>
                            </div>
                        ) : (
                            <button 
                                onClick={() => navigate("/")}
                                className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 transition-all duration-300 font-medium"
                            >
                                Login
                            </button>
                        )}
                    </div>

                    <div className="md:hidden flex items-center">
                        <button 
                            onClick={toggleMenu}
                            className="p-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none transition-colors"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            <div 
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-b border-gray-100 ${
                    isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <div className="px-4 pt-2 pb-4 space-y-1 sm:px-3 flex flex-col shadow-inner">
                    {currentLinks.map((link) => (
                        <Link
                            key={link.href}
                            to={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-3 py-3 rounded-lg font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                    
                    <div className="pt-4 mt-2 border-t border-gray-100">
                        {isLoggedIn ? (
                            <div className="flex flex-col gap-3">
                                <div className="px-3 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                                        {(user?.name || user?.email || "U")[0].toUpperCase()}
                                    </div>
                                    <div>
                                        <div className="text-xs font-medium text-indigo-600 capitalize">{userRole}</div>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        handleLogout();
                                    }}
                                    className="flex  cursor-pointer w-full items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors"
                                >
                                    <LogOut size={18} />
                                    <span className="font-medium ">Logout</span>
                                </button>
                            </div>
                        ) : (
                            <button 
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    navigate("/");
                                }}
                                className="w-full px-4 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium text-center"
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;

import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const Logout = async () => {
        try {
            await axios.delete('http://localhost:5000/logout', {
                withCredentials: true
            });
            // Setelah logout, kita redirect ke halaman login
            navigate("/", { replace: true });
        } catch (error) {
            console.log("Logout failed:", error);
        }
    }

    return (
        <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">M</div>
                <span className="text-xl font-bold tracking-tight text-slate-800">MYFADH <span className="text-blue-600">ADMIN</span></span>
            </div>
            <button 
                onClick={Logout}
                className="bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-4 py-2 rounded-lg transition-all duration-200 border border-red-100"
            >
                Log Out
            </button>
        </nav>
    );
}

export default Navbar;
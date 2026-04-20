import React from 'react';
import Navbar from '../components/Navbar';

const Admin = () => {
    return (
        <div className="min-h-screen bg-slate-100">
            <Navbar />
            <div className="p-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border-l-8 border-purple-500">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">Halaman Rahasia Admin</h1>
                    <p className="text-slate-600 italic">Hanya user dengan role "admin" yang bisa melihat ini.</p>
                </div>
            </div>
        </div>
    );
}

export default Admin;
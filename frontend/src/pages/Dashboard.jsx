import React from "react";
import Navbar from "../components/Navbar";

// Dashboard sekarang menerima data 'user' dan 'token' dari App.js lewat props
const Dashboard = ({ user, token }) => {
  
  // Karena data user sudah dicek di App.js, kita tinggal pakai
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <div className="p-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Selamat Datang, <span className="text-blue-600">{user?.name}</span>!
          </h1>
          
          <p className="text-slate-500 mb-6 font-medium">
            Role kamu saat ini adalah:
            <span
              className={`ml-2 px-3 py-1 rounded-full text-sm ${
                user?.role === "admin" 
                ? "bg-purple-100 text-purple-700" 
                : "bg-green-100 text-green-700"
              }`}
            >
              {user?.role}
            </span>
          </p>

          <div className="border-t pt-6">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Informasi Sesi Keamanan
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-xs text-slate-400 mb-1">
                  Access Token (In-Memory)
                </p>
                {/* Token ini dikirim dari App.js */}
                <p className="text-xs font-mono break-all text-slate-600">
                  {token || "Token tidak ditemukan"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
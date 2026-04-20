import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

// Dashboard sekarang menerima data 'user' dan 'token' dari App.js lewat props
const Dashboard = ({ user, token }) => {
  // Karena data user sudah dicek di App.js, kita tinggal pakai

  const navigate = useNavigate();

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

          {/* Munculkan tombol ini hanya jika user adalah admin */}
          {user?.role === "admin" && (
            <div className="mt-6">
              <button
                onClick={() => navigate("/admin")}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 rounded-xl transition shadow-lg"
              >
                Buka Panel Kontrol Admin
              </button>
            </div>
          )}

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

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-xs text-blue-400 mb-1">Token Expires At</p>

              <p className="text-sm font-semibold text-blue-700">
                {new Date(user?.expire * 1000).toLocaleString("id-ID", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

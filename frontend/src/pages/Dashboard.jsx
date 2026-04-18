import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const refreshToken = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/token", {
        withCredentials: true,
      });

      // Simpan token ke variabel lokal dulu sebelum update state
      const newToken = response.data.accessToken;
      const decoded = jwtDecode(newToken);

      // Update state secara berkelompok
      setToken(newToken);
      setName(decoded.username);
      setRole(decoded.role);
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  }, [navigate]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        // Panggil fungsi refreshToken kita
        await refreshToken();
      } catch (error) {
        // Error sudah ditangani di dalam refreshToken (navigate ke "/")
        console.error("Authentication failed", error);
      }
    };

    if (isMounted) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [refreshToken]); //

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <div className="p-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Selamat Datang, <span className="text-blue-600">{name}</span>!
          </h1>
          <p className="text-slate-500 mb-6 font-medium">
            Role kamu saat ini adalah:
            <span
              className={`ml-2 px-3 py-1 rounded-full text-sm ${role === "admin" ? "bg-purple-100 text-purple-700" : "bg-green-100 text-green-700"}`}
            >
              {role}
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
                <p className="text-xs font-mono break-all text-slate-600">
                  {token}
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

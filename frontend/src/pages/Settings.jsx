import React, { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios"; // Gunakan axios biasa dulu untuk tes
import { User, Mail, Lock, Save } from "lucide-react";

const Settings = ({ user }) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState("");

  const updateProfile = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      // 1. Ambil token terbaru dari endpoint refresh token
      const resToken = await axios.get('http://localhost:5000/token', {
        withCredentials: true
      });
      const newToken = resToken.data.accessToken;

      // 2. Kirim PATCH dengan header manual
      const response = await axios.patch(
        "http://localhost:5000/me",
        { name, email, password, confPassword },
        {
          headers: {
            Authorization: `Bearer ${newToken}`
          },
          withCredentials: true
        }
      );

      alert(response.data.msg);
      window.location.reload();
    } catch (error) {
      if (error.response) {
        // Jika error 401 di sini, berarti session di backend memang sudah mati
        setMsg(error.response.data.msg || "Sesi habis, silakan login ulang.");
      } else {
        setMsg("Terjadi kesalahan koneksi.");
      }
    }
  };
  return (
    <Layout user={user}>
      <div className="max-w-2xl mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Pengaturan Akun</h1>
          <p className="text-slate-500 text-sm">Kelola informasi profil kamu di sini.</p>
        </div>

        <form onSubmit={updateProfile} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
          {msg && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
              {msg}
            </div>
          )}

          <div className="grid gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Nama</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 text-slate-400" size={18} />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 text-slate-400" size={18} />
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <hr className="my-2 border-slate-100" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Password Baru</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 text-slate-400" size={18} />
                  <input
                    type="password"
                    className="w-full pl-10 pr-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Konfirmasi</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 text-slate-400" size={18} />
                  <input
                    type="password"
                    className="w-full pl-10 pr-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="••••••••"
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md shadow-blue-100"
          >
            <Save size={18} />
            Simpan Perubahan
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Settings;
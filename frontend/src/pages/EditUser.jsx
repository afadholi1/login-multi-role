import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
// import Navbar from "../components/Navbar";

const EditUser = ({ token }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // Ambil ID/UUID dari URL

  // Ambil data user lama berdasarkan ID
  const getUserById = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setName(response.data.name);
      setEmail(response.data.email);
      setRole(response.data.role);
    } catch (error) {
      if (error.response) setMsg(error.response.data.msg);
    }
  }, [id, token]);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        await getUserById();
      }
    };

    fetchData();
  }, [getUserById, token]);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:5000/users/${id}`,
        {
          name,
          email,
          password,
          confPassword,
          role,
        },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      navigate("/admin");
    } catch (error) {
      if (error.response) {
        // Jika 403, coba cek apakah msg dari backend menjelaskan alasannya
        setMsg(error.response.data.msg || "Akses ditolak (403)");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* <Navbar user={currentUser} /> */}
      <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Edit User</h1>

        {msg && (
          <p className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm border border-red-100">
            {msg}
          </p>
        )}

        <form onSubmit={updateUser} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Password Baru (Opsional)
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Isi jika ingin ganti"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Konfirmasi Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
                placeholder="Ulangi password baru"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Role
            </label>
            <select
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white font-medium"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-all cursor-pointer shadow-sm"
            >
              Update User
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold py-2 rounded-lg transition-all cursor-pointer"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;

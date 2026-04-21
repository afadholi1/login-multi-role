import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";

const AddUser = ({ token }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("user");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        name, email, password, confPassword, role
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate("/admin"); // Balik ke tabel admin setelah sukses
    } catch (error) {
      if (error.response) setMsg(error.response.data.msg);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-10">
      {/* <Navbar user={user} /> */}
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Tambah User Baru</h1>
        
        {msg && <p className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm border border-red-100">{msg}</p>}

        <form onSubmit={saveUser} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
            <input type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
              value={name} onChange={(e) => setName(e.target.value)} placeholder="Contoh: Fadholi" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input type="email" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@gmail.com" required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input type="password" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                value={password} onChange={(e) => setPassword(e.target.value)} placeholder="******" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Konfirmasi Password</label>
              <input type="password" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                value={confPassword} onChange={(e) => setConfPassword(e.target.value)} placeholder="******" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
            <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white" 
              value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all cursor-pointer">Simpan User</button>
            <button type="button" onClick={() => navigate("/admin")} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold py-2 rounded-lg transition-all cursor-pointer">Batal</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
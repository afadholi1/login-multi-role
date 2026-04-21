import React, { useState, useEffect, useCallback } from "react";
// import Navbar from "../components/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

const Admin = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [msg, setMsg] = useState("");

  const getUsers = useCallback(async () => {
    if (!token) return; // Jangan panggil jika token belum ada

    try {
      const response = await axios.get("http://localhost:5000/users", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      if (error.response) {
        setMsg(
          "Gagal mengambil data: " + (error.response.data.msg || error.message),
        );
      }
    }
  }, [token]); // Fungsi ini hanya berubah jika token berubah

  useEffect(() => {
    const fetchData = async () => {
      // Pastikan kita tidak menembak API kalau token sedang kosong/expired
      if (token) {
        await getUsers();
      }
    };

    fetchData();
  }, [getUsers, token]); // Tambahkan 'token' di sini

  const deleteUser = async (uuid) => {
    if (window.confirm("Yakin ingin menghapus?")) {
      try {
        await axios.delete(`http://localhost:5000/users/${uuid}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`, // Tambahkan ini agar tidak 401
          },
        });
        getUsers(); // Refresh tabel
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* <Navbar /> */}
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-slate-800 mb-6">
            Manajemen User (Admin Only)
          </h1>

          {msg && <p className="text-red-500 mb-4">{msg}</p>}

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-slate-800">
              Daftar Pengguna
            </h1>
            <Link
              to="/admin/add"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-sm"
            >
              + Tambah User
            </Link>
          </div>

          <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-slate-200">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-4 font-semibold text-slate-600">No</th>
                  <th className="p-4 font-semibold text-slate-600">Nama</th>
                  <th className="p-4 font-semibold text-slate-600">Email</th>
                  <th className="p-4 font-semibold text-slate-600">Role</th>
                  <th className="p-4 font-semibold text-slate-600 text-center">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user.uuid}
                    className="border-b border-slate-100 hover:bg-slate-50 transition"
                  >
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4 font-medium text-slate-700">
                      {user.name}
                    </td>
                    <td className="p-4 text-slate-600">{user.email}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${user.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <Link
                        to={`/admin/edit/${user.uuid}`}
                        className="bg-blue-50 text-blue-600 px-3 py-1 rounded-md text-sm font-semibold hover:bg-blue-500 hover:text-white transition-all duration-200 border border-blue-100"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteUser(user.uuid)}
                        className="bg-red-50 text-red-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-red-600 hover:text-white transition-all duration-200 cursor-pointer"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

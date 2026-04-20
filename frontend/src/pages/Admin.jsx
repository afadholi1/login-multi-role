import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [msg, setMsg] = useState("");

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users", {
        withCredentials: true,
      });
      setUsers(response.data);
    } catch (error) {
      if (error.response) {
        setMsg("Gagal mengambil data: " + error.response.data.msg);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUsers();
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-slate-800 mb-6">
            Manajemen User (Admin Only)
          </h1>

          {msg && <p className="text-red-500 mb-4">{msg}</p>}

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
                    key={user.id}
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
                      <button className="text-blue-600 hover:underline mr-3 text-sm font-semibold">
                        Edit
                      </button>
                      <button className="text-red-600 hover:underline text-sm font-semibold">
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

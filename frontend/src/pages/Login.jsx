import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const Auth = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        },
      );
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        // Ini error dari backend (misal: password salah)
        setMsg(error.response.data.msg);
      } else {
        // Ini error jaringan (misal: backend belum nyala)
        setMsg("Server tidak merespon. Pastikan Backend menyala di port 5000");
        console.log(error);
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold text-center text-slate-800 mb-6">
          Login Admin Panel
        </h1>

        {msg && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
            {msg}
          </div>
        )}

        <form onSubmit={Auth}>
          <div className="mb-4">
            <label className="block text-slate-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-slate-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200">
            Masuk Sekarang
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;

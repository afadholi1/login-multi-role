import React from "react";
import Layout from "../components/Layout";
import { Users, ShieldCheck, Clock } from "lucide-react";

const Dashboard = ({ user }) => {
  return (
    <Layout user={user}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500">
          Selamat datang kembali,{" "}
          <span className="font-semibold text-blue-600">{user?.name}</span>!
        </p>
      </div>

      {/* Grid Kartu Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Kartu 1: Status Login */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
            <ShieldCheck size={28} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Status Akun</p>
            <p className="text-xl font-bold text-slate-800 uppercase">
              {user?.role}
            </p>
          </div>
        </div>

        {/* Kartu 2: Info (Placeholder untuk total user) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
            <Users size={28} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Manajemen</p>
            <p className="text-xl font-bold text-slate-800">User Akses</p>
          </div>
        </div>

        {/* Kartu 3: Waktu Login (Opsional) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
            <Clock size={28} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Sesi Berakhir</p>
            <p className="text-sm font-bold text-slate-800">
              {new Date(user?.expire * 1000).toLocaleString("id-ID", {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Welcome Banner */}
      <div className="mt-8 p-8 bg-blue-600 rounded-3xl text-white relative overflow-hidden shadow-lg">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Halo, {user?.role}!</h2>
          <p className="text-blue-100 max-w-md">
            Gunakan Sidebar di sebelah kiri untuk menavigasi aplikasi. Kamu bisa
            mengelola user atau mengubah pengaturan profil.
          </p>
        </div>
        {/* Dekorasi lingkaran di background */}
        <div className="absolute top-5 right-5 w-40 h-40 bg-blue-500 rounded-full opacity-50"></div>
      </div>
    </Layout>
  );
};

export default Dashboard;

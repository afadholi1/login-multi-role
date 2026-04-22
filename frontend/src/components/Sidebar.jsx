import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Settings, LogOut } from "lucide-react"; // Install dulu: npm install lucide-react

const Sidebar = ({ user, logout }) => {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
      role: "all",
    },
    {
      name: "Admin Panel",
      path: "/admin",
      icon: <Users size={20} />,
      role: "admin",
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings size={20} />,
      role: "all",
    },
  ];

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 bg-white border-r border-slate-200 p-4 hidden md:flex flex-col">
      <div className="flex-1 space-y-2">
        {menuItems.map((item) => {
          // Jika menu butuh role 'admin' tapi yang login bukan admin, JANGAN tampilkan
          if (item.role === "admin" && user?.role !== "admin") return null;

          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200" // Menu aktif jadi biru pekat
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      <button
        onClick={logout}
        className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 transition-all cursor-pointer"
      >
        <LogOut size={20} />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;

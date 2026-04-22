import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import ProtectedRoute from "./middleware/ProtectedRoute";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import Sidebar from "./components/Sidebar";
import Settings from "./pages/Settings";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/token", {
        withCredentials: true,
      });
      const newToken = response.data.accessToken;
      const decoded = jwtDecode(newToken);

      setToken(newToken);
      setUser({ role: decoded.role, name: decoded.name, expire: decoded.exp });
    } catch (error) {
      // Gunakan nama variabel biasa
      console.error("Auth check failed:", error.message); // Gunakan variabelnya di sini
      setUser(null);
      setToken("");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    //Bungkus pemanggilan dalam fungsi asinkron internal
    const authenticate = async () => {
      if (isMounted) {
        await checkAuth();
      }
    };

    authenticate();

    return () => {
      isMounted = false; // Cleanup untuk mencegah memory leak
    };
  }, [checkAuth]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login onLoginSuccess={checkAuth} />} />

        <Route element={<ProtectedRoute isAllowed={!!user} />}>
          <Route
            path="/dashboard"
            element={<Dashboard user={user} token={token} />}
          />
          <Route
            path="/settings"
            element={<Settings user={user} key={user?.uuid} />}
          />
        </Route>

        <Route
          element={
            <ProtectedRoute
              isAllowed={!!user && user.role === "admin"}
              redirectPath="/dashboard"
            />
          }
        >
          <Route path="/admin" element={<Admin token={token} user={user} />} />
          <Route
            path="/admin/add"
            element={<AddUser token={token} user={user} />}
          />
          <Route
            path="/admin/edit/:id"
            element={<EditUser token={token} user={user} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

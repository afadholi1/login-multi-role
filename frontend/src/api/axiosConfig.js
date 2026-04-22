import axios from "axios";
import { jwtDecode } from "jwt-decode";

const axiosJWT = axios.create({
  withCredentials: true,
});

axiosJWT.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      const decoded = jwtDecode(token);
      const currentDate = new Date();

      // Cek apakah token expired (20 detik itu sangat cepat!)
      if (decoded.exp * 1000 < currentDate.getTime()) {
        try {
          // Jika expired, panggil endpoint /token untuk dapat yang baru
          const response = await axios.get("http://localhost:5000/token", {
            withCredentials: true,
          });
          
          config.headers.Authorization = `Bearer ${response.data.accessToken}`;
          localStorage.setItem("accessToken", response.data.accessToken);
        } catch (error) {
          // Jika refresh token juga gagal, paksa logout/login ulang
          return Promise.reject(error);
        }
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosJWT;
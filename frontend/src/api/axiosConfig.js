import axios from "axios";

const axiosJWT = axios.create({
  withCredentials: true,
});

// Interceptor ini akan berjalan setiap kali kita melakukan request
axiosJWT.interceptors.request.use(
  async (config) => {
    // Kita akan menambahkan logika pengecekan token di sini nanti
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosJWT;

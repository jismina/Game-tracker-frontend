import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  // con create-react-app sería process.env.REACT_APP_API_URL
});

// Opcional: interceptores para errores/comprobación (simple)
API.interceptors.response.use(
  res => res,
  err => {
// para centralizar mensajes de error aquí
    return Promise.reject(err);
  }
);

export default API;

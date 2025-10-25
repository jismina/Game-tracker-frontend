import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10_000, // 10s timeout para evitar esperas infinitas
  headers: {
    "Content-Type": "application/json",
  },
  // con create-react-app sería process.env.REACT_APP_API_URL
});

// Interceptor de respuesta para normalizar errores y facilitar el debug
API.interceptors.response.use(
  (res) => res,
  (err) => {
    // normalizar mensaje
    const serverMessage = err?.response?.data?.message;
    const status = err?.response?.status;
    const message = serverMessage || err.message || "Error en la petición";

    // Adjuntar campos útiles al objeto de error para uso en la UI
    err.normalized = {
      message,
      status,
      data: err?.response?.data,
    };

    // Logging simple (se puede mejorar para environments)
    // eslint-disable-next-line no-console
    console.error("API error:", { url: err.config?.url, status, message, data: err?.response?.data });

    // modificar err.message para que componentes puedan leer un mensaje amigable
    err.message = message;
    return Promise.reject(err);
  }
);

export default API;

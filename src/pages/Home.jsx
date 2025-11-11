import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../services/api";
import TarjetaJuego from "../components/TarjetaJuego";

export default function Home() {
  const [juegos, setJuegos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/juegos")
      .then(res => setJuegos(res.data))
      .catch(err => console.error("Error al cargar juegos", err));
  }, []);

  const totalJuegos = juegos.length;
  const completados = juegos.filter(j => j.completado).length;
  const promedio = totalJuegos
    ? (juegos.reduce((a, b) => a + b.puntuacion, 0) / totalJuegos).toFixed(1)
    : 0;

  return (
    <div className="px-6 py-10 text-center bg-[#f7faf7] min-h-screen">

      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mb-10"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-[#4b6043] mb-3">
          ¡Bienvenido a GameTracker!
        </h1>
        <p className="text-base text-gray-700 mb-5">
          Lleva el control de tus juegos, puntúalos y sigue tu progreso.
        </p>
        <button
          onClick={() => navigate("/formulario")}
          className="bg-[#6b8e23] text-white px-5 py-2 rounded-lg hover:bg-[#5a7c1e] transition-all duration-300 shadow-md text-sm"
        >
          Agregar nuevo juego
        </button>
      </motion.div>

      {/* ESTADÍSTICAS */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 max-w-4xl mx-auto"
      >
        <div className="bg-[#dbe8d0] p-4 rounded-xl shadow-sm">
          <h3 className="text-base font-semibold text-[#4b6043]">🎮 Juegos totales</h3>
          <p className="text-2xl mt-1 font-bold">{totalJuegos}</p>
        </div>
        <div className="bg-[#dbe8d0] p-4 rounded-xl shadow-sm">
          <h3 className="text-base font-semibold text-[#4b6043]">✅ Completados</h3>
          <p className="text-2xl mt-1 font-bold">{completados}</p>
        </div>
        <div className="bg-[#dbe8d0] p-4 rounded-xl shadow-sm">
          <h3 className="text-base font-semibold text-[#4b6043]">⭐ Promedio</h3>
          <p className="text-2xl mt-1 font-bold">{promedio}</p>
        </div>
      </motion.div>

      {/* ÚLTIMOS JUEGOS */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-2xl font-bold text-[#4b6043] mb-5">
          Últimos juegos añadidos
        </h2>
        {juegos.length > 0 ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center"
          >
            {juegos
              .slice(-4)
              .reverse()
              .map(juego => (
                <div
                  key={juego._id}
                  className="bg-[#e9f3e3] rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 w-[280px] h-[350px] flex flex-col justify-between"
                >
                  <TarjetaJuego juego={juego} />
                </div>
              ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">
            Aún no hay juegos registrados.
          </p>
        )}
      </motion.div>

      {/* CTA FINAL */}
      <div className="mt-12">
        <p className="text-gray-600 mb-3 text-sm">
          ¿Listo para llevar el control de tus juegos?
        </p>
        <button
          onClick={() => navigate("/biblioteca")}
          className="bg-[#6b8e23] text-white px-5 py-2 rounded-lg hover:bg-[#5a7c1e] transition-all duration-300 shadow-md text-sm"
        >
          Comienza ahora
        </button>
      </div>
    </div>
  );
}


import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function EstadisticasPersonales() {
  // 🟢 Aquí definimos el estado inicial
  const [estadisticas, setEstadisticas] = useState(null);

  // 🟢 Efecto para cargar los datos al montar el componente
  useEffect(() => {
    const cargarEstadisticas = async () => {
      try {
        const res = await API.get("/resenas/estadisticas");
        console.log("Datos de estadísticas:", res.data);
        setEstadisticas(res.data);
      } catch (err) {
        console.error("Error al cargar estadísticas", err);
      }
    };

    cargarEstadisticas();
  }, []);

  // 🟢 Si todavía no hay datos, mostramos un mensaje temporal
  if (!estadisticas) {
    return <p>Cargando estadísticas...</p>;
  }

  // 🟢 Extraemos los datos que vienen del backend
  const { totalJuegos, horasTotales, promedioEstrellas } = estadisticas;

  return (
    <div
      style={{
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: 8,
        marginTop: "1rem",
      }}
    >
      <h3>📊 Estadísticas Personales</h3>
      <p>🎮 Total de juegos: {totalJuegos || 0}</p>
      <p>⏱️ Horas jugadas: {horasTotales || 0}</p>
      <p>⭐ Promedio de estrellas: {(promedioEstrellas || 0).toFixed(2)}</p>
    </div>
  );
}


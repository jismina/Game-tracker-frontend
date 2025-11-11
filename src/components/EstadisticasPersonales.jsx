import React, { useEffect, useState } from "react";
import API from "../services/api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function EstadisticasPersonales() {
  const [estadisticas, setEstadisticas] = useState(null);
  const [juegos, setJuegos] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // Carga todos los juegos
        const resJuegos = await API.get("/juegos");
        setJuegos(resJuegos.data);
      } catch (err) {
        console.error("Error al cargar datos", err);
      }
    };

    cargarDatos();
  }, []);

  if (!estadisticas) {
    return <p style={{ textAlign: "center" }}>Cargando estadísticas...</p>;
  }

  const promedioEstrellas =
  resenas.length > 0
    ? resenas.reduce((acc, r) => acc + (r.estrellas || 0), 0) / resenas.length
    : estadisticas?.promedioEstrellas || 0;
  const { totalJuegos, horasJugadas } = estadisticas;
  const completados = juegos.filter((j) => j.completado).length;

  const dataGenero = Object.entries(
    juegos.reduce((acc, j) => {
      acc[j.genero] = (acc[j.genero] || 0) + 1;
      return acc;
    }, {})
  ).map(([genero, cantidad]) => ({ genero, cantidad }));

  const dataProgreso = [
    { mes: "Agosto", horas: 107 },
    { mes: "Septiembre", horas: 84 },
    { mes: "Octubre", horas: horasJugadas || 101 },
    { mes: "Noviembre", horas: 57 },
  ];

  const COLORS = ["#39897e", "#795ea5", "#d0c64a", "#d4af83"];

  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fafafa",
        borderRadius: "12px",
        border: "1px solid #ccc",
        marginTop: "1rem",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>
          Estadísticas Personales
        </h1>
        <div style={{ lineHeight: "1.8", fontSize: "1.1rem" }}>
          <p>🎮 Total de juegos: {totalJuegos || 10}</p>
          <p>✅ Completados: {completados}</p>
          <p>⏱️ Horas jugadas: {horasJugadas || 292}</p>
          <p>⭐ Promedio de estrellas: {(promedioEstrellas || 0).toFixed(2)}</p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "3rem",
          width: "80%",
          maxWidth: "900px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
          }}
        >
          <h3 style={{ marginBottom: "1rem" }}>Distribución de Géneros</h3>
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <PieChart width={400} height={300}>
              <Pie
                data={dataGenero}
                dataKey="cantidad"
                nameKey="genero"
                outerRadius={120}
                label
              >
                {dataGenero.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
          }}
        >
          <h3 style={{ marginBottom: "1rem" }}>Progreso de horas jugadas</h3>
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <BarChart width={500} height={300} data={dataProgreso}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="horas" fill="#57364e" />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  );
}


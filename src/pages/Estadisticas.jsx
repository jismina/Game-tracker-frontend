import React, { useEffect, useState } from "react";

export default function Estadisticas() {
  const [juegos, setJuegos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const juegosGuardados = JSON.parse(localStorage.getItem("juegos")) || [];
    setJuegos(juegosGuardados);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h2>Cargando estadísticas...</h2>
      </div>
    );
  }

  if (juegos.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h2>No hay juegos en tu biblioteca aún.</h2>
        <p>Agrega algunos juegos para ver tus estadísticas 📊</p>
      </div>
    );
  }

  // Calcular estadísticas
  const totalJuegos = juegos.length;
  const completados = juegos.filter((j) => j.completado).length;
  const horasTotales = juegos.reduce((acc, j) => acc + (j.horasJugadas || 0), 0);
  const generos = {};
  let totalEstrellas = 0;

  juegos.forEach((j) => {
    if (j.genero) {
      generos[j.genero] = (generos[j.genero] || 0) + 1;
    }
    if (j.estrellas) {
      totalEstrellas += parseFloat(j.estrellas);
    }
  });

  const promedioEstrellas = (totalEstrellas / totalJuegos).toFixed(1);

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <h2
        style={{
          color: "#2c3e50",
          marginBottom: "1.5rem",
          fontSize: "2rem",
          textAlign: "center",
        }}
      >
        Estadísticas Generales
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ color: "#34495e", marginBottom: "1rem" }}>General</h3>
          <p>Total de juegos: {totalJuegos}</p>
          <p>Completados: {completados}</p>
          <p>Horas jugadas: {horasTotales}</p>
          <p>Promedio de estrellas: ⭐ {promedioEstrellas}</p>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ color: "#34495e", marginBottom: "1rem" }}>
            Juegos por género
          </h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {Object.entries(generos).map(([genero, cantidad]) => (
              <li
                key={genero}
                style={{
                  padding: "8px 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                {genero}: {cantidad}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

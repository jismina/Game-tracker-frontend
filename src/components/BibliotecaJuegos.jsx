import React, { useEffect, useState } from "react";
import API from "../services/api";
import TarjetaJuego from "./TarjetaJuego";

export default function BibliotecaJuegos() {
  const [juegos, setJuegos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState("todos"); 

  const cargarJuegos = async () => {
    setLoading(true);
    try {
      const res = await API.get("/juegos");
      setJuegos(res.data);
    } catch (err) {
      setError("Error al cargar juegos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarJuegos();
  }, []);

  const eliminarJuego = async (id) => {
    if (!confirm("¿Eliminar este juego?")) return;
    try {
      await API.delete(`/juegos/${id}`);
      setJuegos(prev => prev.filter(j => j._id !== id));
    } catch {
      alert("Error al eliminar el juego");
    }
  };

  const juegosFiltrados = juegos.filter(juego => {
    if (filtro === "completados") return juego.completado === true;
    if (filtro === "pendientes") return juego.completado === false;
    return true;
  });

  return (
    <div>
      <div style={{ marginBottom: 12, display: "flex", gap: 8, alignItems: "center" }}>
        <label>Filtrar:</label>
        <button onClick={() => setFiltro("todos")} style={{ fontWeight: filtro==="todos" ? "bold": "normal" }}>Todos</button>
        <button onClick={() => setFiltro("completados")} style={{ fontWeight: filtro==="completados" ? "bold": "normal" }}>Completados</button>
        <button onClick={() => setFiltro("pendientes")} style={{ fontWeight: filtro==="pendientes" ? "bold": "normal" }}>Pendientes</button>
      </div>

      {loading && <p>Cargando juegos...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 16 }}>
        {juegosFiltrados.map(juego => (
          <TarjetaJuego key={juego._id} juego={juego} onDelete={eliminarJuego} />
        ))}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import API from "../services/api";
import TarjetaJuego from "./TarjetaJuego";

export default function BibliotecaJuegos() {
  const [juegos, setJuegos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState("todos"); 
  const [busqueda, setBusqueda] = useState("");
  const [genero, setGenero] = useState("");

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
    // Filtro por completado / pendiente
    if (filtro === "completados" && !juego.completado) return false;
    if (filtro === "pendientes" && juego.completado) return false;

    // Filtro por búsqueda en título
    const coincideBusqueda = juego.titulo
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    // Filtro por género
    const coincideGenero = genero
      ? juego.genero?.toLowerCase() === genero.toLowerCase()
      : true;

    return coincideBusqueda && coincideGenero;
  });

   return (
    <div style={{ padding: 16 }}>
      <h1 style={{ fontWeight: "bold", fontSize: 22, marginBottom: 12 }}>
        Lista de juegos
      </h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Buscar por título..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: 6,
            border: "1px solid #ccc",
            flex: "1 1 250px"
          }}
        />

        <select
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: 6,
            border: "1px solid #ccc",
            flex: "1 1 200px"
          }}
        >
          <option value="">Todos los géneros</option>
          <option value="Acción">Acción</option>
          <option value="Aventura">Aventura</option>
          <option value="Battle Royale">Battle Royale</option>
          <option value="Estrategia">Estrategia</option>
          <option value="Deportes">Deportes</option>
          <option value="Simulación">Simulación</option>
          <option value="Terror">Terror</option>
        </select>
      </div>

      <div style={{ marginBottom: 12, display: "flex", gap: 8, alignItems: "center" }}>
        <label>Filtrar:</label>
        <button onClick={() => setFiltro("todos")} style={{ fontWeight: filtro==="todos" ? "bold": "normal" }}>Todos</button>
        <button onClick={() => setFiltro("completados")} style={{ fontWeight: filtro==="completados" ? "bold": "normal" }}>Completados</button>
        <button onClick={() => setFiltro("pendientes")} style={{ fontWeight: filtro==="pendientes" ? "bold": "normal" }}>Pendientes</button>
      </div>

      {loading && <p>Cargando juegos...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", 
        gap: 16 
      }}>
        {juegosFiltrados.map(juego => (
          <TarjetaJuego key={juego._id} juego={juego} onDelete={eliminarJuego} />
        ))}
      </div>
    </div>
  );
}
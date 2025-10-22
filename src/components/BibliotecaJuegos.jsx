import React, { useEffect, useState } from "react";
import API from "../services/api";
import TarjetaJuego from "./TarjetaJuego";

export default function BibliotecaJuegos() {
  const [juegos, setJuegos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarJuegos = async () => {
    setLoading(true);
    try {
      const res = await API.get("/juegos");
      console.log("Datos del backend:", res.data);
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

  return (
    <div>
      {loading && <p>Cargando juegos...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 16 }}>
        {juegos.map(juego => (
          <TarjetaJuego key={juego._id} juego={juego} onDelete={eliminarJuego} />
        ))}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function ListaReseñas({ juegoId }) {
  const [reseñas, setReseñas] = useState([]);
  const [error, setError] = useState(null);

  const cargarReseñas = async () => {
    try {
      const res = await API.get(`/resenas?juegoId=${juegoId}`);
      setReseñas(res.data);
    } catch (err) {
      setError("Error al cargar reseñas");
    }
  };

  const eliminarReseña = async (id) => {
    if (!confirm("¿Eliminar esta reseña?")) return;
    try {
      await API.delete(`/resenas/${id}`);
      setReseñas(prev => prev.filter(r => r._id !== id));
    } catch {
      alert("Error al eliminar la reseña");
    }
  };

  useEffect(() => {
    if (juegoId) cargarReseñas();
  }, [juegoId]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h3>Reseñas</h3>
      {reseñas.length === 0 && <p>No hay reseñas todavía.</p>}
      <ul>
        {reseñas.map(r => (
          <li key={r._id}>
            <strong>{r.usuario}</strong>: {r.texto} ⭐ {r.estrellas}
            <button onClick={() => eliminarReseña(r._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

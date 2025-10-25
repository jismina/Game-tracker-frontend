import React, { useState } from "react";
import API from "../services/api";
import ReactStars from "react-rating-stars-component";

export default function FormularioReseña({ juegoId, onReseñaAgregada }) {
  const [texto, setTexto] = useState("");
  const [estrellas, setEstrellas] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRatingChange = (newRating) => {
    setEstrellas(newRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log("Datos enviados:", { juegoId, texto, puntuacion: estrellas });


    try {
      const nueva = { juegoId, texto, puntuacion: estrellas };
      // usar la variable correcta 'nueva' al enviar la petición
      const res = await API.post("/resenas", nueva);
      onReseñaAgregada(res.data);
      setTexto("");
      setEstrellas(5);
    } catch (err) {
      console.error(err);
      // si el servidor devuelve un mensaje, mostrarlo; si no, mostrar mensaje genérico
      const msg = err?.response?.data?.message || "Error al guardar la reseña";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: "1px solid #ddd",
        padding: 12,
        borderRadius: 8,
        background: "#fff",
        marginTop: 10,
      }}
    >
      <h4>Agregar reseña</h4>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Escribe tu opinión..."
        required
        style={{
          width: "100%",
          minHeight: "80px",
          padding: 8,
          borderRadius: 6,
          border: "1px solid #ccc",
          resize: "vertical",
        }}
      />

      <div style={{ marginTop: 8 }}>
        <label style={{ display: "block", marginBottom: 4 }}>Tu puntuación:</label>
        {/* ⭐ Componente de estrellas */}
        <ReactStars
          count={5}              // número total de estrellas
          size={28}              // tamaño de cada estrella
          value={estrellas}      // valor actual
          onChange={handleRatingChange} // qué hacer al cambiar
          isHalf={false}         // sin medias estrellas (puedes poner true si quieres)
          activeColor="#ffd700"  // color dorado
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          marginTop: 10,
          background: "#007bff",
          color: "white",
          padding: "8px 16px",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}

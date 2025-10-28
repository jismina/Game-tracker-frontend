import React, { useState } from "react";
import API from "../services/api";
import ReactStars from "react-rating-stars-component";

const juegos = [
  { id: "68feecb4b85dd92f00e804d6", nombre: "The Legend of Zelda" },
  { id: "68fef83bb85dd92f00e804d9", nombre: "League of Legends" },
  { id: "68ffd9a5cb0b91c181375229", nombre: "Fortnite" },
  { id: "68ffdc8bcb0b91c18137522b", nombre: "Roblox" },
  { id: "68ffdccecb0b91c18137522d", nombre: "Apex Legends" },
  { id: "68ffdcfecb0b91c18137522f", nombre: "Minecraft" },
  { id: "68ffdd63cb0b91c181375231", nombre: "Free Fire" },
  { id: "68ffe0a7cb0b91c181375233", nombre: "Call of Duty: Warzone" },
  { id: "68ffe151cb0b91c181375235", nombre: "Mortal Kombat" },
  { id: "68ffe3f0cb0b91c181375237", nombre: "Brawlhalla" }
];

export default function FormularioReseña({ onReseñaAgregada }) {
  const [juegoId, setJuegoId] = useState(juegos[0].id); 
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
      setTexto("");
      setEstrellas(5);
    } catch (err) {
      console.error(err);
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

       {/* 🔹 Menú desplegable para elegir juego */}
      <label>Selecciona un juego:</label>
      <select value={juegoId} onChange={(e) => setJuegoId(e.target.value)} style={{ width: "100%", padding: 6, marginBottom: 10 }}>
        {juegos.map((j) => (
          <option key={j.id} value={j.id}>{j.nombre}</option>
        ))}
      </select>

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

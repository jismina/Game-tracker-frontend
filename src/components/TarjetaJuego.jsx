import React from "react";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

export default function TarjetaJuego({ juego, onDelete }) {
  const navigate = useNavigate();

  return (
    <div style={{
      border: "1px solid #ddd", borderRadius: 8, padding: 12, background: "#fff",
      display: "flex", flexDirection: "column", gap: 8
    }}>
      <img
        src={juego.imagen || "https://via.placeholder.com/300x160?text=No+image"}
        alt={juego.titulo}
        style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 6 }}
      />

      <h3 style={{ margin: 0 }}>{juego.titulo}</h3>
      <p style={{ margin: 0, fontSize: 14 }}>{juego.plataforma}</p>
      <p style={{ margin: 0, fontSize: 13, color: "#666" }}>Horas: {juego.horasJugadas}</p>

      {/* Mostrar estrellas (solo lectura) */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <ReactStars
          count={5}                      // 5 estrellas
          size={20}
          value={juego.puntuacion || 0}  // valor numérico del backend (0-5)
          edit={false}                   // solo lectura
          isHalf={true}
          activeColor="#ffd700"
        />
        <span style={{ fontSize: 13 }}>{juego.puntuacion ?? "—"}</span>
      </div>

      <div style={{ marginTop: "auto", display: "flex", gap: 8 }}>
        <button onClick={() => navigate(`/editar/${juego._id}`)} style={{ flex: 1 }}>Editar</button>
        <button onClick={() => onDelete(juego._id)} style={{ flex: 1, background: "#f66", color: "#fff" }}>Eliminar</button>
      </div>
    </div>
  );
}


import React from "react"; 
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

export default function TarjetaJuego({ juego, onDelete }) {
  const navigate = useNavigate();

  return (
    <div
      className="border border-[#57364e] rounded-lg p-3 bg-[#dbedd5] flex flex-col gap-2 
                 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
      style={{
        border: "1px solid #57364e",
        borderRadius: 8,
        padding: 12,
        background: "#dbedd5",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <img
        src={juego.imagenPortada || juego.portada || juego.cover || juego.imagen || "https://via.placeholder.com/300x160?text=Sin+Imagen"}
        alt={juego.titulo}
        style={{
          width: "100%",
          height: 160,
          objectFit: "cover",
          borderRadius: 6,
        }}
      />

      <h3 style={{ margin: 0, marginTop: 6 }}>{juego.titulo}</h3>
      <p style={{ margin: 0, fontSize: 14 }}>{juego.plataforma}</p>
      <p style={{ margin: 0, fontSize: 13, color: "#666" }}>
        Horas: {juego.horasJugadas}
      </p>

      {/* Mostrar estrellas (solo lectura) */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <ReactStars
          count={5} // 5 estrellas
          size={20}
          value={juego.puntuacion || 0} // valor numérico del backend (0-5)
          edit={false} // solo lectura
          isHalf={true}
          activeColor="#ffd700"
        />
        <span style={{ fontSize: 13 }}>{juego.puntuacion ?? "—"}</span>
      </div>

      <div style={{ marginTop: "auto", display: "flex", gap: 8 }}>
        <button
          onClick={() => juego?._id && navigate(`/editar/${juego._id}`)}
          style={{ flex: 1 }}
          disabled={!juego?._id}
        >
          Editar
        </button>
        <button
          onClick={() => juego?._id && onDelete(juego._id)}
          style={{ flex: 1, background: "#f66", color: "#fff" }}
          disabled={!juego?._id}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

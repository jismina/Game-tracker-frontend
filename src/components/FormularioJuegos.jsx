import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

export default function FormularioJuego() {
  const { id } = useParams(); // undefined si es /agregar
  const navigate = useNavigate();

  const [form, setForm] = useState({
    titulo: "",
    plataforma: "",
    horasJugadas: 0,
    completado: false,
    puntuacion: 0,
    imagen: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // si hay id, cargar datos
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    API.get(`/juegos`)
      .then(res => {
        const j = res.data.find(x => x._id === id);
        if (j) setForm({
          titulo: j.titulo || "",
          plataforma: j.plataforma || "",
          horasJugadas: j.horasJugadas || 0,
          completado: j.completado || false,
          puntuacion: j.puntuacion || 0,
          imagen: j.imagen || ""
        });
      })
      .catch(() => setError("Error al cargar juego"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : (type === "number" ? Number(value) : value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (id) {
        await API.put(`/juegos/${id}`, form);
        alert("Juego actualizado");
      } else {
        await API.post("/juegos", form);
        alert("Juego creado");
      }
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Error al guardar el juego");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 700 }}>
      <h2>{id ? "Editar juego" : "Agregar juego"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8 }}>
        <input name="titulo" placeholder="Título" value={form.titulo} onChange={handleChange} required />
        <input name="plataforma" placeholder="Plataforma" value={form.plataforma} onChange={handleChange} required />
        <input name="horasJugadas" type="number" placeholder="Horas jugadas" value={form.horasJugadas} onChange={handleChange} min="0" />
        <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input name="completado" type="checkbox" checked={form.completado} onChange={handleChange} />
          Completado
        </label>
        <input name="puntuacion" type="number" placeholder="Puntuación (0-10)" value={form.puntuacion} onChange={handleChange} min="0" max="10" />
        <input name="imagen" placeholder="URL imagen" value={form.imagen} onChange={handleChange} />
        <div style={{ display: "flex", gap: 8 }}>
          <button type="submit" disabled={loading}>{loading ? "Guardando..." : "Guardar"}</button>
          <button type="button" onClick={() => navigate(-1)}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

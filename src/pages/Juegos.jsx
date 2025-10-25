import React, { useState } from "react";
import BibliotecaJuegos from "../components/BibliotecaJuegos";
import ListaReseñas from "../components/ListaReseñas";
import FormularioReseña from "../components/FormularioReseña";
import EstadisticasPersonales from "../components/EstadisticasPersonales";

export default function Juegos() {
  // Estado para manejar si se muestra el formulario o la lista
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [juegoSeleccionado, setJuegoSeleccionado] = useState(null);

  const handleAgregarReseña = () => {
    setJuegoSeleccionado(null);
    setMostrarFormulario(true);
  };

  const handleEditarReseña = (resena) => {
    setJuegoSeleccionado(resena);
    setMostrarFormulario(true);
  };

  const handleVolver = () => {
    setMostrarFormulario(false);
  };

  return (
    <div className="p-6">
      <h1>🎮 Lista de Juegos</h1>
      <BibliotecaJuegos />

      <hr style={{ margin: "20px 0" }} />

      {mostrarFormulario ? (
        <FormularioReseña
          reseñaSeleccionada={juegoSeleccionado}
          onVolver={handleVolver}
        />
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2>📝 Reseñas</h2>
            <button onClick={handleAgregarReseña}>Agregar Reseña</button>
          </div>

          <ListaReseñas onEditar={handleEditarReseña} />
          <hr style={{ margin: "20px 0" }} />
          <EstadisticasPersonales />
        </>
      )}
    </div>
  );
}

import React from "react";
import { useParams } from "react-router-dom";

export default function EditarJuego() {
  const { id } = useParams();

  return (
    <div>
      <h1>✏️ Editar Juego</h1>
      <p>Estás editando el juego con ID: {id}</p>
      {/* Aquí luego puedes agregar el formulario para editar el juego */}
    </div>
  );
}

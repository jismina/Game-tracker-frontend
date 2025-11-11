import React from "react";
import { useParams } from "react-router-dom";
import FormularioJuego from "../components/FormularioJuegos";

export default function EditarJuego() {
  const { id } = useParams();

  return (
    <div>
      <h1>Editar Juego</h1>
      <p>Estás editando el juego con ID: {id}</p>
      <FormularioJuego juegoId={id} />
    </div>
  );
}

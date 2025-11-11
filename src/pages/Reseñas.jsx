import React from 'react';
import FormularioReseña from '../components/FormularioReseña';

export default function Reseñas() {
    return (
        <div className="p-6">
            <h1>Reseñas</h1>
            <hr style={{ margin: "20px 0" }} />
            <FormularioReseña />
        </div>
    );
}

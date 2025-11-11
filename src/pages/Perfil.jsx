import React, { useState, useEffect } from 'react';

const PLACEHOLDER = 'https://via.placeholder.com/320x320.png?text=Foto+de+perfil';

export default function Perfil() {
  const [imageSrc, setImageSrc] = useState(() => {
    try {
      return localStorage.getItem('profilePhoto') || PLACEHOLDER;
    } catch (e) {
      return PLACEHOLDER;
    }
  });

  useEffect(() => {
    // Si en algún momento otra pestaña actualiza la foto
    const onStorage = (e) => {
      if (e.key === 'profilePhoto') setImageSrc(e.newValue || PLACEHOLDER);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setImageSrc(dataUrl);
      try {
        localStorage.setItem('profilePhoto', dataUrl);
      } catch (err) {
        // si localStorage falla (espacio), simplemente ignoramos el guardado
        console.error('No se pudo guardar la foto en localStorage', err);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setImageSrc(PLACEHOLDER);
    try {
      localStorage.removeItem('profilePhoto');
    } catch (err) {
      console.error('No se pudo eliminar la foto de localStorage', err);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ 
        color: '#2c3e50',
        marginBottom: '1.5rem',
        fontSize: '2rem'
      }}>
        Mi Perfil
      </h1>
      
      <div style={{
        background: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        {/* Contenedor principal: contenido a la izquierda, foto de perfil a la derecha */}
        <div style={{
          display: 'flex',
          gap: '20px',
          alignItems: 'flex-start',
          flexWrap: 'wrap'
        }}>
          <div style={{ flex: '1 1 320px' }}>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#34495e', marginBottom: '1rem' }}>Información Personal</h3>
              <p>Nombre de usuario: Jismina</p>
              <p>Email: jisminaa10@gmail.com</p>
            </div>

            <div>
              <h3 style={{ color: '#34495e', marginBottom: '1rem' }}>Preferencias</h3>
              <p>Plataforma favorita: PC</p>
              <p>Género favorito: Aventura</p>
            </div>
          </div>

          {/* Foto cuadrada a la derecha */}
          <div style={{ flex: '0 0 160px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={imageSrc}
              alt="Foto de perfil"
              style={{
                width: '160px',
                height: '160px',
                objectFit: 'cover',
                borderRadius: 8,
                border: '1px solid #e6e6e6'
              }}
            />

            <label style={{ marginTop: '12px', cursor: 'pointer', color: '#2c3e50' }}>
              <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
              <span style={{
                display: 'inline-block',
                padding: '6px 10px',
                background: '#f0f0f0',
                borderRadius: 6,
                border: '1px solid #ddd'
              }}>Cambiar foto</span>
            </label>

            <button onClick={handleRemovePhoto} style={{
              marginTop: '8px',
              padding: '6px 10px',
              background: '#fff',
              border: '1px solid #ddd',
              borderRadius: 6,
              cursor: 'pointer'
            }}>Eliminar foto</button>
          </div>
        </div>
      </div>
    </div>
  );
}
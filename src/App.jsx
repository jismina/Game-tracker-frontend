import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Juegos from "./pages/Juegos";
import EditarJuego from "./pages/EditarJuego";
import Reseñas from "./pages/Reseñas";
import Estadisticas from "./pages/Estadisticas";
import Perfil from "./pages/Perfil";
import AgregarJuego from "./pages/AgregarJuego";
import FormularioJuego from "./components/FormularioJuegos";
import BibliotecaJuegos from "./components/BibliotecaJuegos";
import EstadisticasPersonales from "./components/EstadisticasPersonales";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <header style={{
        backgroundColor: "#556B2F", // verde olivo
        padding: "1rem",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1rem"
        }}>
          <h1 style={{ color: "white", margin: 0 }}>GameTracker</h1>
          
          {/* Navegación central */}
          <nav style={{
            display: "flex",
            gap: "2rem",
            margin: "0 auto" // Centra la navegación
          }}>
            <Link to="/" style={{
              color: "white",
              textDecoration: "none",
              fontSize: "1rem",
              padding: "0.5rem 0",
              position: "relative",
              transition: "color 0.3s"
            }}>
              Inicio
            </Link>
            <Link to="/juegos" style={{
              color: "white",
              textDecoration: "none",
              fontSize: "1rem",
              padding: "0.5rem 0",
              position: "relative",
              transition: "color 0.3s"
            }}>
              Biblioteca
            </Link>
            <Link to="/reseñas" style={{
              color: "white",
              textDecoration: "none",
              fontSize: "1rem",
              padding: "0.5rem 0",
              position: "relative",
              transition: "color 0.3s"
            }}>
              Reseñas
            </Link>
            <Link to="/estadisticas" style={{
              color: "white",
              textDecoration: "none",
              fontSize: "1rem",
              padding: "0.5rem 0",
              position: "relative",
              transition: "color 0.3s"
            }}>
              Estadísticas
            </Link>
            <Link to="/juegos/agregar" style={{
              color: "white",
              textDecoration: "none",
              fontSize: "1rem",
              padding: "0.5rem 0",
              position: "relative",
              transition: "color 0.3s"
            }}>
              Agregar Juego
            </Link>
          </nav>

          {/* Icono de perfil */}
          <Link
            to="/perfil"
            style={{
              color: "white",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              padding: "0.5rem",
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.1)",
              transition: "background-color 0.3s"
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>

          {/* Botón hamburguesa */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "30px",
              height: "24px"
            }}
          >
            <span style={{
              height: "2px",
              width: "100%",
              backgroundColor: "white",
              transition: "0.3s",
              transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none"
            }}></span>
            <span style={{
              height: "2px",
              width: "100%",
              backgroundColor: "white",
              transition: "0.3s",
              opacity: menuOpen ? 0 : 1
            }}></span>
            <span style={{
              height: "2px",
              width: "100%",
              backgroundColor: "white",
              transition: "0.3s",
              transform: menuOpen ? "rotate(-45deg) translate(7px, -7px)" : "none"
            }}></span>
          </button>
        </div>

        {/* Menú desplegable */}
        <nav style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          backgroundColor: "#556B2F",
          padding: "1rem",
          transform: menuOpen ? "translateY(0)" : "translateY(-100%)",
          opacity: menuOpen ? 1 : 0,
          visibility: menuOpen ? "visible" : "hidden",
          transition: "all 0.3s ease-in-out"
        }}>
          <Link to="/" 
            style={{
              display: "block",
              color: "white",
              textDecoration: "none",
              padding: "0.5rem 0",
              borderBottom: "1px solid rgba(255,255,255,0.1)"
            }}
            onClick={() => setMenuOpen(false)}
          >
            Inicio
          </Link>
          <Link to="/juegos"
            style={{
              display: "block",
              color: "white",
              textDecoration: "none",
              padding: "0.5rem 0",
              borderBottom: "1px solid rgba(255,255,255,0.1)"
            }}
            onClick={() => setMenuOpen(false)}
          >
            Biblioteca
          </Link>
          <Link to="/reseñas"
            style={{
              display: "block",
              color: "white",
              textDecoration: "none",
              padding: "0.5rem 0",
              borderBottom: "1px solid rgba(255,255,255,0.1)"
            }}
            onClick={() => setMenuOpen(false)}
          >
            Reseñas
          </Link>
          <Link to="/estadisticas"
            style={{
              display: "block",
              color: "white",
              textDecoration: "none",
              padding: "0.5rem 0",
            borderBottom: "1px solid rgba(255,255,255,0.1)"
            }}
            onClick={() => setMenuOpen(false)}
          >
            Estadísticas
          </Link>
          <Link to="/juegos/agregar"
            style={{
              display: "block",
              color: "white",
              textDecoration: "none",
              padding: "0.5rem 0",
            }}
            onClick={() => setMenuOpen(false)}
          >
            Agregar Juego
          </Link>
        </nav>
      </header>

      {/* Contenido principal con margen superior para el header fijo */}
      <main style={{ marginTop: "80px", padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/juegos" element={<Juegos />} />
          <Route path="/reseñas" element={<Reseñas />} />
          <Route path="/estadisticas" element={<EstadisticasPersonales />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/juegos/agregar" element={<AgregarJuego />} />
          <Route path="/editar/:id" element={<EditarJuego />} />
          <Route path="/biblioteca" element={<BibliotecaJuegos />} />
          <Route path="/formulario" element={<FormularioJuego />} />
        </Routes>
      </main>
    </div>
  );
}


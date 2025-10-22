import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Juegos from "./pages/Juegos";
import EditarJuego from "./pages/EditarJuego";

export default function App() {
  return (
    <div>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ marginRight: "15px" }}>🏠 Inicio</Link>
        <Link to="/juegos" style={{ marginRight: "15px" }}>🎮 Juegos</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/juegos" element={<Juegos />} />
        <Route path="/editar/:id" element={<EditarJuego />} />
      </Routes>
    </div>
  );
}

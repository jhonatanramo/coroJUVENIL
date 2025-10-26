import Css from "../css/Index.module.css";
import { useEffect, useState } from "react";
import { Fondo } from "../coponentes/Fondo";

export function Index() {
  const [usuario, setUsuario] = useState({});

  // ✅ Declarar correctamente la función
  const activarPantallaCompleta = () => {
    const elem = document.documentElement; // toda la página
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  };

  const session = async () => {
    try {
      const response = await fetch("/api/session/", {
        credentials: "include", // incluye cookies o sesión activa
      });
      if (!response.ok) throw new Error("Error al obtener la sesión");
      const data = await response.json();
      setUsuario(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    session();
  }, []);

  return (
    <Fondo>
      <div className={Css.contenido}>
        <h1>Bienvenido {usuario.nombre ? usuario.nombre : "Usuario"}</h1>
        <p>Esta es la página de inicio.</p>

        {/* ✅ En React se usa onClick, no onclick */}
        <button onClick={activarPantallaCompleta}>Pantalla completa</button>
      </div>
    </Fondo>
  );
}

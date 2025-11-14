import Css from "../css/Index.module.css";
import { useEffect, useState } from "react";
import { Fondo } from "../coponentes/Fondo";
import { Barra } from '../coponentes/BarraMenu/Barra';
import Server from "../api"; // ✔ instancia Axios correcta

export function Index() {
  const [usuario, setUsuario] = useState({});

  // Pantalla completa
  const activarPantallaCompleta = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) elem.requestFullscreen();
    else if (elem.mozRequestFullScreen) elem.mozRequestFullScreen();
    else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
    else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
  };

  // Obtener sesión con Axios
  const session = async () => {
    try {
      const response = await Server.get("api/session/", {
        withCredentials: true, // ✔ reemplazo de credentials:"include"
      });

      setUsuario(response.data);
    } catch (error) {
      console.error("Error al obtener sesión:", error);
    }
  };

  useEffect(() => {
    session();
  }, []);

  return (
    <Barra>
      <div className={Css.contenido}>
        <h1>Bienvenido {usuario.nombre ? usuario.nombre : "Usuario"}</h1>
        <p>Esta es la página de inicio.</p>

        <button onClick={activarPantallaCompleta}>
          Pantalla completa
        </button>
      </div>
    </Barra>
  );
}

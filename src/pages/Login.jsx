import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Css from "./css/Login.module.css.css";

export function Login() {
  const [fecha, setFecha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fecha }),
        credentials: "include", // 👈 MUY IMPORTANTE para sesiones
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Inicio de sesión exitoso:", data);
        navigate("/index");
      } else {
        console.error("Error en el inicio de sesión:", data.error);
        alert(data.error || "Error en el inicio de sesión");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("No se pudo conectar con el servidor");
    }
  };

  return (
    <div className={Css.Fondo}>
      <div className={Css.overlay}>
        <div className={Css.sub}>
          <h2 className={Css.tituloSecundario}>Torno-Angostura</h2>
          <h1 className={Css.tituloPrincipal}>"Armonía Juvenil"</h1>

          <div className={Css.caja}></div>
          <div className={Css.png}></div>
          <div className={Css.caja}></div>

          <div className={Css.botones}>
            <form onSubmit={handleSubmit}>
              <label htmlFor="fecha">Fecha de Nacimiento</label><br />
              <input
                type="date"
                id="fecha"
                name="fecha"
                required
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
              <p>Debe registrarse si es su primera vez</p>

              <button type="submit" className={Css.btn}>Ingresar</button>
            </form>

            <Link to="/Usuario">
              <button type="button" className={Css.btnSecundario}>
                Registrarse
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

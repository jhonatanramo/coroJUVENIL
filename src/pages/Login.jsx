import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Css from "./css/Login.module.css";
import { Formulario } from "../coponentes/Formulario/Formulario";

// Imagen
const Img = "../../public/pinguino.png";

// Configuración del formulario
const data = {
  Titulo: 'Crear Usuario',
  Backendt: 'api/usuario/crear/',
  Input: [
      "url-Foto de Perfil-file",
      "nombre-Nombre-text",
      "apellido_p-Apellido Paterno-text",
      "apellido_m-Apellido Materno-text",
      "fecha_nacimiento-Fecha De Nacimiento-date",
  ],
  Recibir: [
      {
          Ruta:'api/iglesias/', 
          name: "iglesia",
          items: ["id", "nombre"]
      }, 
  ]
};

export function Login() {
  const [fecha, setFecha] = useState("");
  const navigate = useNavigate();

  // Verificar si existe usuario en localStorage al cargar el componente
  useEffect(() => {
    const nombre = localStorage.getItem("nombre");
    if (nombre) {
      navigate("/index");
      console.log("Existe:", nombre);
    } else {
      console.log("No existe o está vacío");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar formato DD.MM.YYYY
    if (!fecha.match(/^\d{2}\.\d{2}\.\d{4}$/)) {
      alert("Formato de fecha inválido. Usa DD.MM.YYYY");
      return;
    }

    // Convertir a YYYY-MM-DD para enviar al backend
    const [day, month, year] = fecha.split(".");
    const fechaFormateada = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

    try {
      const response = await fetch("https://backcorojuvenil.onrender.com/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          fecha_nacimiento: fechaFormateada
        }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar datos en localStorage correctamente
        localStorage.setItem('nombre', data.usuario.nombre);
        localStorage.setItem('paterno', data.usuario.apellido_p);
        localStorage.setItem('materno', data.usuario.apellido_m);
        localStorage.setItem('url', data.usuario.url || "");

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
      <div className={Css.caja}>
        <img src={Img} alt="Usuario" className={Css.imagen} />

        <form onSubmit={handleSubmit} className={Css.form}>
          <label>Fecha de Nacimiento</label>
          <input
            type="text"
            placeholder="20.12.2001"
            className={Css.input}
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
          <button type="submit" className={Css.boton}>
            Ingresar
          </button>
        </form>

        <Formulario data={data} />
      </div>
    </div>
  );
}

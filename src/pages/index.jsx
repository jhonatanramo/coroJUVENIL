import Css from "../css/Index.module.css";
import { Template } from "../coponentes/Template";
import { Popover } from "../coponentes/Popover";

export function Index() {
  return (
    <div className={Css.Fondo}>
      <div className={Css.overlay}>
        <div className={Css.sub}>
          <h1 className={Css.titulo}>Bienvenido..!!</h1>
          <hr className={Css.linea} />
          <p className={Css.texto}>No hay evento por el momento</p>
          <hr className={Css.linea} />
          <p className={Css.texto}>
            Regístrese por favor si es la primera vez
          </p>
          
          <Popover titulo="Registro de Usuario" Registrarse="Registrarse">
            <form className={Css.formulario}>
              <label>Nombre</label>
              <input type="text" placeholder="Ingrese su nombre" />

              <label>Apellido Paterno</label>
              <input type="text" placeholder="Ingrese su apellido" />

              <label>Fecha de Nacimiento</label>
              <input type="date" />

              <button type="submit">Confirmar</button>
            </form>
          </Popover>
        </div>
      </div>
      <Template />
    </div>
  );
}

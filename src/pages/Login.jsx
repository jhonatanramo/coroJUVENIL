import React from "react";
import Css from "./../css/login.module.css";
import { Link } from "react-router-dom";

export function Login() {
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
            <Link to="/Incio">
              <button className={Css.btn}>Ingresar</button>
            </Link>
            <Link to="/directora">
              <button className={Css.btnSecundario}>Directora</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

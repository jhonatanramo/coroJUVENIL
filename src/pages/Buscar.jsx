import React from "react";
import { Template } from "../coponentes/template";

import Css from "./../css/Buscar.module.css";

export function Buscar() {
  return (
    <div className={Css.Fondo}>
      <Template />

      <div className={Css.overlay}>
        <div className={Css.sub}>
          <h2 className={Css.titulo}>Buscador de Pistas</h2>
          <hr />

          <div className={Css.buscarBox}>
            <input type="text" placeholder="Escribe aquí..." />
            <button>Buscar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Fondo } from "../coponentes/Fondo";
import Css from "./../css/Buscar.module.css";

export function Buscar() {
  return (
    <Fondo>
        <h2 className={Css.titulo}>Buscador de Pistas</h2>
          <hr />

          <div className={Css.buscarBox}>
            <input type="text" placeholder="Escribe aquí..." />
            <button>Buscasr</button>
          </div>
    </Fondo>
          
        
  );
}

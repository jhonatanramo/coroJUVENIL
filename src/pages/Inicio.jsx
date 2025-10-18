import React from "react";
import Css from './../css/Inicio.module.css';
import { Template } from "../coponentes/template";

export function Inicio() {
  return (
    <div className={Css.Fondo}>
      <Template/>
      <div className={Css.overlay}>
        <div className={Css.sub}>
          <div className={Css.caja}>
            <h1>Adios Sea Gloria</h1>
            <h2>Parrafo #</h2>
            <hr />
            <div className={Css.botones}>
              <button>Anterior</button>
            </div>
            <p>
              A Dios sea la gloria <br />
              A Dios sea la gloria <br />
              A Dios sea la gloria <br />
              Por lo que hizo por mí <br />
              Con su sangre me ha salvado <br />
              Su poder me ha levantado <br />
              A Dios sea la gloria <br />
              Por lo que hizo por mí <br />
            </p>
            <div className={Css.botones}>
              <button>Anterior</button>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
}

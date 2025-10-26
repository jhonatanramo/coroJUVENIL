import React from "react";
import Css from './../css/Inicio.module.css';
import {Fondo} from '././../coponentes/Fondo'
export function Inicio() {
  return (
    <Fondo>
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
    </Fondo>
          
  );
}

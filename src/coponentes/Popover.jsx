import React, { useRef } from "react";
import Css from "../css/Popover.module.css";

export function Popover({ titulo, children,Registrarse }) {
  const dialogRef = useRef(null);

  const abrirDialog = () => dialogRef.current.showModal();
  const cerrarDialog = () => dialogRef.current.close();

  return (
    <div className={Css.container}>
      <button className={Css.btnAbrir} onClick={abrirDialog}>
        {Registrarse}
      </button>

      <dialog ref={dialogRef} className={Css.dialog}>
        <h2 className={Css.titulo}>{titulo}</h2>
        <hr />
        <div className={Css.contenido}>
          {children}
        </div>
        <hr />
        <br />
        <button className={Css.btnCerrar} onClick={cerrarDialog}>
          Cerrar
        </button>
      </dialog>
    </div>
  );
}

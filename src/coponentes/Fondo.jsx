import Css from './../css/Fondo.module.css';
import { Template } from './Template';

export function Fondo({ children }) {
  return (
    <div className={Css.Fondo}>
      <div className={Css.overlay}>
        <div className={Css.sub}>
          {children}
        </div>
      </div>
      <Template />
    </div>
  );
}

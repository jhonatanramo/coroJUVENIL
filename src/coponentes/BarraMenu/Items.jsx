import Css from './Css/Barra.module.css';

export function Items({ Icono, Titulo, abierto }) {
  return (
    <li className={`${Css.menuItem} ${abierto ? Css.activo : ''}`}>
        <ion-icon name={Icono}></ion-icon>
        <span>{Titulo}</span>
        <ion-icon
          name="chevron-down-outline"
          className={`${Css.chevron} ${abierto ? Css.abierto : ''}`}
        ></ion-icon>
    </li>
  );
}

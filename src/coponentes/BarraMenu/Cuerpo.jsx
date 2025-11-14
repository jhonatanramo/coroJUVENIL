import Css from './Css/Barra.module.css';
import { useState } from 'react';
import { MenuItem } from './MenuItem';
import { Item } from './Item';

export function Cuerpo() {
  const [menuActivo, setMenuActivo] = useState(null);

  const toggleSubmenu = (menu) => {
    setMenuActivo(menuActivo === menu ? null : menu);
  };

  return (
    <div className={Css.cuerpo}>
      <ul>
        <MenuItem Icono="newspaper-outline"
          Titulo="Gestion"
          abierto={menuActivo === 'Gestion'}
          onClick={() => toggleSubmenu('Gestion')}
        >
          <Item icon='cube' Titulo="Gestion de Usuarios" enlace="/Usuarios" />
          <Item icon='cube' Titulo="Gestion de Repertorio" enlace="/Rertorio" />
          <Item icon='cube' Titulo="Gestion de Eventos" enlace="/Eventos" />
          <Item icon='cube' Titulo="Gestion de Iglesias" enlace="/Iglesias" />
    
        </MenuItem>
        <MenuItem Icono="cube-outline"
          Titulo="Anuncios"
          abierto={menuActivo === 'Anuncios'}
          onClick={() => toggleSubmenu('Anuncios')}
        >
          <Item icon='cube' Titulo="Eventos" enlace="/Dashboard" />
          <Item icon='cube' Titulo="Repertorios" enlace="/EstadoResultados" />
        </MenuItem>

        <Item icon='shirt' Titulo="Repertorios" enlace="/EstadoResultados" />
        <Item icon='shirt' Titulo="Busqueda" enlace="/Buscar" />
        <Item icon='shirt' Titulo="Calendario" enlace="/Calendario" />

      </ul>
    </div>
  );
}

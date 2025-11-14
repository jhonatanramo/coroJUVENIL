import {Barra} from '../../coponentes/BarraMenu/Barra';
import {Titulo} from '../../coponentes/Cabesera/Titulo';
import {Tabla} from '../../coponentes/Table/Tabla';
import {Formulario} from '../../coponentes/Formulario/Formulario';
export function Usuarios(){
    const data1 = {
        ruta: "api/usuarios/",
        eliminar: "api/usuario/eliminar/",
        cabesera: ["Nombre", "Foto","Paterno", "Materno", "Nacimiento", "Iglesias",],
        valor: ["nombre-t", "url-f","apellido_p-t", "apellido_m-t", "fecha_nacimiento-t", "iglesia_nombre"]
      };
      
    return(
        <Barra>
            <Titulo icon='person' titulo='Gestion de Usuario'/>
            <Tabla data={data1}
            
            />
        </Barra>
    );
}
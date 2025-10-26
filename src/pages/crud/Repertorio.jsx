import { Fondo } from "../../coponentes/Fondo";
import { Popover } from "../../coponentes/Popover";
import { useState, useEffect } from "react";

export function Repertorio() {
  const [titulo, setTitulo] = useState("");
  const [coro, setCoro] = useState("");
  const [parrafos, setParrafos] = useState("");
  const [repertorios, setRepertorios] = useState([]);
  const [editarId, setEditarId] = useState(null);

  // -------------------------------
  // Guardar o editar repertorio
  // -------------------------------
  const guardar = async () => {
    try {
      // Crear o editar repertorio
      const url = editarId ? `api/repertorio/editar/` : `api/repertorio/crear/`;
      const data = editarId ? { id: editarId, nombre: titulo, coro } : { nombre: titulo, coro };
      
      const response = await fetch(url, {
        method: editarId ? 'PUT' : 'POST', // Usar PUT para editar
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Error al guardar');
      }

      const repertorioId = editarId ? editarId : result.repertorio.id;

      // Manejar párrafos
      if (parrafos.trim() !== "") {
        if (editarId) {
          // En edición: eliminar párrafos existentes y crear nuevos
          await fetch(`api/parrafo/eliminar/?id=${repertorioId}`, { 
            method: 'DELETE' 
          });
        }
        
        // Crear nuevos párrafos
        const listaParrafos = parrafos.split('---').map(p => p.trim()).filter(p => p);
        for (const p of listaParrafos) {
          const parrafoResponse = await fetch(`api/parrafo/crear/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ parrafo: p, id_repertorio: repertorioId }),
          });
          
          if (!parrafoResponse.ok) {
            const errorData = await parrafoResponse.json();
            throw new Error(errorData.error || 'Error al crear párrafos');
          }
        }
      }

      alert(editarId ? 'Repertorio editado correctamente!' : 'Repertorio creado correctamente!');
      limpiarFormulario();
      fetchRepertorios();
    } catch (error) {
      console.log('Error al guardar:', error);
      alert('Error: ' + error.message);
    }
  };

  // -------------------------------
  // Obtener repertorios
  // -------------------------------
  const fetchRepertorios = async () => {
    try {
      const response = await fetch('api/repertorios/');
      const data = await response.json();
      setRepertorios(data);
    } catch (error) {
      console.log('Error al cargar repertorios:', error);
    }
  };

  // -------------------------------
  // Cargar datos para editar
  // -------------------------------
  const cargarEdicion = async (id) => {
    try {
      // Cargar datos del repertorio
      const response = await fetch(`api/repertorio/?id=${id}`);
      if (!response.ok) throw new Error('Error al cargar repertorio');
      
      const data = await response.json();
      setTitulo(data.nombre);
      setCoro(data.coro || '');

      // Cargar párrafos
      const parrafosRes = await fetch(`api/parrafos/?id=${id}`);
      if (parrafosRes.ok) {
        const parrafosData = await parrafosRes.json();
        setParrafos(parrafosData.map(p => p.parrafo).join('\n---\n'));
      } else {
        setParrafos('');
      }

      setEditarId(id);
    } catch (error) {
      console.log('Error al cargar edición:', error);
      alert('Error al cargar datos para editar');
    }
  };

  // -------------------------------
  // Eliminar repertorio
  // -------------------------------
  const eliminarRepertorio = async (id) => {
    if (!window.confirm('¿Eliminar este repertorio y sus párrafos?')) return;

    try {
      // Primero eliminar párrafos
      await fetch(`api/parrafo/eliminar/?id=${id}`, { method: 'DELETE' });
      // Luego eliminar repertorio
      await fetch(`api/repertorio/eliminar/?id=${id}`, { method: 'DELETE' });
      
      fetchRepertorios();
      alert('Repertorio eliminado correctamente');
    } catch (error) {
      console.log('Error al eliminar:', error);
      alert('Error al eliminar repertorio');
    }
  };

  // -------------------------------
  // Limpiar formulario
  // -------------------------------
  const limpiarFormulario = () => {
    setTitulo("");
    setCoro("");
    setParrafos("");
    setEditarId(null);
  };

  // -------------------------------
  // Cancelar edición
  // -------------------------------
  const cancelarEdicion = () => {
    limpiarFormulario();
  };

  useEffect(() => {
    fetchRepertorios();
  }, []);

  return (
    <Fondo>
      <Popover titulo={editarId ? "Editar Repertorio" : "Agregar Repertorio"} Registrarse={editarId ? "Editar" : "Agregar"}>
        <label htmlFor="titulo">Título:</label>
        <input
          type="text"
          id="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        /><br />

        <label htmlFor="coro">Coro:</label>
        <input
          type="text"
          id="coro"
          value={coro}
          onChange={(e) => setCoro(e.target.value)}
        /><br />

        <label htmlFor="parrafos">Párrafos:</label><br />
        <textarea
          id="parrafos"
          placeholder={`Separar los párrafos con '---'\n\nparrafo1\n---\nparrafo2\n---\nparrafo3`}
          value={parrafos}
          onChange={(e) => setParrafos(e.target.value)}
          rows="6"
          style={{width: '100%'}}
        /><br />

        <button onClick={guardar}>{editarId ? "Actualizar" : "Guardar"}</button>
        {editarId && <button onClick={cancelarEdicion} style={{marginLeft: '10px'}}>Cancelar</button>}
      </Popover>

      <br />
      <table className="table">
        <thead>
          <tr>
            <th>Nro</th>
            <th>Nombre</th>
            <th>Coro</th>
            <th>Creado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {repertorios.map((p, i) => (
            <tr key={p.id}>
              <td>{i + 1}</td>
              <td>{p.nombre}</td>
              <td>{p.coro}</td>
              <td>{new Date(p.creado_en).toLocaleString()}</td>
              <td>
                <button onClick={() => cargarEdicion(p.id)}>Editar</button>
                <button onClick={() => eliminarRepertorio(p.id)} style={{marginLeft: '5px'}}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fondo>
  );
}
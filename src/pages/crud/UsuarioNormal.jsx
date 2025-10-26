import Css from './../../css/Login.module.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Fondo } from '../../coponentes/Fondo';
export function UsuarioNormal() {
  const [Iglesias, setIglesias] = useState([]);

  // Estados para formulario
  const [nombre, setNombre] = useState('');
  const [apellidoP, setApellidoP] = useState('');
  const [apellidoM, setApellidoM] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [iglesiaId, setIglesiaId] = useState('');

  const [mensaje, setMensaje] = useState('');

  // Petición para obtener iglesias
  const obtenerIglesias = async () => {
    try {
      const response = await fetch(`api/iglesias/`);
      const data = await response.json();
      setIglesias(data);
    } catch (error) {
      console.error('Error al cargar iglesias:', error);
    }
  };

  // Cargar todas las iglesias al montar el componente
  useEffect(() => {
    obtenerIglesias();
  }, []);

  // Función para enviar el formulario
  const handleSubmit = async () => {
    if (!nombre || !apellidoP || !apellidoM || !fechaNacimiento || !iglesiaId) {
      setMensaje('Por favor, completa todos los campos');
      return;
    }

    const payload = {
      nombre: nombre,
      apellido_p: apellidoP,
      apellido_m: apellidoM,
      fecha_nacimiento: fechaNacimiento,
      iglesia: iglesiaId
    };

    try {
      const response = await fetch(`api/usuario/crear/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje('Usuario registrado correctamente');
        // Limpiar formulario
        setNombre('');
        setApellidoP('');
        setApellidoM('');
        setFechaNacimiento('');
        setIglesiaId('');
      } else {
        setMensaje(data.mensaje || 'Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      setMensaje('Error al registrar usuario');
    }
  };

  return (
    <Fondo>
      <h1>Registro de datos</h1>
        
        <label>Nombre:</label><br />
        <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} /><br />

        <label>A. Paterno:</label><br />
        <input type="text" value={apellidoP} onChange={e => setApellidoP(e.target.value)} /><br />

        <label>A. Materno:</label><br />
        <input type="text" value={apellidoM} onChange={e => setApellidoM(e.target.value)} /><br />

        <label>Iglesia a la que asiste:</label><br />
        <select value={iglesiaId} onChange={e => setIglesiaId(e.target.value)}>
          <option value="">Seleccionar</option>
          {Iglesias.map((iglesia) => (
            <option key={iglesia.id} value={iglesia.id}>
              {iglesia.nombre}
            </option>
          ))}
        </select><br />

        <label>Fecha Nacimiento:</label><br />
        <input type="date" value={fechaNacimiento} onChange={e => setFechaNacimiento(e.target.value)} /><br /><br />
        <div className={Css.btn} onClick={handleSubmit}>Registrarse</div><br />
        <Link to='/'>Regresar</Link>
        {mensaje && <p>{mensaje}</p>}
    </Fondo>
          
        
  );
}

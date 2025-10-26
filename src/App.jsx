import { Login } from './pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Inicio } from './pages/Inicio';
import { Calendario } from './pages/Calendario';
import { Index } from './pages/index';
import { Buscar } from './pages/Buscar';
import { UsuarioNormal } from './pages/crud/UsuarioNormal';
import { Repertorio } from './pages/crud/Repertorio';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Incio' element={<Inicio />} />
        <Route path='/Calendario' element={<Calendario />} />
        <Route path='/Bucar' element={<Buscar />} />
        <Route path='/index' element={<Index />} />
        <Route path='/Usuario' element={<UsuarioNormal />} />
        <Route path='/Repertorio' element={<Repertorio />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App

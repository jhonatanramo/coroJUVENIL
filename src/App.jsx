import { Login } from './pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Inicio } from './pages/Inicio';
import { Calendario } from './pages/Calendario';
import { Popover } from './coponentes/popover';
import { Index } from './pages/index';
import { Buscar } from './pages/Buscar';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Incio' element={<Inicio />} />
        <Route path='/Calendario' element={<Calendario />} />
        <Route path='/popover' element={<Popover />} />
        <Route path='/Bucar' element={<Buscar />} />
        <Route path='/index' element={<Index />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App

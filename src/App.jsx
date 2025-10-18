import { Login } from './pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Inicio } from './pages/Inicio';
import { Calendario } from './pages/Calendario';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Incio' element={<Calendario />} />
        <Route path='/new' element={<Inicio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App

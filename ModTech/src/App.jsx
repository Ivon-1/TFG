// import { useState } from 'react' recordar
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Home } from './pages/home/home'
import { FormularioLogin } from './pages/login/formularioLogin';
import { RegistroPage } from './pages/registro/formularioRegistro';
function App() {
  // importamos el menu de opciones 
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<FormularioLogin />} /> 
          <Route path='/registrarse' element={< RegistroPage />} />
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App

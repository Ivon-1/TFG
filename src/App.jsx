// import { useState } from 'react' recordar
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// importar env api
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Home } from './pages/home/home'
import { FormularioLogin } from './pages/login/formularioLogin';
import { RegistroPage } from './pages/registro/formularioRegistro';
import { Facturas } from './pages/facturas/facturas';
import { Productos } from './components/common/productos';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const initialOptions = {
    "client-id": "ATWuuu2wVXBco02sG4klxOUBa1R9Qfoxs3RbihocUCjVFDgxZoVAxxVXdahG91V_6VLFda_vLUGmeKc4",
    currency: "EUR",
    intent: "capture",
    components: "buttons",
    "data-csp-nonce": "YourGeneratedNonceHere",
    "enable-funding": "paylater,venmo",
    "disable-funding": "card"
};

function App() {
  // importamos el menu de opciones 
  
  return (
    <PayPalScriptProvider 
      options={initialOptions}
      deferLoading={false}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<FormularioLogin />} />
          <Route path='/registrarse' element={< RegistroPage />} />
          <Route path='/facturas' element={<Facturas />} />
          <Route path='/productos' element={<Productos />} />
        </Routes>
      </BrowserRouter>
    </PayPalScriptProvider>
  )
}

export default App

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Reservar from './pages/Reservar'; // Página de reserva
import Button from '@mui/material/Button'; // Botón de Material-UI

const App = () => {
  return (
    <Router>
      {/* Encabezado */}
      <Header />

      {/* Configuración de Rutas */}
      <Routes>
        <Route path="/" element={<Reservar />} /> {/* Ruta principal redirige a Reservar */}
        <Route path="/reservar" element={<Reservar />} /> {/* Ruta de reservas */}
      </Routes>

      {/* Botón de Material-UI */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Button variant="contained" color="primary">
          Reservar Ahora
        </Button>
      </div>
    </Router>
  );
};

export default App;

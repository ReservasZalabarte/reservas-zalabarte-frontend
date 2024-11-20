import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Reservas from './pages/Reservas'; // Nueva página de Reservas
import Button from '@mui/material/Button'; // Botón de Material-UI

const App = () => {
  return (
    <Router>
      {/* Encabezado */}
      <Header />

      {/* Configuración de Rutas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservas" element={<Reservas />} />
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

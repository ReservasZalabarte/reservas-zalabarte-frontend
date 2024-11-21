import React, { useState } from 'react';
import api from '../services/api';

const ReservaFormulario = () => {
  const [fecha, setFecha] = useState('');
  const [numeroComensales, setNumeroComensales] = useState('');
  const [horasDisponibles, setHorasDisponibles] = useState([]);
  const [horaSeleccionada, setHoraSeleccionada] = useState('');
  const [localizacion, setLocalizacion] = useState(''); // Nueva localización
  const [mostrarFormularioContacto, setMostrarFormularioContacto] = useState(false);

  // Campos de contacto del cliente
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');

  const [mensaje, setMensaje] = useState(''); // Para mensajes de error o éxito

  // Verificar turnos disponibles
  const verificarTurnos = async () => {
    try {
      const response = await api.post('/reservas/verificar-turnos', {
        restauranteId: 1, // Cambia según el restaurante
        fecha,
        numeroComensales,
      });

      setHorasDisponibles(response.data);

      if (response.data.length === 0) {
        setMensaje('Lo sentimos, todas las mesas están completas.');
      } else {
        setMensaje('');
      }
    } catch (error) {
      console.error('Error al verificar turnos disponibles:', error);
      setMensaje(error.response?.data?.mensaje || 'Error al verificar turnos.');
    }
  };

  // Confirmar reserva
  const confirmarReserva = async () => {
    try {
      const response = await api.post('/reservas/crear', {
        restauranteId: 1, // Cambia según el restaurante
        fecha,
        numeroComensales,
        horaInicio: horaSeleccionada,
        localizacion,
        nombreCliente: nombre,
        telefono,
        email,
      });

      alert('Reserva realizada con éxito.');

      // Resetear formulario tras éxito
      setFecha('');
      setNumeroComensales('');
      setHorasDisponibles([]);
      setHoraSeleccionada('');
      setLocalizacion('');
      setMostrarFormularioContacto(false);
      setNombre('');
      setTelefono('');
      setEmail('');
    } catch (error) {
      console.error('Error al confirmar reserva:', error);
      alert(error.response?.data?.mensaje || 'Error al confirmar reserva.');
    }
  };

  return (
    <div>
      <h1>Reservar Mesa</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        {/* Campo para fecha */}
        <label>
          Fecha:
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </label>

        {/* Campo para número de comensales */}
        <label>
          Número de Comensales:
          <input
            type="number"
            value={numeroComensales}
            onChange={(e) => setNumeroComensales(e.target.value)}
            min="1"
            required
          />
        </label>

        {/* Botón para verificar disponibilidad */}
        <button
          type="button"
          onClick={verificarTurnos}
          disabled={!fecha || !numeroComensales}
        >
          Verificar Disponibilidad
        </button>

        {/* Mensaje de disponibilidad */}
        {mensaje && <p>{mensaje}</p>}

        {/* Opciones de horas disponibles */}
        {horasDisponibles.length > 0 && (
          <div>
            <h2>Horas Disponibles</h2>
            {horasDisponibles.map((hora) => (
              <button
                key={hora.horaInicio}
                type="button"
                onClick={() => {
                  setHoraSeleccionada(hora.horaInicio);
                  setMostrarFormularioContacto(true); // Mostrar formulario de contacto
                }}
                disabled={!hora.disponible}
              >
                {hora.horaInicio}
              </button>
            ))}
          </div>
        )}

        {/* Opciones de localización */}
        {horaSeleccionada && (
          <div>
            <h2>Elige Localización</h2>
            <label>
              <input
                type="radio"
                name="localizacion"
                value="loc1"
                onChange={(e) => setLocalizacion(e.target.value)}
              />
              Planta Baja
            </label>
            <label>
              <input
                type="radio"
                name="localizacion"
                value="loc2"
                onChange={(e) => setLocalizacion(e.target.value)}
              />
              Terraza
            </label>
          </div>
        )}

        {/* Formulario de datos de contacto */}
        {mostrarFormularioContacto && (
          <div>
            <h2>Datos de Contacto</h2>
            <label>
              Nombre:
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </label>
            <label>
              Teléfono:
              <input
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            {/* Botón para enviar reserva */}
            <button
              type="button"
              onClick={confirmarReserva}
              disabled={!horaSeleccionada || !localizacion}
            >
              Confirmar Reserva
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ReservaFormulario;

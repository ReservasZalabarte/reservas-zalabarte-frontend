import React, { useEffect, useState } from 'react'; // Agrega useEffect y useState
import api from '../services/api'; // Importa la configuración de Axios

const Home = () => {
  const [reservas, setReservas] = useState([]); // Estado para almacenar las reservas

  useEffect(() => {
    // Llamada a la API al cargar el componente
    const fetchReservas = async () => {
      try {
        const response = await api.get('/reservas'); // Llama al endpoint de reservas
        setReservas(response.data); // Actualiza el estado con los datos obtenidos
      } catch (error) {
        console.error('Error al obtener reservas:', error); // Maneja errores
      }
    };

    fetchReservas();
  }, []); // El array vacío asegura que solo se ejecute una vez al montar el componente

  return (
    <div>
      <h1>Reservas</h1>
      <ul>
        {reservas.map((reserva) => (
          <li key={reserva.id}>
            {reserva.nombre} - {reserva.fecha}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

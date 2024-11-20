import axios from 'axios';

// Configuración base para Axios
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Cambia esta URL si tu backend usa otro puerto
  timeout: 10000, // Tiempo máximo de espera en milisegundos
});

// Puedes añadir interceptores aquí si es necesario (opcional)

// Interceptor para manejar respuestas con error
api.interceptors.response.use(
    (response) => response, // Devuelve la respuesta si es exitosa
    (error) => {
      console.error('Error en la API:', error.response?.data || error.message);
      return Promise.reject(error); // Propaga el error
    }
  );
  
export default api;

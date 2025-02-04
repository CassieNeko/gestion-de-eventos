import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/autenticacion/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error al iniciar sesión: ${errorText}`);
  }
  const data = await response.json();
  return { token: data.token }; 
};

const getToken = () => localStorage.getItem('token');

export const fetchEventos = async () => {
  const token = getToken();
  if (!token) throw new Error("No autorizado");
  
  const response = await axios.get(`${API_URL}/eventos`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/autenticacion/registro`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error al registrar usuario: ${errorText}`);
  }
  return response.json();
};

export const crearEvento = async (eventoData) => {
  const token = localStorage.getItem('token'); 
  const response = await fetch(`${API_URL}/eventos`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(eventoData),
  });
  if (!response.ok) {
    throw new Error('Error al crear evento');
  }
  return response.json();
};

export const actualizarEvento = async (id, eventoData) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const response = await fetch(`${API_URL}/eventos/${id}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(eventoData),
  });
  if (!response.ok) {
    throw new Error('Error al actualizar evento');
  }
  return response.json();
};

export const buscarEventos = async (ubicacion, fecha, { headers }) => {

  try {
    let url = `${API_URL}/eventos?`;
    
    if (ubicacion) url += `ubicacion=${encodeURIComponent(ubicacion)}&`;
    if (fecha) url += `fecha=${encodeURIComponent(fecha)}`;

    const response = await fetch(url, {
      headers: headers
    });


    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en buscarEventos:", error);
    throw error;
  }
};

export const eliminarEvento = async (id) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
  };

  const response = await fetch(`${API_URL}/eventos/${id}`, {
    method: 'DELETE',
    headers: headers,
  });
  if (!response.ok) {
    throw new Error('Error al eliminar evento');
  }
  return response.json();
};
export const logoutUser = () => {
  localStorage.removeItem('token');
};

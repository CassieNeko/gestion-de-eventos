import React, { useState, useEffect } from 'react';
import { fetchEventos, crearEvento, eliminarEvento, actualizarEvento, buscarEventos } from '../api';
import EventCard from '../components/EventCard';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../styles/styles.css';

const EventosPage = () => {
  const [eventos, setEventos] = useState([]);
  const [nuevoEvento, setNuevoEvento] = useState({ evento: '', fecha: '', hora: '', descripcion: '', ubicacion: '' });
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [ubicacion, setUbicacion] = useState("");
  const [fecha, setFecha] = useState(""); 

  useEffect(() => {
    const obtenerEventos = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login'; 
        return;
      }      
      try {
        const data = await fetchEventos();
        setEventos(data);
      } catch (err) {
        if (err.response && err.response.status !== 404) {
          setError(err.message);
        }
      }
    };
    obtenerEventos();
  }, []);

  const handleAddEvent = async (e) => {
    e.preventDefault();
    const eventoData = {
      ...nuevoEvento,
      fecha: nuevoEvento.fecha 
    };
    const token = localStorage.getItem('token'); 
    const headers = {
      'Authorization': `Bearer ${token}`, 
      'Content-Type': 'application/json'
    };

    if (isEditing) {
      try {
        const updatedEvent = await actualizarEvento(nuevoEvento._id, eventoData, { headers });
        setEventos(eventos.map(evento => (evento._id === updatedEvent._id ? updatedEvent : evento)));
        setIsEditing(false);
        setMensaje('Evento actualizado correctamente.');
      } catch (err) {
        setError(err.message);
      }
    } else {
      try {
        const createdEvent = await crearEvento(eventoData, { headers });
        setEventos([...eventos, createdEvent]);
        setMensaje('Evento creado correctamente.');
      } catch (err) {
        setError(err.message);
      }
    }
    
    setNuevoEvento({ evento: '', fecha: '', hora: '', descripcion: '', ubicacion: '' });
  };

  const handleDeleteEvent = async (id) => {
    try {
      await eliminarEvento(id);
      setEventos(eventos.filter(evento => evento._id !== id));
      alert('Evento eliminado correctamente.');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditEvent = (evento) => {
    setNuevoEvento({
      ...evento,
      fecha: evento.fecha.split('T')[0]
    });
    setIsEditing(true);
    alert("Evento listo para editar. Modifica los datos y guarda los cambios.");
  };

  const handleSearch = async () => {
    console.log("Buscando con ubicación:", ubicacion, "y fecha:", fecha);
    const token = localStorage.getItem('token'); 
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    try {
      const eventosEncontrados = await buscarEventos(ubicacion, fecha, { headers });
      console.log("Eventos encontrados:", eventosEncontrados);
      setEventos(eventosEncontrados);
    } catch (error) {
      console.error("Error al buscar eventos:", error);
      setMensaje("Hubo un error al buscar los eventos");
    }
  };

  return (
    <div className="container-eventos">
      <h1>Eventos</h1>
      {error && <p className="error">{error}</p>}
      {mensaje && <p className="mensaje-confirmacion">{mensaje}</p>}
      <div className="buscar">
        <form onSubmit={handleAddEvent}>
          <TextField
            label="Nombre del evento"
            value={nuevoEvento.evento}
            onChange={(e) => setNuevoEvento({ ...nuevoEvento, evento: e.target.value })}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            type="date"
            label="Fecha"
            value={nuevoEvento.fecha}
            onChange={(e) => setNuevoEvento({ ...nuevoEvento, fecha: e.target.value })}
            required
            fullWidth
            margin="normal"
            inputProps={{
              style: { color: '#800080' }  
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            type="time"
            label="Hora"
            value={nuevoEvento.hora}
            onChange={(e) => setNuevoEvento({ ...nuevoEvento, hora: e.target.value })}
            required
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#800080',
                '& fieldset': { borderColor: '#800080' },
              },
            }}
          />
          <TextField
            label="Descripción del evento"
            value={nuevoEvento.descripcion}
            onChange={(e) => setNuevoEvento({ ...nuevoEvento, descripcion: e.target.value })}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Ubicación del evento"
            value={nuevoEvento.ubicacion}
            onChange={(e) => setNuevoEvento({ ...nuevoEvento, ubicacion: e.target.value })}
            required
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            <AddBoxIcon /> {isEditing ? 'Editar' : 'Crear'}
          </Button>
        </form>
      </div>      

      <div className="buscar">
        <h2>Buscar Eventos</h2>
        <div className="buscar-filtros">
          <TextField
            label="Filtrar por ubicación"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            margin="normal"
          />
          <TextField
            type="date"
            label="Fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            margin="normal"
            inputProps={{
              style: { color: '#800080' }
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button onClick={handleSearch} variant="contained" color="secondary">
            <SearchIcon />
          </Button>
        </div>
      </div>

      <div className="event-cards-container">
        {eventos.length > 0 ? (
          eventos.map(evento => (
            <div key={evento._id} className="card">
              <EventCard evento={evento} onEdit={handleEditEvent} onDelete={handleDeleteEvent}>
                <h3>{evento.evento}</h3>
                <button onClick={() => handleDeleteEvent(evento._id)}>
                  <DeleteIcon /> Eliminar
                </button>
              </EventCard>
            </div>
          ))
        ) : (
          <div className="no-eventos">
            <h3>No hay eventos programados aún.</h3>
            <p>¡Crea uno para comenzar!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventosPage;

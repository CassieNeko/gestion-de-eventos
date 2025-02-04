import React from 'react';
import '../styles/styles.css'; 
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const EventCard = ({ evento, onEdit, onDelete }) => {
  return (
    <div className="event-card">
      <h3>{evento.evento}</h3>
      <p>Fecha: {new Date(evento.fecha).toISOString().split('T')[0]}</p>
      <p>Hora: {evento.hora}</p>
      <p>Ubicación: {evento.ubicacion}</p>
      <p>{evento.descripcion}</p>
      <button onClick={() => onEdit(evento)}>
        <EditIcon />
      </button>
      <button onClick={() => {
        if (window.confirm("Eliminar evento?")) {onDelete(evento._id);}}}>
        <DeleteIcon />
        </button>
    </div>
  );
};

export default EventCard; 
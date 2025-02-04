import React, { useState } from 'react';
import { registerUser } from '../api'; 
import '../styles/styles.css'; 
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const RegistroPage = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!nombre || !correo || !password) {
      setMensaje('Por favor, completa todos los campos requeridos.');
      return;
    }
    try {
      const response = await registerUser({ nombre, correo, password });
      localStorage.setItem('token', response.token); 
      setMensaje('Usuario registrado con éxito.'); 
      window.location.href = '/eventos'; 
    } catch (error) {
      setMensaje('Error al registrar: ' + error.message); 
    }
  };

  return (
    <div className="container-register">
      <h1>Registro de Usuario</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="Nombre"
            type="text"
            variant="outlined"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            fullWidth
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset' : {
                  borderColor: '#794a94', 
                },
              },
              '& .MuiInputLabel-root': {
                color: '#794a94', 
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#794a94', 
              },
            }}
          />
        </div>

        <div>
          <TextField
            label="Correo"
            type="email"
            variant="outlined"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            fullWidth
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#794a94', 
                },
              },
              '& .MuiInputLabel-root': {
                color: '#794a94', 
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#794a94',
              },
            }}
          />
        </div>

        <div>
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#794a94',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#794a94', 
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#794a94', 
              },
            }}
          />
        </div>

        <Button type="submit" variant="contained" className="custom-button" sx={{ textTransform: 'none' }}>
          Registrar
        </Button>
      </form>
      {mensaje && <p>{mensaje}</p>} 
    </div>
  );
};

export default RegistroPage;

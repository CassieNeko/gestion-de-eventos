import React, { useState } from 'react';
import { loginUser } from '../api'; 
import '../styles/styles.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const LoginPage = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!correo || !password) {
      setMensaje('Por favor, completa todos los campos requeridos.');
      return;
    }
    try {
      const response = await loginUser({ correo, password });
      localStorage.setItem('token', response.token);
      setMensaje('Inicio de sesión exitoso.');
      window.location.href = '/eventos'; 
    } catch (error) {
      setMensaje('Error al iniciar sesión: ' + error.message);
    }
  };

  return (
    <div className="form-container">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        
      <TextField
        id="outlined-correo"
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

      <TextField
        id="outlined-password"
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


        
        <Button type="submit" variant="contained" className="custom-button" sx={{ textTransform: 'none' }}>
          Iniciar Sesión
        </Button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default LoginPage;

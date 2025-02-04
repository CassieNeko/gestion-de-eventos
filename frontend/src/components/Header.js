import React from 'react';
import { Link } from 'react-router-dom'; 
import LogoutIcon from '@mui/icons-material/Logout';
import '../styles/styles.css';

const Header = ({ onLogout }) => {
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    onLogout(); 
    window.location.href = '/login'; 
  };

  const isAuthenticated = !!localStorage.getItem('token'); 

  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          {!isAuthenticated && <li><Link to="/login">Iniciar Sesión</Link></li>}
          {!isAuthenticated && <li><Link to="/registro">Registro</Link></li>}
          <li><Link to="/eventos">🗓️Eventos</Link></li>
          {isAuthenticated && ( 
            <li><button onClick={handleLogout}><LogoutIcon /></button></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;


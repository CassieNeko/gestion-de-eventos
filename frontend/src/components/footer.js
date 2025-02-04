import React from 'react';
import '../styles/styles.css'; 


const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Gestión de Eventos. Catalina Melo. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;

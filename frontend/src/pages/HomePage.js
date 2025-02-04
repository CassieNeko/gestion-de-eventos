import React from 'react';

const HomePage = () => {
  return (
    <div className='container-home'>
      <h1>Bienvenido a la Página de Gestor de Eventos</h1>

      <p>
        Esta es la página principal de nuestra aplicación, diseñada para ayudarte a gestionar tus eventos de manera fácil y eficiente. 
        Aquí podrás crear, editar y eliminar eventos, además de buscar eventos por filtros como fecha o ubicación. 
        Esta plataforma te permite:
      </p>
      <ul>
        <li><strong>Agregar nuevos eventos:</strong> Registra detalles como el nombre, la fecha, la hora, la descripción y la ubicación de cada evento.</li>
        <li><strong>Buscar eventos fácilmente:</strong> Filtra eventos por fecha o ubicación para encontrar lo que buscas de forma rápida.</li>
        <li><strong>Ver eventos programados:</strong> Visualiza todos los eventos creados, con información detallada y la opción de eliminarlos o modificarlos.</li>
        <li><strong>Gestión intuitiva:</strong> Navega a través de una interfaz amigable que facilita el manejo de tus eventos.</li>
      </ul>

      <img src="/organizador.png" alt="Organizador de eventos" height={300}  />
      <p>
        Además, puedes <strong>registrarte</strong> y acceder a tu cuenta para tener un control total sobre tus eventos. Si aún no tienes cuenta, 
        simplemente <strong><a href="/registro">regístrate</a></strong> para empezar a agregar tus propios eventos. Si ya tienes una cuenta, 
        <strong><a href="/login"> inicia sesión</a></strong> para acceder a tus eventos guardados y gestionarlos de manera personalizada.
      </p>

      <h3>Funciones adicionales:</h3>
      <ul>
        <li><strong>Registro de usuario:</strong> Crea una cuenta en minutos para comenzar a agregar tus eventos.</li>
        <li><strong>Inicio de sesión:</strong> Accede a tu cuenta en cualquier momento para gestionar tus eventos, modificarlos o eliminarlos.</li>
      </ul>

      <p>
        Ya sea que estés organizando una pequeña reunión o un gran evento, esta página te proporciona todas las herramientas necesarias para hacerlo 
        de forma organizada y sin estrés.
      </p>
        
      <p>
        ¡Regístrate <strong><a href="/registro"> aquí </a></strong>y comienza a gestionar tus eventos!
      </p>
    </div>
  );
};

export default HomePage;

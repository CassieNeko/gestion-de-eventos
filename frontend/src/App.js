import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'; 
import theme from './styles/theme'; 
import Header from './components/Header';
import Footer from './components/footer'; 
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegistroPage from './pages/RegistroPage';
import EventosPage from './pages/EventosPage';
import './App.css';

function App() {
  const clearEvents = () => {
   
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Header onLogout={clearEvents} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registro" element={<RegistroPage />} />
            <Route path="/eventos" element={<EventosPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;

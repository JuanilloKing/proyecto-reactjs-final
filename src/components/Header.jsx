import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; 
import { UserContext } from '../context/UserContext'; 
import Button from './Button';
import './Header.css';

const Header = () => {
  const { userName } = useContext(UserContext);

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="store-name">Dokkan Dragon Characters Simulator</h1>
        <nav className="nav">
          <ul>
            <li><Button to="/" className="nav-button">Inicio</Button></li>
            <li>
              {userName ? (
                <span style={{ display: 'block', marginTop: '15px' }}>👤 {userName}</span> // Se muestra el nombre del usuario
              ) : (
                <Button to="/login" className="nav-button">Iniciar sesión</Button>
              )}
            </li>
            <li><Button to="/add-character" className="nav-button">Añadir personajes</Button></li>
            <li><Button onClick={() => window.open('https://dokkan.wiki', '_blank')} className="nav-button">DokkanWiki</Button></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

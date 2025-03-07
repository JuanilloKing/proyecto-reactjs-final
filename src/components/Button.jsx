import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css'; // Estilos del botón

const Button = ({ children, onClick, to, className = '' }) => {
  return to ? (
    <Link to={to} className={`button ${className}`}>
      {children}
    </Link>
  ) : (
    <button onClick={onClick} className={`button ${className}`}>
      {children}
    </button>
  );
};

export default Button;

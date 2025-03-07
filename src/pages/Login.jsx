import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './Login.css';

const Login = () => {
  const { setUserName } = useContext(UserContext);
  const navigate = useNavigate();

  // Estados para los campos y los errores
  const [gameId, setGameId] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({ gameId: '', name: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let newErrors = { gameId: '', name: '' };

    // Validación de campos vacíos
    if (!gameId.trim()) {
      newErrors.gameId = 'Debes rellenar este campo';
    }
    if (!name.trim()) {
      newErrors.name = 'Debes rellenar este campo';
    }

    // Si hay errores, actualizamos el estado y no enviamos el formulario
    if (newErrors.gameId || newErrors.name) {
      setErrors(newErrors);
      return;
    }

    // Intentar guardar el nombre del usuario en el contexto y redirigir
    try {
      // Guardar el nombre del usuario en el contexto
      setUserName(name);

      // Redirigir a la página principal
      navigate('/');
    } catch (error) {
      // Si hay un error, lo capturamos y mostramos un mensaje
      console.error('Error al iniciar sesión:', error);
      // Puedes establecer un error en el estado para mostrarlo en la interfaz
      setErrors({ ...newErrors, name: 'Ocurrió un error al iniciar sesión. Inténtalo nuevamente.' });
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ID del juego:</label>
          <input 
            type="text" 
            value={gameId} 
            onChange={(e) => setGameId(e.target.value)} 
          />
          {errors.gameId && <span className="error-text">{errors.gameId}</span>}
        </div>

        <div className="form-group">
          <label>Nombre:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;

import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import charactersData from '../data/personajes.json';
import mySong from '../assets/DragonballSummon.mp3';

const OtherPage = () => {
  const { addToCart, cart } = React.useContext(CartContext);
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const location = useLocation();
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Simula carga de 1 segundo

    if (location.pathname === "/add-character") {
      audioRef.current.play().catch((error) => console.log("Reproducción bloqueada:", error));
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [location]);

  const handleGoToCart = () => {
    navigate('/cart');
  };

  const isMaxQuantityReached = (character) => {
    const cartItem = cart.find(item => item.name === character.name);
    return cartItem && cartItem.quantity >= 5;
  };

  return (
    <div className="other-page" style={{ display: 'flex', gap: '20px' }}>
      <audio ref={audioRef} src={mySong} loop style={{ display: 'none' }} />

      {/*  Muestra "Cargando..." en el centro de la pantalla */}
            {loading ? (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column', // Para apilar elementos verticalmente
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '2rem',
          fontWeight: 'bold',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          zIndex: 9999,
        }}>
          <p>Cargando...</p>
          <img 
            src="../src/cargando.png" 
            alt="Cargando"
            style={{ width: '100px', height: '150px', marginTop: '20px' }} 
          />
        </div>
        ) : (
        <>
          <section className="characters-list" style={{ flex: 2 }}>
            <h3>Personajes Disponibles</h3>
            <div className="characters" style={{ display: 'flex', flexWrap: 'wrap' }}>
              {charactersData.map((character, index) => (
                <div key={index} className="character" style={{ padding: '10px', border: '1px solid gray' }}>
                  <img src={character.imageURL} alt={character.name} />
                  <h4>{character.name}</h4>
                  <button 
                    onClick={() => addToCart(character)} 
                    disabled={isMaxQuantityReached(character)}
                  >
                    Añadir al carrito
                  </button>
                </div>
              ))}
            </div>
          </section>

          <aside className="cart" style={{ flex: 1, border: '1px solid black', padding: '10px' }}>
            <h3>🛒 Carrito</h3>
            {cart.length === 0 ? (
              <p>El carrito está vacío</p>
            ) : (
              <div>
                <h4>Productos en tu carrito:</h4>
                <ul>
                  {cart.map((item, index) => (
                    <li key={index}>
                      {item.name} (x{item.quantity}) {item.quantity >= 5 && '(reinbow)'}
                    </li>
                  ))}
                </ul>
                <button onClick={handleGoToCart}>Ver Carrito</button>
              </div>
            )}
          </aside>
        </>
      )}
    </div>
  );
};

export default OtherPage;

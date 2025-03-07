import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

// Componente funcional Cart
const Cart = () => {
  // Obtener el contexto del carrito y las funciones para manipularlo
  const { cart, removeFromCart, addOneToCart, vaciarCarrito } = useContext(CartContext);
  const navigate = useNavigate();

  // Función para manejar la finalización de la compra de forma asincrónica
  const handleFinalizePurchase = async () => {
    try {
      alert('¡Su compra ha sido procesada correctamente!');
      
      // Aquí podrías hacer alguna operación asincrónica (por ejemplo, una API call)
      await vaciarCarrito(); // Esperamos a que se vacíe el carrito antes de navegar
      
      // Una vez vacíado el carrito, redirigimos al usuario
      navigate('/');
    } catch (error) {
      console.error('Error procesando la compra: ', error);
      alert('Hubo un problema procesando su compra. Por favor, intente de nuevo más tarde.');
    }
  };

  // Calcular el total de personajes comprados
  const totalCharacters = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="cart-page">
      <h2>Tu Carrito</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                <img src={item.imageURL} alt={item.name} width="50" />
                {item.name} {item.class} {item.type} {item.rarity} - 
                {item.quantity === 5 ? <span className="rainbow-text">reinbow</span> : `${item.quantity} unidad(es)`}
                <button onClick={async () => {
                  try {
                    await removeFromCart(item.name); // Esperamos a que se elimine el ítem
                  } catch (error) {
                    console.error('Error eliminando el artículo: ', error);
                    alert('Hubo un error al eliminar el artículo. Intenta nuevamente.');
                  }
                }}>Eliminar 1</button>
                <button 
                  onClick={async () => {
                    try {
                      await addOneToCart(item.name); // Esperamos a que se añada 1 más
                    } catch (error) {
                      console.error('Error añadiendo el artículo: ', error);
                      alert('Hubo un error al añadir el artículo. Intenta nuevamente.');
                    }
                  }} 
                  disabled={item.quantity === 5}
                >
                  Añadir 1 más
                </button>
              </li>
            ))}
          </ul>

          <p>Total de personajes comprados: {totalCharacters}</p>

          <button onClick={() => navigate('/add-character')} style={{ marginTop: '10px' }}>
            Volver a añadir personajes
          </button>

          <button 
            onClick={handleFinalizePurchase} 
            style={{ marginTop: '10px', backgroundColor: 'green', color: 'white' }}
          >
            Finalizar Compra
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;

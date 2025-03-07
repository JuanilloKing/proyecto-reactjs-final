import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; 
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import OtherPage from './pages/OtherPage';
import Cart from './pages/Cart';
import Login from './pages/Login';

function App() {
  return (
    <CartProvider> {/* Envuelve toda la aplicación con CartProvider */}
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Página de inicio */}
          <Route path="/add-character" element={<OtherPage />} /> {/* Página para añadir personajes */}
          <Route path="/cart" element={<Cart />} /> {/* Ruta para el carrito */}
          <Route path="/login" element={<Login />} /> {/* Ruta para el login */}
        </Routes>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;

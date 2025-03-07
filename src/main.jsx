import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { CartProvider } from './context/CartContext'; // Importa el contexto del carrito
import { BrowserRouter } from 'react-router-dom'; // Importa React Router
import { UserProvider } from "./context/UserContext";
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* ✅ Envolver dentro de BrowserRouter */}
      <CartProvider> {/* ✅ El contexto envuelve toda la app */}
        <UserProvider>
        <App />
        </UserProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);

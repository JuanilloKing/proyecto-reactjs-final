import React, { useEffect, useRef } from 'react';
import videoHome from '../videoHome.mp4';
import './HomePage.css';

const HomePage = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Función para manejar la reproducción del video con promesa
    const handleVideoPlayback = () => {
      const video = videoRef.current;

      if (video) {
        // Intentamos reproducir el video
        video.play().catch((error) => {
          // Si ocurre un error (como la reproducción bloqueada), se maneja aquí
          console.log('Error al reproducir el video:', error);
          alert('No se pudo reproducir el video correctamente.');
        });
      }
    };

    // Llamamos a la función para intentar reproducir el video
    handleVideoPlayback();
  }, []);

  return (
    <div className="homepage">
      <h2>Bienvenido a la tienda de personajes Dokkan!</h2>
      
      {/* Video Local */}
      <video 
        ref={videoRef}
        src={videoHome} 
        autoPlay 
        loop 
        muted 
        controls
        className="homepage-video"
      />

      <h3>Página web no oficial</h3>
    </div>
  );
};

export default HomePage;

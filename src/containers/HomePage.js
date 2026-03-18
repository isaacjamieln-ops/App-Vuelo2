import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "./HomePage.css";
import videoLocal from "../images/viajeseguro.mp4";

function HomePage() {
  const images = [
    "https://blog.localadventures.mx/wp-content/uploads/2017/12/vuelos-baratos-paginas-b.jpg",
    "https://cdn.forbes.com.mx/2020/10/shutterstock_1206167314-res.jpg",
    "https://venecia.travel/wp-content/uploads/2019/08/portada-venecia-travel.jpg",
    "https://cdn.forbes.com.mx/2017/09/Viajar-no-tiene-por-qu%C3%A9-ser-un-problema-para-tus-negocios.-e1632418586990.jpg",
    "https://www.peru.travel/Contenido/General/Imagen/es/643/1.1/lima-plaza-de-armas-consejos.jpg",
    "https://www.civitatis.com/f/mexico/los-cabos/los-cabos.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="app-container">
      {/* HEADER */}
      <div className="header">
        <h1 className="app-title">Viaje Seguro</h1>
      </div>

      {/* BUSCADOR */}
      <div className="search-card">
        <input type="text" placeholder="Destino" className="search-input" />
        <input type="date" className="search-input" />
        <select className="search-input">
          <option>1 Persona</option>
          <option>2 Personas</option>
          <option>3 Personas</option>
          <option>4 Personas</option>
        </select>
        <button className="search-button">Buscar</button>
      </div>

      {/* VIDEO */}
      <div className="video-container">
        <video controls autoPlay muted loop>
          <source src={videoLocal} type="video/mp4" />
          Tu navegador no soporta video.
        </video>
      </div>

      {/* CARRUSEL */}
      <div className="carousel">
        <button className="carousel-btn left" onClick={prevSlide}>
          &#10094;
        </button>
        <div className="carousel-slide-wrapper">
          <div
            className="carousel-slide"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {images.map((img, i) => (
              <img key={i} src={img} alt={`slide${i + 1}`} />
            ))}
          </div>
        </div>
        <button className="carousel-btn right" onClick={nextSlide}>
          &#10095;
        </button>
      </div>

      {/* DESCRIPCIÓN */}
      <div className="description">
        <h2>Descubre tu próximo destino</h2>
        <p>
          Encuentra los mejores lugares para viajar con seguridad, comodidad y al mejor precio.
          Explora destinos increíbles, planifica tu viaje y vive experiencias únicas.
        </p>
      </div>

      {/* PARALLAX */}
      <div className="parallax-section">
        <div className="parallax-overlay">

          <div className="description">
            <h2>Viajes Especiales</h2>
            <p>
              Vive experiencias únicas con nuestros viajes. Descubre destinos increíbles,
              desde escapadas románticas hasta aventuras inolvidables.
            </p>
          </div>

          {/* 🔥 CARDS CORREGIDAS */}
<div className="cards-container">

  <div className="card-pro">
    <img src="https://e1.pxfuel.com/desktop-wallpaper/540/741/desktop-wallpaper-sunset-view-of-wonder-chichen-itza-in-mexico-chichen-itza.jpg" alt="M1"/>
    <div className="card-content">
      <div className="card-title">Chichén Itzá</div>
      <div className="card-desc">Maravilla del mundo en México</div>
    </div>
  </div>

  <div className="card-pro">
    <img src="https://cdn.britannica.com/86/170586-050-AB7FEFAE/Taj-Mahal-Agra-India.jpg" alt="M2"/>
    <div className="card-content">
      <div className="card-title">Taj Mahal</div>
      <div className="card-desc">Icono del amor en India</div>
    </div>
  </div>

  <div className="card-pro">
    <img src="https://content-viajes.nationalgeographic.com.es/medio/2024/09/19/coliseo_9b206d89_240919151753_1280x853.jpg" alt="M3"/>
    <div className="card-content">
      <div className="card-title">Coliseo</div>
      <div className="card-desc">Historia viva en Roma</div>
    </div>
  </div>

  <div className="card-pro">
    <img src="https://historia.nationalgeographic.com.es/medio/2025/02/19/gran-muralla-china_01cbe21a_250219111818_1280x853.webp" alt="M4"/>
    <div className="card-content">
      <div className="card-title">Muralla China</div>
      <div className="card-desc">La gran obra milenaria</div>
    </div>
  </div>

  <div className="card-pro">
    <img src="https://th.bing.com/th/id/R.51a6096e0307871749ad63dab3627439?rik=JqjgM%2bWL0z9xgA&pid=ImgRaw&r=0" alt="M5"/>
    <div className="card-content">
      <div className="card-title">Machu Picchu</div>
      <div className="card-desc">La joya de Perú</div>
    </div>
  </div>

</div>
        </div>
      </div>

      {/* NAVBAR */}
      <Navbar />
    </div>
  );
}

export default HomePage;
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchSelect from "../components/SearchSelect";
import "./HomePage.css";
import videoLocal from "../images/viajeseguro.mp4";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";  // ✅ SOLO AGREGAR ESTA LÍNEA

/* 🔥 COMPONENTE DIVIDER */
const Divider = ({ text }) => {
  return (
    <div className="section-divider">
      <div className="divider-content">
        <div className="divider-line" />
        <span>{text}</span>
      </div>
    </div>
  );
};

function HomePage() {
  const navigate = useNavigate();
  
  // ✅ Estado para las ciudades desde MongoDB
  const [cities, setCities] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loadingCities, setLoadingCities] = useState(true);
  const [selectedCity, setSelectedCity] = useState(null);
  
  // ✅ Estado para el buscador
  const [searchDate, setSearchDate] = useState("");
  const [searchTravelers, setSearchTravelers] = useState("1");

  const images = [
    "https://blog.localadventures.mx/wp-content/uploads/2017/12/vuelos-baratos-paginas-b.jpg",
    "https://cdn.forbes.com.mx/2020/10/shutterstock_1206167314-res.jpg",
    "https://venecia.travel/wp-content/uploads/2019/08/portada-venecia-travel.jpg",
    "https://cdn.forbes.com.mx/2017/09/Viajar-no-tiene-por-qu%C3%A9-ser-un-problema-para-tus-negocios.-e1632418586990.jpg",
    "https://www.peru.travel/Contenido/General/Imagen/es/643/1.1/lima-plaza-de-armas-consejos.jpg",
    "https://www.civitatis.com/f/mexico/los-cabos/los-cabos.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ FETCH CIUDADES DESDE BACKEND (con API_URL)
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(`${API_URL}/cities`);  // ✅ SOLO CAMBIAR ESTA LÍNEA
        if (response.ok) {
          const data = await response.json();
          setCities(data);
          setDestinations(data);
          setLoadingCities(false);
        } else {
          console.error('Error fetching cities');
          setLoadingCities(false);
        }
      } catch (error) {
        console.error('Error de conexión:', error);
        setLoadingCities(false);
      }
    };
    
    fetchCities();
  }, []);

  // ✅ MANEJAR SELECCIÓN DE DESTINO
  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  // ✅ MANEJAR BÚSQUEDA
  const handleSearch = () => {
    if (selectedCity) {
      navigate(`/places?search=${encodeURIComponent(selectedCity.name)}`);
    } else {
      navigate('/places');
    }
  };

  // ✅ EXPLORAR DESTINOS
  const handleExploreDestinations = () => {
    navigate('/places');
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  /* 🔥 FADE-IN AL HACER SCROLL */
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="app-container">

      {/* HEADER */}
      <div className="header fade-in">
        <h1 className="app-title">Viaje Seguro</h1>
      </div>

      {/* BUSCADOR CON SELECTOR INTEGRADO */}
      <div className="search-card fade-in">
        {/* SELECTOR DE DESTINO CON BÚSQUEDA */}
        <div className="search-select-wrapper">
          <SearchSelect
            options={cities}
            placeholder="Selecciona un destino ✈️"
            onSelect={handleCitySelect}
            value={selectedCity}
          />
        </div>
        
        <input 
          type="date" 
          className="search-input"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        
        <select 
          className="search-input"
          value={searchTravelers}
          onChange={(e) => setSearchTravelers(e.target.value)}
        >
          <option>1 Persona</option>
          <option>2 Personas</option>
          <option>3 Personas</option>
          <option>4 Personas</option>
        </select>
        
        <button className="search-button" onClick={handleSearch}>
          Buscar
        </button>
      </div>

      {/* TEMPERATURA - SECCIÓN CLIMA */}
      {!loadingCities && cities.length > 0 && (
        <div className="weather-section fade-in">
          <div className="weather-card">
            <div className="weather-icon">🌡️</div>
            <div className="weather-temp">10°C</div>
            <div className="weather-location">
              {cities[Math.floor(Math.random() * cities.length)].name}
            </div>
            <div className="weather-desc">Temperatura promedio</div>
          </div>
        </div>
      )}

      {/* VIDEO */}
      <div className="video-container fade-in">
        <video controls autoPlay muted loop preload="none" playsInline>
          <source src={videoLocal} type="video/mp4" />
          Tu navegador no soporta video.
        </video>
      </div>

      {/* DESCRIPCIÓN */}
      <div className="description fade-in">
        <h2>Descubre tu próximo destino</h2>
        <p>
          Encuentra los mejores lugares para viajar con seguridad, comodidad y al mejor precio.
          Explora destinos increíbles, planifica tu viaje y vive experiencias únicas.
        </p>
      </div>

      {/* CARRUSEL */}
      <div className="carousel fade-in">
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
              <img key={i} src={img} alt={`slide${i + 1}`} loading="lazy" />
            ))}
          </div>
        </div>

        <button className="carousel-btn right" onClick={nextSlide}>
          &#10095;
        </button>
      </div>

      {/* PARALLAX */}
      <div className="parallax-section fade-in">
        <div className="parallax-overlay">

          <div className="description">
            <h2>Viajes Especiales</h2>
            <p>
              Vive experiencias únicas con nuestros viajes. Descubre destinos increíbles,
              desde escapadas románticas hasta aventuras inolvidables.
            </p>
          </div>

          {/* DIVIDER */}
          <Divider text="Explora el mundo con nosotros" />

          {/* CARDS */}
          <div className="cards-container">

            <div className="card-pro">
              <div className="skeleton"></div>
              <img
                src="https://e1.pxfuel.com/desktop-wallpaper/540/741/desktop-wallpaper-sunset-view-of-wonder-chichen-itza-in-mexico-chichen-itza.jpg"
                alt="M1"
                loading="lazy"
                className="img-blur"
                onLoad={(e) => {
                  e.target.classList.add("loaded");
                  e.target.previousSibling.style.display = "none";
                }}
              />
              <div className="card-content">
                <div className="card-title">Chichén Itzá</div>
                <div className="card-desc">Maravilla del mundo en México</div>
              </div>
            </div>

            <div className="card-pro">
              <div className="skeleton"></div>
              <img
                src="https://cdn.britannica.com/86/170586-050-AB7FEFAE/Taj-Mahal-Agra-India.jpg"
                alt="M2"
                loading="lazy"
                className="img-blur"
                onLoad={(e) => {
                  e.target.classList.add("loaded");
                  e.target.previousSibling.style.display = "none";
                }}
              />
              <div className="card-content">
                <div className="card-title">Taj Mahal</div>
                <div className="card-desc">Icono del amor en India</div>
              </div>
            </div>

            <div className="card-pro">
              <div className="skeleton"></div>
              <img
                src="https://content-viajes.nationalgeographic.com.es/medio/2024/09/19/coliseo_9b206d89_240919151753_1280x853.jpg"
                alt="M3"
                loading="lazy"
                className="img-blur"
                onLoad={(e) => {
                  e.target.classList.add("loaded");
                  e.target.previousSibling.style.display = "none";
                }}
              />
              <div className="card-content">
                <div className="card-title">Coliseo</div>
                <div className="card-desc">Historia viva en Roma</div>
              </div>
            </div>

            <div className="card-pro">
              <div className="skeleton"></div>
              <img
                src="https://historia.nationalgeographic.com.es/medio/2025/02/19/gran-muralla-china_01cbe21a_250219111818_1280x853.webp"
                alt="M4"
                loading="lazy"
                className="img-blur"
                onLoad={(e) => {
                  e.target.classList.add("loaded");
                  e.target.previousSibling.style.display = "none";
                }}
              />
              <div className="card-content">
                <div className="card-title">Muralla China</div>
                <div className="card-desc">La gran obra milenaria</div>
              </div>
            </div>

            <div className="card-pro">
              <div className="skeleton"></div>
              <img
                src="https://th.bing.com/th/id/R.51a6096e0307871749ad63dab3627439?rik=JqjgM%2bWL0z9xgA&pid=ImgRaw&r=0"
                alt="M5"
                loading="lazy"
                className="img-blur"
                onLoad={(e) => {
                  e.target.classList.add("loaded");
                  e.target.previousSibling.style.display = "none";
                }}
              />
              <div className="card-content">
                <div className="card-title">Machu Picchu</div>
                <div className="card-desc">La joya de Perú</div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* DIVIDER */}
      <Divider text="Viajar nunca fue tan fácil" />

      {/* PARALLAX 2 */}
      <div className="parallax-section-2 fade-in">
        <div className="parallax-overlay-alt">

          <h2>¿Por qué viajar con nosotros?</h2>

          <div className="benefits">
            <div className="benefit-card">✈️ Mejores precios garantizados</div>
            <div className="benefit-card">🌍 Destinos en todo el mundo</div>
            <div className="benefit-card">🔒 Viajes seguros y confiables</div>
            <div className="benefit-card">⚡ Reservas rápidas</div>
          </div>

          <button className="cta-button" onClick={handleExploreDestinations}>
            Explorar destinos
          </button>

        </div>
      </div>

      {/* DIVIDER */}
      <Divider text="Miles de experiencias te esperan" />

      {/* PARALLAX 3 */}
      <div className="parallax-section-3 fade-in">
        <div className="parallax-overlay-alt">

          <h2>Tu aventura comienza aquí</h2>
          <p>
            No solo viajes… vive experiencias únicas, descubre culturas y crea recuerdos inolvidables.
          </p>

          <button className="cta-button" onClick={handleExploreDestinations}>
            Planear mi viaje
          </button>

        </div>
      </div>

      {/* DIVIDER */}
      <Divider text="Lo que dicen nuestros viajeros" />

      {/* PARALLAX 4 */}
      <div className="parallax-section-4 fade-in">
        <div className="parallax-overlay-alt">

          <h2>Lo que dicen nuestros viajeros</h2>

          <div className="testimonials">
            <div className="testimonial">“Una experiencia increíble, todo fue perfecto.”</div>
            <div className="testimonial">“Encontré vuelos baratos y sin complicaciones.”</div>
            <div className="testimonial">“Definitivamente volveré a usar esta app.”</div>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <div className="footer fade-in">
        <p>© 2026 Viaje Seguro ✈️</p>
      </div>

      {/* NAVBAR */}
      <Navbar />

    </div>
  );
}

export default HomePage;
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Weather from "./Weather";
import Navbar from "../components/Navbar";
import "./WeatherPage.css";

function WeatherPage() {
const location = useLocation();
const navigate = useNavigate();

// 🔥 estado inicial vacío
const [city, setCity] = React.useState(null);

// 🔥 detectar navegación o storage
React.useEffect(() => {
  if (location.state?.city) {
    setCity(location.state.city);
    localStorage.setItem("lastCity", location.state.city);
  } else {
    const savedCity = localStorage.getItem("lastCity");
    if (savedCity) {
      setCity(savedCity);
    }
  }
}, [location.state]);

  // 🔥 Imágenes por ciudad (RESPETADAS)
  const cityImages = {
    Tokyo: "https://travelgranadatour.com/wp-content/uploads/2018/09/destination-tokyo-01-1280x854.jpg",
    Paris: "https://www.latamairlines.com/content/dam/latamxp/sites/vamos-latam/news-francia-abr-2024/paris-en-ruta/Paris-3.png",
    "New York": "https://www.civitatis.com/f/estados-unidos/nueva-york/galeria/carteles-publicitarios-times-square.jpg",
    London: "https://res.cloudinary.com/dtljonz0f/image/upload/c_fill,w_3840,g_auto/f_auto/q_auto:eco/v1/londres-shutterstock_583939735_zxwj4p?_a=BAVAZGDY0",
    "Mexico City": "https://traveler.marriott.com/es/wp-content/uploads/sites/2/2021/11/Mexico-City-GI-1064279806.jpg",
    Berlin: "https://www.alpadia.com/sites/default/files/styles/hero_banner_md/public/school/featured/berlin-school-hero-1.jpg?itok=tAS8nW9K",
    Madrid: "https://www.civitatis.com/f/pseo/espana/madrid/gran-via-noche-madrid-1200.jpg",
    Rome: "https://content.r9cdn.net/rimg/dimg/7f/2e/d82165ea-city-25465-16e7e859ccc.jpg?crop=true",
    Seoul: "https://www.agoda.com/wp-content/uploads/2024/08/Namsan-Tower-during-autumn-in-Seoul-South-Korea-1244x700.jpg",
    Toronto: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad"
  };

  const image =
    cityImages[city] ||
    "https://images.pexels.com/photos/327269/pexels-photo-327269.jpeg";

  // 🔥 Lugares turísticos
  const touristSpots = {
    Tokyo: "Shibuya Crossing 🏙️",
    Paris: "Torre Eiffel 🗼",
    "New York": "Central Park 🌳",
    London: "Big Ben ⏰",
    "Mexico City": "Zócalo 🏛️",
    Rome: "Coliseo 🏛️",
    Madrid: "Gran Vía 🌆",
    Berlin: "Puerta de Brandeburgo 🏰",
    Seoul: "Namsan Tower 🗼",
    Toronto: "CN Tower 🏙️"
  };

  const handleBack = () => {
  localStorage.removeItem("lastCity");
  navigate("/places");
};

  // 🔴 SI NO HAY CIUDAD → PANTALLA VACÍA
  if (!city) {
    return (
      <div className="weather-page empty-state">
        <div className="empty-content">
          <div className="empty-icon">🗺️</div>
          <h1>No hay clima seleccionado</h1>
          <p>Selecciona una ciudad desde la sección de destinos</p>

          <button onClick={() => navigate("/places")}>
            Explorar destinos
          </button>
        </div>

        <Navbar />
      </div>
    );
  }

  return (
    <div className="weather-page">

      {/* 🔥 HERO */}
      <div
        className="weather-hero"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="overlay">
          <h1>{city}</h1>
          <p>Clima en tiempo real</p>
        </div>
      </div>

      {/* 🌡️ CLIMA */}
      <div className="weather-main">
        <Weather city={city} />
      </div>

      {/* 🌍 INFO */}
      <div className="weather-extra">
        <h2>Zona turística</h2>
        <p>{touristSpots[city]}</p>
      </div>

      {/* 🔙 BOTÓN */}
      <div className="weather-actions">
        <button onClick={handleBack}>
  ← Volver a destinos
</button>
      </div>

      <Navbar />
    </div>
  );
}

export default WeatherPage;
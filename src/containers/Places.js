import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchCities } from '../store/actions/cityActions';
import Navbar from '../components/Navbar';
import SearchSelect from '../components/SearchSelect';
import Weather from '../containers/Weather';
import './Places.css';

function Places() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  
  // ✅ Redux
  const { cities, loading, error } = useSelector((state) => state.cities);
  
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  // 🔥 CACHE GLOBAL DE CLIMA
  const [weatherCache, setWeatherCache] = useState({});

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');

  // 📸 Imágenes
  const cityImages = {
  Tokyo: "https://content.r9cdn.net/rimg/dimg/10/dd/c1632a46-city-20339-15873436110.jpg?width=1366&height=768&xhint=792&yhint=1072&crop=true",
  Paris: "https://tipsparatuviaje.com/wp-content/uploads/2019/07/museo-del-louvre.jpg",
  "New York": "https://media.tacdn.com/media/attractions-splice-spp-674x446/07/3b/51/37.jpg",
  Berlin: "https://www.riu.com/blog/wp-content/uploads/2023/06/torre-de-la-television-berlin.jpg",
  Madrid: "https://images.trvl-media.com/place/178281/0a4a7d40-8887-4ad8-87fb-ec37a1256d9a.jpg",
  Rome: "https://i0.wp.com/www.touristitaly.com/wp-content/uploads/2023/03/Trevi-Fountain-rome-2-scaled.jpg?fit=4272%2C2848&ssl=1",
  London: "https://res.cloudinary.com/aenetworks/image/upload/c_fill,ar_2,w_3840,h_1920,g_auto/dpr_auto/f_auto/q_auto:eco/v1/topic-london-gettyimages-760251843-feature?_a=BAVAZGB00",
  Seoul: "https://www.agoda.com/wp-content/uploads/2019/03/Seoul-attractions-Gyeongbokgung-palace.jpg",
  Toronto: "https://images.trvl-media.com/place/6072459/d020ad34-c7e9-4472-8927-846a6a7d5bfd.jpg",
  "Mexico City": "https://www.civitatis.com/blog/wp-content/uploads/2022/12/zocalo-ciudad-mexico-noche.jpg"
  };

  const getCityImage = (cityName) => {
    return cityImages[cityName] || 'https://www.lifeder.com/wp-content/uploads/2021/10/clima-tipos.jpg';
  };

  // 🚀 Cargar ciudades
  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  // 🔎 Filtrado
  useEffect(() => {
    if (cities.length > 0) {
      if (searchQuery) {
        const filtered = cities.filter(city => 
          city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          city.country.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCities(filtered);

        const foundCity = cities.find(
          city => city.name.toLowerCase() === searchQuery.toLowerCase()
        );

        if (foundCity) setSelectedCity(foundCity);
      } else {
        setFilteredCities(cities);
      }
    }
  }, [cities, searchQuery]);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    navigate(`/places?search=${encodeURIComponent(city.name)}`);
  };

  // ⏳ Loading
  if (loading) {
    return (
      <div className="places-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Cargando destinos increíbles...</p>
        </div>
        <Navbar />
      </div>
    );
  }

  // ❌ Error
  if (error) {
    return (
      <div className="places-container">
        <div className="error-container">
          <div className="error-icon">❌</div>
          <h3>Error de conexión</h3>
          <p>{error}</p>
          <button
            className="error-btn"
            onClick={() => dispatch(fetchCities())}
          >
            Reintentar
          </button>
        </div>
        <Navbar />
      </div>
    );
  }

  // ✅ UI
  return (
    <div className="places-container">

      {/* HEADER */}
      <div className="places-header">
        <h1 className="places-title">🌍 Destinos</h1>
        <p className="places-subtitle">
          Explora las ciudades más increíbles del mundo
        </p>
      </div>

      {/* SELECT */}
      <div className="places-search-section">
        <SearchSelect
          options={cities}
          placeholder="Selecciona un destino ✈️"
          onSelect={handleCitySelect}
          value={selectedCity}
          className="places-search-select"
        />
      </div>

      {/* GRID */}
      <div className="cities-grid-container">
        {filteredCities.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <p>No se encontraron ciudades</p>
          </div>
        ) : (
          filteredCities.map((city) => (
            <div className="city-card-solid" key={city._id}>

              <div className="city-card-image">
                <img
                  src={getCityImage(city.name)}
                  alt={city.name}
                  className="city-img"
                />
                <div className="city-card-overlay"></div>
              </div>

              <div className="city-card-content">
                <h3>{city.name}</h3>
                <p>{city.country}</p>

                {/* 🌡️ WEATHER CON CACHE */}
                <div className="city-weather-mini">
                  <Weather
                    city={city.name}
                    compact={true}
                    cache={weatherCache}
                    setCache={setWeatherCache}
                  />
                </div>

                <div className="city-card-footer">

                  {/* 💰 PRECIO */}
                  <span className="city-card-price">
                    Desde ${Math.floor(Math.random() * 500) + 200}
                  </span>

                  {/* 🔥 BOTÓN ORIGINAL */}
                  <button
                    className="city-card-btn"
                    onClick={() =>
                      navigate(`/landing/${encodeURIComponent(city.name)}`)
                    }
                  >
                    Explorar
                  </button>

                  {/* 🌡️ BOTÓN CLIMA */}
                  <button
                    className="city-card-btn weather-btn"
                    onClick={() =>
                      navigate("/weather", {
                        state: { city: city.name },
                      })
                    }
                  >
                    Clima
                  </button>

                </div>
              </div>

            </div>
          ))
        )}
      </div>

      <Navbar />
    </div>
  );
}

export default Places;
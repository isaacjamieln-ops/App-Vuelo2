import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SearchSelect from '../components/SearchSelect';
import './Places.css';
import { API_URL } from '../config';  // ✅ SOLO AGREGAR ESTA LÍNEA

function Places() {
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');

  // Imágenes para cada ciudad
  const cityImages = {
    'Tokyo': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dG9raW98ZW58MHx8MHx8fDA%3D',
    'Paris': 'https://img.freepik.com/fotos-premium/torre-eiffel-paris-horizonte-francia_79295-14918.jpg?semt=ais_hybrid&w=740&q=80',
    'New York': 'https://t3.ftcdn.net/jpg/01/91/74/46/360_F_191744672_HYfG0261FemsGK5WZWX868BokvbHNmqV.jpg',
    'Berlin': 'https://images8.alphacoders.com/383/thumb-1920-383973.jpg',
    'Madrid': 'https://media.istockphoto.com/id/1303417572/photo/madrid-spain-sunrise-city-skyline-at-cibeles-fountain-town-square.jpg?s=612x612&w=0&k=20&c=mJXD6W_jSGLjz-uIkPEKOd0TOsWHG4GXL_2zCaXhQkg=',
    'Rome': 'https://p0.piqsels.com/preview/648/476/945/rome-italy-evening-puddle.jpg',
    'London': 'https://c4.wallpaperflare.com/wallpaper/639/936/902/big-ben-in-london-at-sunset-uk-landscape-photography-4k-ultra-hd-desktop-wallpapers-for-computers-laptop-tablet-and-mobile-phones-3840%C3%972160-wallpaper-preview.jpg',
    'Seoul': 'https://wallpapers.com/images/hd/south-korean-cultural-landmark-rjt5zcdxz1y8qep8.jpg',
    'Toronto': 'https://images.alphacoders.com/567/thumb-1920-567999.jpg',
    'Mexico City': 'https://p4.wallpaperbetter.com/wallpaper/547/779/771/building-mexico-city-mexico-square-wallpaper-preview.jpg'
  };

  const getCityImage = (cityName) => {
    return cityImages[cityName] || 'https://images.pexels.com/photos/327269/pexels-photo-327269.jpeg';
  };

  const fetchCities = async () => {
    try {
      const response = await fetch(`${API_URL}/cities`);  // ✅ SOLO CAMBIAR ESTA LÍNEA
      if (!response.ok) {
        throw new Error('Error al obtener las ciudades');
      }
      const data = await response.json();
      setCities(data);
      
      if (searchQuery) {
        const filtered = data.filter(city => 
          city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          city.country.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCities(filtered);
        const foundCity = data.find(city => city.name.toLowerCase() === searchQuery.toLowerCase());
        if (foundCity) setSelectedCity(foundCity);
      } else {
        setFilteredCities(data);
      }
      
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, [searchQuery]);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    navigate(`/places?search=${encodeURIComponent(city.name)}`);
  };

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

  if (error) {
    return (
      <div className="places-container">
        <div className="error-container">
          <div className="error-icon">❌</div>
          <h3>Error de conexión</h3>
          <p>{error}</p>
          <p>¿Está corriendo el backend en puerto 5000?</p>
          <button className="error-btn" onClick={() => window.location.reload()}>
            Reintentar
          </button>
        </div>
        <Navbar />
      </div>
    );
  }

  return (
    <div className="places-container">
      {/* HEADER */}
      <div className="places-header">
        <h1 className="places-title">🌍 Destinos</h1>
        <p className="places-subtitle">Explora las ciudades más increíbles del mundo</p>
      </div>

      {/* SELECTOR CON BÚSQUEDA */}
      <div className="places-search-section">
        <SearchSelect
          options={cities}
          placeholder="Selecciona un destino ✈️"
          onSelect={handleCitySelect}
          value={selectedCity}
          className="places-search-select"
        />
      </div>

      {/* TEMPERATURA */}
      {!loading && cities.length > 0 && (
        <div className="weather-banner">
          <div className="weather-card-simple">
            <span className="weather-icon">🌡️</span>
            <span className="weather-temp">10°C</span>
            <span className="weather-location">
              {selectedCity ? selectedCity.name : cities[Math.floor(Math.random() * cities.length)].name}
            </span>
            <span className="weather-desc">Temperatura promedio</span>
          </div>
        </div>
      )}

      {/* GRID DE CIUDADES */}
      <div className="cities-grid-container">
        {filteredCities.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <p>No se encontraron ciudades que coincidan con "{searchQuery || 'tu búsqueda'}"</p>
          </div>
        ) : (
          filteredCities.map((city) => (
            <div className="city-card-solid" key={city._id}>
              <div className="city-card-image">
                <img 
                  src={getCityImage(city.name)} 
                  alt={city.name}
                  className="city-img"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://images.pexels.com/photos/327269/pexels-photo-327269.jpeg';
                  }}
                />
                <div className="city-card-overlay"></div>
              </div>
              <div className="city-card-content">
                <h3 className="city-card-name">{city.name}</h3>
                <p className="city-card-country">{city.country}</p>
                <div className="city-card-footer">
                  <span className="city-card-price">Desde ${Math.floor(Math.random() * 500) + 200}</span>
                  <button className="city-card-btn">Explorar</button>
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
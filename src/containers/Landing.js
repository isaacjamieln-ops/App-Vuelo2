import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { fetchItinerariesByCityName } from '../store/actions/itineraryActions';
import Navbar from '../components/Navbar';
import Weather from '../containers/Weather';
import './Landing.css';

function Landing() {
  const { cityName } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { filteredItineraries, loading, error } = useSelector(
    (state) => state.itineraries
  );

  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const [city, setCity] = useState(null);
  const [travelers, setTravelers] = useState(1);
  const [showReservationMessage, setShowReservationMessage] = useState(false);

  // 🔥 PERSISTENCIA CORREGIDA
  useEffect(() => {
    // Cargar ciudad guardada al iniciar
    const savedCity = localStorage.getItem("lastCity");
    if (savedCity) {
      setCity(savedCity);
    }
  }, []);

  useEffect(() => {
    // Guardar ciudad cuando viene desde navigation state
    if (location.state?.city) {
      setCity(location.state.city);
      localStorage.setItem("lastCity", location.state.city);
    }
  }, [location.state?.city]);

  useEffect(() => {
    if (cityName) {
      dispatch(fetchItinerariesByCityName(cityName));
    }
  }, [dispatch, cityName]);

  const calculatePrice = (basePrice) => {
    if (travelers === 1) return basePrice;
    if (travelers === 2) return basePrice * 0.9;
    if (travelers === 3) return basePrice * 0.85;
    if (travelers >= 4) return basePrice * 0.8;
    return basePrice;
  };

  const handleReserve = () => {
    alert("✈️ Viaje reservado, gracias por visitarnos");
    setShowReservationMessage(true);
    setTimeout(() => setShowReservationMessage(false), 3000);
  };

  if (loading) {
    return (
      <div className="landing-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando experiencias en {cityName}...</p>
        </div>
        <Navbar />
      </div>
    );
  }

  if (error) {
    return (
      <div className="landing-container">
        <div className="error-container">
          <div className="error-icon">😢</div>
          <h2>No pudimos cargar los itinerarios</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/places')}>
            Volver a destinos
          </button>
        </div>
        <Navbar />
      </div>
    );
  }

  if (!filteredItineraries || filteredItineraries.length === 0) {
    return (
      <div className="landing-container">
        <div className="empty-container">
          <div className="empty-icon">🗺️</div>
          <h2>No hay itinerarios disponibles para {cityName}</h2>
          <p>Pronto agregaremos experiencias increíbles en esta ciudad</p>
          <button onClick={() => navigate('/places')}>
            Explorar otras ciudades
          </button>
        </div>
        <Navbar />
      </div>
    );
  }

  const displayItinerary = selectedItinerary || filteredItineraries[0];

  return (
    <div className="landing-container">

      {/* HERO */}
      <div className="landing-hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <button className="back-button" onClick={() => navigate('/places')}>
              ← Volver a destinos
            </button>
            <h1 className="hero-city">{displayItinerary.cityName}</h1>
            <p className="hero-description">{displayItinerary.description}</p>
          </div>
        </div>
      </div>

      {/* SELECTOR */}
      {filteredItineraries.length > 1 && (
        <div className="itinerary-selector">
          <div className="selector-header">
            <h3>📋 Experiencias disponibles</h3>
            <div className="selector-tabs">
              {filteredItineraries.map((it, index) => (
                <button
                  key={it._id}
                  className={`selector-tab ${
                    selectedItinerary?._id === it._id ||
                    (!selectedItinerary && index === 0)
                      ? 'active'
                      : ''
                  }`}
                  onClick={() => setSelectedItinerary(it)}
                >
                  {it.title}
                  <span className="tab-rating">⭐ {it.rating}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CONTENIDO */}
      <div className="landing-content">
        <div className="content-grid">

          {/* IZQUIERDA */}
          <div className="info-column">
            <div className="info-card">

              <div className="profile-section">
                <img
                  src={displayItinerary.profilePhoto}
                  alt={displayItinerary.title}
                  className="profile-image"
                  onError={(e) => {
                    e.target.src =
                      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png';
                  }}
                />
                <div className="profile-info">
                  <h2>{displayItinerary.title}</h2>
                  <div className="rating-stars">
                    {'⭐'.repeat(Math.floor(displayItinerary.rating))}
                    <span className="rating-value">{displayItinerary.rating}</span>
                  </div>
                </div>
              </div>

              {/* 🔥 CLIMA CON PERSISTENCIA */}
              <div className="weather-section-landing">
                <Weather
                  city={city || displayItinerary.cityName}
                  compact={false}
                />
              </div>

              {/* VIAJEROS */}
              <div className="travelers-selector">
                <label>👥 Viajeros:</label>
                <select
                  value={travelers}
                  onChange={(e) => setTravelers(Number(e.target.value))}
                  className="travelers-input"
                >
                  <option value="1">1 persona</option>
                  <option value="2">2 personas</option>
                  <option value="3">3 personas</option>
                  <option value="4">4 personas</option>
                  <option value="5">5 personas</option>
                  <option value="6">6+ personas</option>
                </select>
              </div>

              <div className="details-grid">
                <div className="detail-item">
                  <div className="detail-icon">⏱️</div>
                  <div className="detail-text">
                    <strong>Duración</strong>
                    <span>{displayItinerary.duration}</span>
                  </div>
                </div>

                <div className="detail-item">
                  <div className="detail-icon">💰</div>
                  <div className="detail-text">
                    <strong>Precio total</strong>
                    <span>
                      ${Math.round(calculatePrice(displayItinerary.price) * travelers)} USD
                    </span>
                    <span className="price-per-person">
                      ({travelers} persona{travelers !== 1 ? 's' : ''})
                    </span>
                  </div>
                </div>
              </div>

              <div className="hashtags-section">
                {displayItinerary.hashtags?.map((tag, index) => (
                  <span key={index} className="hashtag">
                    #{tag}
                  </span>
                ))}
              </div>

            </div>
          </div>

          {/* DERECHA */}
          <div className="activities-column">
            <div className="activities-card">
              <h3>📅 Plan de viaje sugerido</h3>

              <div className="activities-list">
                {displayItinerary.activities?.length > 0 ? (
                  displayItinerary.activities.map((activity, index) => (
                    <div key={index} className="activity-item">
                      <div className="activity-day">Día {activity.day}</div>
                      <div className="activity-content">
                        <h4>{activity.title}</h4>
                        <p>{activity.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="activities-placeholder">
                    <p>✨ Pronto agregaremos el plan detallado</p>
                    <p>Mientras tanto, puedes consultar disponibilidad</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* BOTÓN DE RESERVA CON MENSAJE */}
        <div className="action-section">
          <button className="book-button" onClick={handleReserve}>
            ✈️ Reservar esta experiencia
          </button>
          {showReservationMessage && (
            <div className="reservation-message">
              ✅ ¡Viaje reservado! Gracias por visitarnos.
            </div>
          )}
        </div>

      </div>

      <Navbar />
    </div>
  );
}

export default Landing;
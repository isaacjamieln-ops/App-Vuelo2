import React, { useState, useEffect } from "react";
import { API_URL } from "../config";
import "./Weather.css";

function Weather({ city: propCity, compact = false, cache, setCache }) {

  // 🔥 ciudad viene SOLO por props
  const city = propCity;

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {

    if (!city) return; // 🔥 evita errores si no hay ciudad

    // 🔥 CACHE
    if (cache && cache[city]) {
      setWeather(cache[city]);
      return;
    }

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${API_URL}/weather/${encodeURIComponent(city)}`
        );

        if (!res.ok) {
          throw new Error(`Error ${res.status}`);
        }

        const data = await res.json();

        const weatherData = {
          temp: Math.round(data.main.temp),
          description: data.weather[0].description,
          location: data.name,
        };

        setWeather(weatherData);

        // 🔥 guardar en cache
        if (setCache) {
          setCache(prev => ({
            ...prev,
            [city]: weatherData
          }));
        }

      } catch (err) {
        console.error("Error en clima:", err);
        setError("No se pudo obtener el clima");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();

  }, [city, cache, setCache]);

  // 🚫 sin ciudad → no renderiza nada
  if (!city) {
    return null;
  }

  if (loading) {
    return (
      <div className="weather-box">
        <span>🌡️</span>
        <span>Cargando {city}...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-box error">
        <span>⚠️</span>
        <span>{error}</span>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="weather-box">
        <span>🌡️</span>
        <span>Sin datos</span>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="weather-box-compact">
        <span>🌡️</span>
        <span className="weather-temp-compact">{weather.temp}°C</span>
        <span className="weather-desc-compact">
          {weather.description}
        </span>
      </div>
    );
  }

  return (
    <div className="weather-box">
      <div className="weather-icon">🌤️</div>
      <div className="weather-info">
        <h3>{weather.location}</h3>
        <p className="weather-temp">{weather.temp}°C</p>
        <p className="weather-desc">{weather.description}</p>
      </div>
    </div>
  );
}

export default Weather;
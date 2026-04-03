import React, { useState, useEffect } from 'react';

function CitiesList() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener las ciudades del backend
  const fetchCities = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cities');
      if (!response.ok) {
        throw new Error('Error al obtener las ciudades');
      }
      const data = await response.json();
      setCities(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Ejecutar al montar el componente
  useEffect(() => {
    fetchCities();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="alert alert-info">Cargando ciudades...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          Error: {error}. ¿Está corriendo el backend en puerto 5000?
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🌍 Lista de Ciudades</h2>
      <div className="row">
        {cities.map((city) => (
          <div className="col-md-4 mb-3" key={city._id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{city.name}</h5>
                <p className="card-text">
                  <strong>País:</strong> {city.country}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CitiesList;
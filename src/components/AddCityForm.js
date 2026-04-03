import React, { useState } from 'react';

function AddCityForm({ onCityAdded }) {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/cities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, country }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Ciudad agregada correctamente');
        setName('');
        setCountry('');
        if (onCityAdded) onCityAdded();
      } else {
        setMessage('❌ Error: ' + data.error);
      }
    } catch (error) {
      setMessage('❌ Error de conexión: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">➕ Agregar Nueva Ciudad</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre de la ciudad</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Ej: Barcelona"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">País</label>
              <input
                type="text"
                className="form-control"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                placeholder="Ej: España"
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Guardando...' : 'Agregar Ciudad'}
            </button>
            {message && <div className="mt-3 alert alert-info">{message}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCityForm;
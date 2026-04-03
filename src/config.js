// src/config.js
const isProduction = process.env.NODE_ENV === 'production';

// URL del backend en Render (PRODUCCIÓN)
const PRODUCTION_API_URL = 'https://backend-viaje-seguro.onrender.com/api';

// URL del backend local (DESARROLLO)
const DEVELOPMENT_API_URL = 'http://localhost:5000/api';

export const API_URL = isProduction ? PRODUCTION_API_URL : DEVELOPMENT_API_URL;
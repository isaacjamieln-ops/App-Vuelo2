import { API_URL } from '../../config';

// Tipos de acciones
export const FETCH_ITINERARIES_REQUEST = 'FETCH_ITINERARIES_REQUEST';
export const FETCH_ITINERARIES_SUCCESS = 'FETCH_ITINERARIES_SUCCESS';
export const FETCH_ITINERARIES_FAILURE = 'FETCH_ITINERARIES_FAILURE';
export const FETCH_ITINERARIES_BY_CITY = 'FETCH_ITINERARIES_BY_CITY';
export const FETCH_ITINERARIES_BY_CITY_NAME = 'FETCH_ITINERARIES_BY_CITY_NAME';

// Action creators sincrónicos
export const fetchItinerariesRequest = () => ({
  type: FETCH_ITINERARIES_REQUEST
});

export const fetchItinerariesSuccess = (itineraries) => ({
  type: FETCH_ITINERARIES_SUCCESS,
  payload: itineraries
});

export const fetchItinerariesFailure = (error) => ({
  type: FETCH_ITINERARIES_FAILURE,
  payload: error
});

export const fetchItinerariesByCitySuccess = (itineraries, cityId) => ({
  type: FETCH_ITINERARIES_BY_CITY,
  payload: { itineraries, cityId }
});

export const fetchItinerariesByCityNameSuccess = (itineraries, cityName) => ({
  type: FETCH_ITINERARIES_BY_CITY_NAME,
  payload: { itineraries, cityName }
});

// Action asíncrono para obtener todos los itinerarios
export const fetchItineraries = () => {
  return async (dispatch) => {
    dispatch(fetchItinerariesRequest());
    
    try {
      const response = await fetch(`${API_URL}/itineraries`);
      if (!response.ok) {
        throw new Error('Error al obtener los itinerarios');
      }
      const data = await response.json();
      dispatch(fetchItinerariesSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchItinerariesFailure(error.message));
      throw error;
    }
  };
};

// Action asíncrono para obtener itinerarios por ID de ciudad
export const fetchItinerariesByCity = (cityId) => {
  return async (dispatch) => {
    dispatch(fetchItinerariesRequest());
    
    try {
      const response = await fetch(`${API_URL}/itineraries/city/${cityId}`);
      if (!response.ok) {
        throw new Error('Error al obtener los itinerarios de la ciudad');
      }
      const data = await response.json();
      dispatch(fetchItinerariesByCitySuccess(data, cityId));
      return data;
    } catch (error) {
      dispatch(fetchItinerariesFailure(error.message));
      throw error;
    }
  };
};

// ✅ NUEVO: Action asíncrono para obtener itinerarios por NOMBRE de ciudad
export const fetchItinerariesByCityName = (cityName) => {
  return async (dispatch) => {
    dispatch(fetchItinerariesRequest());
    
    try {
      const response = await fetch(`${API_URL}/itineraries/cityname/${encodeURIComponent(cityName)}`);
      if (!response.ok) {
        throw new Error('Error al obtener los itinerarios de la ciudad');
      }
      const data = await response.json();
      
      // Manejar tanto array directo como objeto con propiedad itineraries
      const itineraries = Array.isArray(data) ? data : (data.itineraries || []);
      dispatch(fetchItinerariesByCityNameSuccess(itineraries, cityName));
      return itineraries;
    } catch (error) {
      dispatch(fetchItinerariesFailure(error.message));
      throw error;
    }
  };
};

// Action asíncrono para crear un itinerario
export const createItinerary = (itineraryData) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/itineraries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itineraryData),
      });
      
      if (!response.ok) {
        throw new Error('Error al crear el itinerario');
      }
      
      const newItinerary = await response.json();
      return newItinerary;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
};
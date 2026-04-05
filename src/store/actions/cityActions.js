// src/store/actions/cityActions.js
import { API_URL } from '../../config';

// Tipos de acciones
export const FETCH_CITIES_REQUEST = 'FETCH_CITIES_REQUEST';
export const FETCH_CITIES_SUCCESS = 'FETCH_CITIES_SUCCESS';
export const FETCH_CITIES_FAILURE = 'FETCH_CITIES_FAILURE';
export const ADD_CITY = 'ADD_CITY';
export const UPDATE_CITY = 'UPDATE_CITY';
export const DELETE_CITY = 'DELETE_CITY';

// Action creators sincrónicos
export const fetchCitiesRequest = () => ({
  type: FETCH_CITIES_REQUEST
});

export const fetchCitiesSuccess = (cities) => ({
  type: FETCH_CITIES_SUCCESS,
  payload: cities
});

export const fetchCitiesFailure = (error) => ({
  type: FETCH_CITIES_FAILURE,
  payload: error
});

export const addCity = (city) => ({
  type: ADD_CITY,
  payload: city
});

export const updateCity = (city) => ({
  type: UPDATE_CITY,
  payload: city
});

export const deleteCity = (id) => ({
  type: DELETE_CITY,
  payload: id
});

// Action asíncrono para obtener ciudades (usando Redux Thunk)
export const fetchCities = () => {
  return async (dispatch) => {
    dispatch(fetchCitiesRequest());
    
    try {
      const response = await fetch(`${API_URL}/cities`);
      if (!response.ok) {
        throw new Error('Error al obtener las ciudades');
      }
      const data = await response.json();
      dispatch(fetchCitiesSuccess(data));
    } catch (error) {
      dispatch(fetchCitiesFailure(error.message));
    }
  };
};

// Action asíncrono para agregar una ciudad
export const createCity = (cityData) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/cities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cityData),
      });
      
      if (!response.ok) {
        throw new Error('Error al crear la ciudad');
      }
      
      const newCity = await response.json();
      dispatch(addCity(newCity));
      return newCity;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
};
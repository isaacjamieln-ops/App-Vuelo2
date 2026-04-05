// ✅ Correcto (sube un nivel a store/, luego entra a actions)
import {
  FETCH_CITIES_REQUEST,
  FETCH_CITIES_SUCCESS,
  FETCH_CITIES_FAILURE,
  ADD_CITY,
  UPDATE_CITY,
  DELETE_CITY
} from '../actions/cityActions';

// Estado inicial
const initialState = {
  cities: [],
  loading: false,
  error: null
};

// Reducer
const cityReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CITIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
      
    case FETCH_CITIES_SUCCESS:
      return {
        ...state,
        loading: false,
        cities: action.payload
      };
      
    case FETCH_CITIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
      
    case ADD_CITY:
      return {
        ...state,
        cities: [...state.cities, action.payload]
      };
      
    case UPDATE_CITY:
      return {
        ...state,
        cities: state.cities.map(city =>
          city._id === action.payload._id ? action.payload : city
        )
      };
      
    case DELETE_CITY:
      return {
        ...state,
        cities: state.cities.filter(city => city._id !== action.payload)
      };
      
    default:
      return state;
  }
};

export default cityReducer;
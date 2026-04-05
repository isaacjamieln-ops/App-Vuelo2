import {
  FETCH_ITINERARIES_REQUEST,
  FETCH_ITINERARIES_SUCCESS,
  FETCH_ITINERARIES_FAILURE,
  FETCH_ITINERARIES_BY_CITY,
  FETCH_ITINERARIES_BY_CITY_NAME
} from '../actions/itineraryActions';

const initialState = {
  itineraries: [],
  filteredItineraries: [],
  loading: false,
  error: null,
  currentCityId: null,
  currentCityName: null
};

const itineraryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITINERARIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
      
    case FETCH_ITINERARIES_SUCCESS:
      return {
        ...state,
        loading: false,
        itineraries: action.payload
      };
      
    case FETCH_ITINERARIES_BY_CITY:
      return {
        ...state,
        loading: false,
        filteredItineraries: action.payload.itineraries,
        currentCityId: action.payload.cityId
      };
      
    case FETCH_ITINERARIES_BY_CITY_NAME:
      return {
        ...state,
        loading: false,
        filteredItineraries: action.payload.itineraries,
        currentCityName: action.payload.cityName
      };
      
    case FETCH_ITINERARIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
      
    default:
      return state;
  }
};

export default itineraryReducer;
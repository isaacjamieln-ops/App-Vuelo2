import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import cityReducer from './reducers/cityReducer';
import itineraryReducer from './reducers/itineraryReducer';

const rootReducer = combineReducers({
  cities: cityReducer,
  itineraries: itineraryReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
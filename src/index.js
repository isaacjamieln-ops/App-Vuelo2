import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import store from './store/store';
import 'bootstrap/dist/css/bootstrap.min.css';

// ✅ Determinar el basename según el entorno
const isProduction = process.env.NODE_ENV === 'production';
const basename = isProduction ? '/App-Vuelo2' : '/';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
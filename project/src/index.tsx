import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {promoFilm} from './mocks/promo-film';
import {films} from './mocks/films';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App promoFilm={promoFilm} films={films}/>
  </React.StrictMode>,
);

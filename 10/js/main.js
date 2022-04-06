import './slider.js';
import './map.js';
import {getData} from './load.js';
import {getError} from './template.js';
import {createMarker} from './map.js';

getData()
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status} — ${response.statusText}`);
  })
  .then((offers) => {
    offers.forEach((offer) => {
      createMarker(offer);
    });
  })
  .catch(() => getError('Oшибка при загрузке данных.', 'Понятно'));


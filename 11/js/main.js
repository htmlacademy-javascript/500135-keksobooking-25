import './slider.js';
import {getData} from './load.js';
import {getError} from './template.js';
import {createMarkers, clearMap} from './map.js';
import {activateForm, deactivateForm} from './form.js';
import {debounce} from './util.js';

const selects = document.querySelectorAll('.map__filter');
const features = document.querySelectorAll('#housing-features .map__checkbox[name="features"]');

for(let i = 0; i < selects.length; i++) {
  selects[i].addEventListener('change', debounce(() => {
    clearMap();
    renderMap();
  }));
}

for(let i = 0; i < features.length; i++) {
  features[i].addEventListener('change', debounce(() => {
    clearMap();
    renderMap();
  }));
}

deactivateForm();
renderMap();

function renderMap() {
  deactivateForm();
  getData()
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((offersData) => {
      createMarkers(offersData);
      activateForm();
    })
    .catch(() => getError('Oшибка при загрузке данных.', 'Понятно'));
}


export {renderMap};

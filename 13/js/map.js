import {getOfferCard, getError} from './template.js';
import {getData} from './load.js';
import {activateForm, deactivateForm} from './form.js';
import {getFilterOffers} from './filters.js';

const address = document.querySelector('#address');
const defaultLatLng = {
  lat: 35.6895,
  lng: 139.692,
};
const defaultScale = 10;

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const map = L.map('map-canvas')
  .on('load', () => {
    activateForm();
    address.setAttribute('readonly', true);
  })
  .setView(defaultLatLng, defaultScale);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinMarker = L.marker(
  defaultLatLng,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
const markerGroup = L.layerGroup().addTo(map);
function setAdress(marker) {
  address.setAttribute('value', `${marker.getLatLng().lat.toFixed(5)}, ${marker.getLatLng().lng.toFixed(5)}`);
}

function createMarkers(offersData) {
  const offers = getFilterOffers(offersData);
  offers.forEach((cardOffer) => {
    const marker = L.marker(
      {
        lat: cardOffer.location.lat,
        lng: cardOffer.location.lng,
      },
      {
        pinIcon,
      },
    );
    marker
      .addTo(markerGroup)
      .bindPopup(getOfferCard(cardOffer));
  });
}

function clearMap() {
  markerGroup.clearLayers();
}

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


function setDefaultMap() {
  mainPinMarker.setLatLng(defaultLatLng);
  map.setView(defaultLatLng, defaultScale);
  setAdress(mainPinMarker);
  document.querySelector('.map__filters').reset();
  clearMap();
  renderMap();
}

setAdress(mainPinMarker);

mainPinMarker
  .addTo(map)
  .on('move', ()=> {
    setAdress(mainPinMarker);
  });


export {setDefaultMap, renderMap, clearMap};

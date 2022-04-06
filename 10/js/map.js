import {activateForm} from './form.js';
import {getOfferCard} from './template.js';

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

function setAdress(marker) {
  address.setAttribute('value', `${marker.getLatLng().lat.toFixed(5)}, ${marker.getLatLng().lng.toFixed(5)}`);
}

function createMarker(cardOffer) {
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
    .addTo(map)
    .bindPopup(getOfferCard(cardOffer));
}

function setDefaultMarker() {
  mainPinMarker.setLatLng(defaultLatLng);
  map.setView(defaultLatLng, defaultScale);
  setAdress(mainPinMarker);
}

setAdress(mainPinMarker);

mainPinMarker
  .addTo(map)
  .on('move', ()=> {
    setAdress(mainPinMarker);
  });


export {createMarker, setDefaultMarker};

import {activateForm} from './form.js';
import {getOfferCard} from './template.js';
import {renderMap} from './main.js';


const address = document.querySelector('#address');
const defaultLatLng = {
  lat: 35.6895,
  lng: 139.692,
};
const defaultScale = 10;
const MARKER_OFFER_COUNT = 10;

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

function filterSelect(value, filterValue) {
  return filterValue === 'any' || String(value) === filterValue;
}

function filterPrice(value, filterValue) {
  const valueNumber = Number(value);
  switch (filterValue) {
    case 'any':
      return true;

    case 'middle':
      return (valueNumber >= 10000 && valueNumber <= 50000);

    case 'low':
      return (valueNumber < 10000);

    case 'high':
      return (valueNumber > 50000);
  }
}

function filterFeatures(orders, housingFeatures) {
  if(orders === undefined) {
    return housingFeatures.length === 0;
  }

  let filterMark = 0;

  for (let i = 0; i < orders.length; i++) {
    for (let j = 0; j < housingFeatures.length; j++) {
      if(orders[i] === housingFeatures[j]) {
        filterMark++;
      }
    }
  }
  return filterMark === housingFeatures.length;
}


function getFilterOffers(orders) {
  const housingFilter = document.querySelector('.map__filters');
  const housingTypeValue = housingFilter.querySelector('#housing-type').value;
  const housingPriceValue = housingFilter.querySelector('#housing-price').value;
  const housingRoomsValue = housingFilter.querySelector('#housing-rooms').value;
  const housingGuestsValue = housingFilter.querySelector('#housing-guests').value;
  const housingFeatures = [];
  housingFilter.querySelectorAll('#housing-features .map__checkbox[name="features"]').forEach((element) => {
    if(element.checked) {
      housingFeatures.push(element.value);
    }
  });

  const filterOrders = orders
    .filter((order) => filterSelect(order.offer.type, housingTypeValue))
    .filter((order) => filterPrice(order.offer.price, housingPriceValue))
    .filter((order) => filterSelect(order.offer.rooms, housingRoomsValue))
    .filter((order) => filterSelect(order.offer.guests, housingGuestsValue))
    .filter((order) => filterFeatures(order.offer.features, housingFeatures));

  return filterOrders.slice(0, MARKER_OFFER_COUNT);
}

function createMarkers(offersData) {
  // const offers = offersData.slice(0, MARKER_OFFER_COUNT);
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


export {createMarkers, clearMap, setDefaultMap};


import {debounce} from './util.js';
import {renderMap, clearMap} from './map.js';

const selects = document.querySelectorAll('.map__filter');
const features = document.querySelectorAll('#housing-features .map__checkbox[name="features"]');
const MARKER_OFFER_COUNT = 10;

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

export {getFilterOffers};

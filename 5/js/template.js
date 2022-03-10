function getType(type) {
  switch(type) {
    case 'flat':
      return 'Квартира';

    case 'bungalow':
      return 'Бунгало';

    case 'house':
      return 'Дом';

    case 'palace':
      return 'Дворец';
    case 'hotel':
      return 'Отель ';

    default:
      return 'Другое';
  }
}

function getChek(checkin, checkout) {
  return `Заезд после ${checkin}, выезд до ${checkout}`;
}

function getCapacity(rooms, guests) {
  return `${rooms} комнаты для ${guests} гостей`;
}

function getPrice(price) {
  return `${price} ₽/ночь`;
}

function getFeatures(features) {
  const featuresText = document.createElement('ul');

  features.forEach((feature) => {
    const elementFeature = document.createElement('li');
    elementFeature.classList.add('popup__feature');
    elementFeature.classList.add(`popup__feature--${feature}`);
    featuresText.appendChild(elementFeature);
  });

  return featuresText.innerHTML;
}

function getPhotos(photos) {
  const photoBlock = document.createElement('div');

  photos.forEach((photo) => {
    const photoItem = document.createElement('img');
    photoItem.src = photo;
    photoItem.classList.add('popup__photo');
    photoItem.width = 45;
    photoItem.height = 40;
    photoItem.alt='Фотография жилья';

    photoBlock.appendChild(photoItem);
  });

  return photoBlock.innerHTML;
}

function getOfferCard(offerElement) {
  const cardOfferTempate = document.querySelector('#card').content.querySelector('.popup');

  const cardOffer = cardOfferTempate.cloneNode(true);

  cardOffer.querySelector('.popup__title').textContent = offerElement.offer.title;
  cardOffer.querySelector('.popup__text--address').textContent = offerElement.offer.address;
  cardOffer.querySelector('.popup__text--price').textContent = getPrice(offerElement.offer.price);
  cardOffer.querySelector('.popup__type').textContent = getType(offerElement.offer.type);
  cardOffer.querySelector('.popup__text--capacity').textContent = getCapacity(offerElement.offer.rooms, offerElement.offer.guests);
  cardOffer.querySelector('.popup__text--time').textContent = getChek(offerElement.offer.checkin, offerElement.offer.checkout);
  cardOffer.querySelector('.popup__features').innerHTML = getFeatures(offerElement.offer.features);
  cardOffer.querySelector('.popup__description').textContent = offerElement.offer.description;
  cardOffer.querySelector('.popup__photos').innerHTML = getPhotos(offerElement.offer.photos);
  cardOffer.querySelector('.popup__avatar').src = offerElement.author.avatar;

  document.querySelector('#map-canvas').appendChild(cardOffer);
}


export {getOfferCard};



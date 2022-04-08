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
  const featuresBlock = document.createElement('ul');

  featuresBlock.classList.add('popup__features');

  features.forEach((feature) => {
    const elementFeature = document.createElement('li');
    elementFeature.classList.add('popup__feature');
    elementFeature.classList.add(`popup__feature--${feature}`);
    featuresBlock.appendChild(elementFeature);
  });

  return featuresBlock;
}

function getPhotos(photos) {
  const photoBlock = document.createElement('div');

  photoBlock.classList.add('popup__photos');

  photos.forEach((photo) => {
    const photoItem = document.createElement('img');
    photoItem.src = photo;
    photoItem.classList.add('popup__photo');
    photoItem.width = 45;
    photoItem.height = 40;
    photoItem.alt='Фотография жилья';

    photoBlock.appendChild(photoItem);
  });

  return photoBlock;
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

  if(offerElement.offer.features) {
    cardOffer.querySelector('.popup__features').replaceWith(getFeatures(offerElement.offer.features));
  } else {
    cardOffer.querySelector('.popup__features').replaceWith('');
  }

  if(offerElement.offer.photos) {
    cardOffer.querySelector('.popup__photos').replaceWith(getPhotos(offerElement.offer.photos));
  } else {
    cardOffer.querySelector('.popup__photos').replaceWith('');
  }

  if(offerElement.offer.photos) {
    cardOffer.querySelector('.popup__description').textContent = offerElement.offer.description;
  } else {
    cardOffer.querySelector('.popup__description').replaceWith('');
  }

  cardOffer.querySelector('.popup__avatar').src = offerElement.author.avatar;

  return cardOffer;
}

function getSuccess(message) {
  const successTempate = document.querySelector('#success').content.querySelector('.success');
  const success = successTempate.cloneNode(true);
  if(message) {
    success.querySelector('.success__message').textContent = message;
  }

  document.querySelector('body').appendChild(success);

  success.addEventListener('click', () => {
    success.remove();
  });

  window.addEventListener('keyup', (event) => {
    if(event.key === 'Escape') {
      success.remove();
    }
  });
}

function getError(message, messageButton) {
  const errorTempate = document.querySelector('#error').content.querySelector('.error');
  const error = errorTempate.cloneNode(true);
  if(message) {
    error.querySelector('.error__message').textContent = message;
  }

  if(messageButton) {
    error.querySelector('.error__button').textContent = messageButton;
  }

  document.querySelector('body').appendChild(error);

  error.querySelector('.error__button').addEventListener('click', () => {
    error.remove();
  });

  error.addEventListener('click', () => {
    error.remove();
  });

  window.addEventListener('keyup', (event) => {
    if(event.key === 'Escape') {
      error.remove();
    }
  });
}


export {getOfferCard, getSuccess, getError};



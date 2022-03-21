import {getRandomPositiveInteger, getRandomPositiveFloat} from './util.js';

function getAuthor(num) {
  return {
    avatar: `img/avatars/user${(num < 10)? `0${num}`: num}.png`
  };
}

function getLocation() {
  return {
    lat: getRandomPositiveFloat(35.65000, 35.70000, 5),
    lng: getRandomPositiveFloat(139.70000, 139.80000, 5)
  };

}

function getAddressOffer(location) {
  return `${location.lat}, ${location.lng}`;
}

function getCheck() {
  return ['12:00','13:00','14:00'][getRandomPositiveInteger(0,2)];
}

function getFeatures() {
  return [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'].filter(() => getRandomPositiveInteger(0,1));
}

function getPhotos() {
  return [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'].filter(() => getRandomPositiveInteger(0,1));
}

function getType() {
  return ['palace', 'flat', 'house','bungalow', 'hotel'][getRandomPositiveInteger(0,4)];
}

function getOffer(title = 'Заголовок', description = 'Описание', num = getRandomPositiveInteger(1,10)) {
  const location = getLocation();

  return {
    author: getAuthor(num),
    offer : {
      title: title,
      address: getAddressOffer(location),
      price: getRandomPositiveInteger(0, 100000),
      type: getType(),
      rooms: getRandomPositiveInteger(1, 6),
      guests: getRandomPositiveInteger(1, 20),
      checkin: getCheck(),
      checkout: getCheck(),
      features: getFeatures(),
      description: description,
      photos: getPhotos()
    },
    location: location,
  };
}

function getId(n) {
  const authorId = [];

  for (let i = 0; i < n; i++) {
    let generateNum = getRandomPositiveInteger(1, n);
    let next = false;
    while(next === false) {
      if(!authorId.includes(generateNum)) {
        next = true;
      } else {
        generateNum = getRandomPositiveInteger(1, n);
        next = false;
      }
    }
    authorId.push(generateNum);
  }

  return authorId;
}


const authorsId = getId(10);

const cardOffers = [
  getOffer('Квартира 1', 'Описание кварты 1', authorsId[0]),
  getOffer('Квартира 2', 'Описание кварты 2', authorsId[1]),
  getOffer('Квартира 3', 'Описание кварты 3', authorsId[2]),
  getOffer('Квартира 4', 'Описание кварты 4', authorsId[3]),
  getOffer('Квартира 5', 'Описание кварты 5', authorsId[4]),
  getOffer('Квартира 6', 'Описание кварты 6', authorsId[5]),
  getOffer('Квартира 7', 'Описание кварты 7', authorsId[6]),
  getOffer('Квартира 8', 'Описание кварты 8', authorsId[7]),
  getOffer('Квартира 9', 'Описание кварты 9', authorsId[8]),
  getOffer('Квартира 10', 'Описание кварты 10', authorsId[9]),
];


export {cardOffers};

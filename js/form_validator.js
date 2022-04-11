import {sendData} from './load.js';
import {setDefaultMap} from './map.js';
import {getSuccess, getError} from './template.js';

const answersCapacity = {
  '1': 'Нужно выбрать 1, 2 или 3 комнаты',
  '2': 'Нужно выбрать 2 или 3 комнаты',
  '3': 'Нужно выбрать 3 комнаты',
  '0': 'Нужно выбрать 100 комнат'
};

const answersRoomNumber = {
  '1': 'Только для 1 гостя',
  '2': 'Для 1 или 2 гостей',
  '3': 'Для 1, 2 или 3 гостей',
  '100': 'Не для гостей'
};

const PriceForType = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

function validateRoomNumber (value) {
  const capacityValue = document.querySelector('#capacity').value;
  switch(value) {
    case '1':
      return capacityValue === '1';

    case '2':
      return ['1', '2'].includes(capacityValue);

    case '3':
      return ['1', '2', '3'].includes(capacityValue);

    case '100':
      return capacityValue === '0';

    default:
      return false;
  }
}

function validateRoomNumberTextError(value) {
  return answersRoomNumber[value] || '';
}

function validateCapacity (value) {
  const roomNumberValue = document.querySelector('#room_number').value;

  const answersNumberValue = {
    '1': ['1', '2', '3'].includes(roomNumberValue),
    '2': ['2', '3'].includes(roomNumberValue),
    '3': roomNumberValue === '3',
    '0': roomNumberValue === '100'
  };

  return answersNumberValue[value] || false;
}

function validateCapacityTextError(value) {
  return answersCapacity[value] || '';
}

function validateType(value) {
  const priceBlock = document.querySelector('#price');
  priceBlock.setAttribute('placeholder', PriceForType[value]);
  priceBlock.setAttribute('min', PriceForType[value]);

  return true;
}

function validatePrice(value) {
  validateType(document.querySelector('#type').value);
  const priceBlock= document.querySelector('#price');
  const priceMin = priceBlock.getAttribute('min');
  return Number(value) >= Number(priceMin);
}

function validatePriceTextError() {
  const minValue = document.querySelector('#price').getAttribute('min');

  return `Минимальная цена за ночь ${minValue}`;
}

function validateTime(value) {
  const timeinValue = document.querySelector('#timein');
  const timeoutValue = document.querySelector('#timeout');

  timeinValue.value = value;
  timeoutValue.value =value;

  return true;
}

const form = document.querySelector('.ad-form');
const capacity = form.querySelector('#capacity');
const roomNumber = form.querySelector('#room_number');
const type = form.querySelector('#type');
const timein = form.querySelector('#timein');
const timeout = form.querySelector('#timeout');
const price = form.querySelector('#price');
const submitButton = form.querySelector('.ad-form__submit');
const reserButton = form.querySelector('.ad-form__reset');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'error-text',
});


pristine.addValidator(
  roomNumber,
  validateRoomNumber,
  validateRoomNumberTextError
);

pristine.addValidator(
  capacity,
  validateCapacity,
  validateCapacityTextError
);

pristine.addValidator(
  type,
  validateType
);

pristine.addValidator(
  price,
  validatePrice,
  validatePriceTextError
);


pristine.addValidator(
  timeout,
  validateTime
);

pristine.addValidator(
  timein,
  validateTime
);


const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Сохранить';
};


form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();

  evt.preventDefault();


  if (isValid) {
    blockSubmitButton();
    sendData(
      new FormData(evt.target),
    )
      .then((response) => {
        if (response.ok) {
          unblockSubmitButton();
          form.reset();
          getSuccess();
        } else {
          throw new Error(`${response.status} — ${response.statusText}`);
        }
      })
      .catch(() => getError())
      .finally(() => {
        unblockSubmitButton();
      });
  }
});

reserButton.addEventListener('click', () => {
  setDefaultMap();
  form.reset();
});



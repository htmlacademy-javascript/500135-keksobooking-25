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

  const answers = {
    '1': 'Только для 1 гостя',
    '2': 'Для 1 или 2 гостей',
    '3': 'Для 1, 2 или 3 гостей',
    '100': 'Не для гостей'
  };

  return answers[value] || '';
}

function validateCapacity (value) {
  const roomNumberValue = document.querySelector('#room_number').value;
  switch(value) {
    case '1':
      return ['1', '2', '3'].includes(roomNumberValue);

    case '2':
      return ['2', '3'].includes(roomNumberValue);

    case '3':
      return roomNumberValue === '3';

    case '0':
      return roomNumberValue === '100';

    default:
      return false;
  }

}

function validateCapacityTextError(value) {
  const answers = {
    '1': 'Нужно выбрать 1, 2 или 3 комнаты',
    '2': 'Нужно выбрать 2 или 3 комнаты',
    '3': 'Нужно выбрать 3 комнаты',
    '0': 'Нужно выбрать 100 комнат'
  };

  return answers[value] || '';
}

function validateType(value) {
  const priceBlock = document.querySelector('#price');
  const priceForType = {
    'bungalow': 0,
    'flat': 1000,
    'hotel': 3000,
    'house': 5000,
    'palace': 10000
  };

  priceBlock.setAttribute('placeholder', priceForType[value]);
  priceBlock.setAttribute('min', priceForType[value]);
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
}

const form = document.querySelector('.ad-form');
const capacity = form.querySelector('#capacity');
const roomNumber = form.querySelector('#room_number');
const type = form.querySelector('#type');
const timein = form.querySelector('#timein');
const timeout = form.querySelector('#timeout');
const price = form.querySelector('#price');

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

form.addEventListener('submit', (evt) => {

  const isValid = pristine.validate();
  if (isValid) {
    // eslint-disable-next-line no-console
    console.log('Можно отправлять');
  } else {
    evt.preventDefault();

    // eslint-disable-next-line no-console
    console.log('Форма невалидна');
  }
});

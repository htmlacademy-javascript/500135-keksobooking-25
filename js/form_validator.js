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

const form = document.querySelector('.ad-form');
const capacity = form.querySelector('#capacity');
const roomNumber = form.querySelector('#room_number');

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

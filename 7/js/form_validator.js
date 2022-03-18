function validateRoomNumber (value) {
  const capacityValue = document.querySelector('#capacity').value;
  switch(value) {
    case '1':
      if(capacityValue === '1') {
        return true;
      } else {
        return false;
      }

    case '2':
      if(capacityValue === '1' || capacityValue === '2') {
        return true;
      } else {
        return false;
      }

    case '3':
      if(capacityValue === '1' || capacityValue === '2' || capacityValue === '3') {
        return true;
      } else {
        return false;
      }

    case '100':
      if(capacityValue === '0') {
        return true;
      } else {
        return false;
      }

    default:
      return false;
  }
}

function validateRoomNumberTextError(value) {
  switch(value) {
    case '1':
      return 'Только для 1 гостя';

    case '2':
      return 'Для 1 или 2 гостей';

    case '3':
      return 'Для 1, 2 или 3 гостей';

    case '100':
      return 'Не для гостей';

    default:
      return '';
  }
}

function validateCapacity (value) {
  const roomNumberValue = document.querySelector('#room_number').value;
  switch(value) {
    case '1':
      if(roomNumberValue === '1' || roomNumberValue === '2' || roomNumberValue === '3') {
        return true;
      } else {
        return false;
      }

    case '2':
      if(roomNumberValue === '2' || roomNumberValue === '3') {
        return true;
      } else {
        return false;
      }

    case '3':
      if(roomNumberValue === '3') {
        return true;
      } else {
        return false;
      }

    case '0':
      if(roomNumberValue === '100') {
        return true;
      } else {
        return false;
      }

    default:
      return false;
  }

}

function validateCapacityTextError(value) {
  switch(value) {
    case '1':
      return 'Нужно выбрать 1, 2 или 3 комнаты';

    case '2':
      return 'Нужно выбрать 2 или 3 комнаты';

    case '3':
      return 'Нужно выбрать 3 комнаты';

    case '0':
      return 'Нужно выбрать 100 комнат';

    default:
      return '';
  }
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

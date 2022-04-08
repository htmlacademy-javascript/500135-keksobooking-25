const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
const previewAvatar = document.querySelector('.ad-form-header__preview img');


fileChooserAvatar.addEventListener('change', () => {
  const file = fileChooserAvatar.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewAvatar.src = URL.createObjectURL(file);
  }
});


const fileChooserHouse = document.querySelector('.ad-form__upload input[type=file]');
const previewHouse = document.querySelector('.ad-form__photo');

fileChooserHouse.addEventListener('change', () => {
  const file = fileChooserHouse.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewHouse.setAttribute('style', `background-image: url(${URL.createObjectURL(file)}); background-size: contain; background-position: center; background-repeat: no-repeat;`);
  }
});

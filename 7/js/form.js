import './form_validator.js';

function activateForm() {
  ['ad-form','map__filters'].forEach((className) => {
    const block = document.querySelector(`.${className}`);

    block.classList.remove(`${className}--disabled`);
    block.querySelectorAll('fieldset').forEach((element) => {
      element.disabled = false;
    });
  });
}

function deactivateForm() {
  ['ad-form','map__filters'].forEach((className) => {
    const block = document.querySelector(`.${className}`);

    block.classList.add(`${className}--disabled`);
    block.querySelectorAll('fieldset').forEach((element) => {
      element.disabled = true;
    });
  });
}

export {activateForm, deactivateForm};

import { validateTags, filtersRanges } from './utils.js';
import { isEsc } from './utils.js';
const photoInput = document.querySelector('#upload-file');
const body = document.querySelector('body');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const userForm = document.querySelector('#upload-select-image');
const uploadCancelButton = document.querySelector('#upload-cancel');
const imagePreview = document.querySelector('.img-upload__preview');
const previews = document.querySelectorAll('.effects__preview');
const hashtagField = document.querySelector('.text__hashtags');
const descriptionField = document.querySelector('.text__description');
const filters = document.querySelector('.effects__list');
const sliderContainer = document.querySelector('.effect-level');
const filtersSlider = document.querySelector('.effect-level__slider');
const filterDepthInput = document.querySelector('.effect-level__value');
const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');
const scaleControlInput = document.querySelector('.scale__control--value');


// ---------------------------------form validation


const pristine = new Pristine (userForm, {
  classTo: 'img-upload__element',
  errorTextParent: 'img-upload__element',
  errorTextClass: 'img-upload__error',
});

pristine.addValidator(
  hashtagField,
  validateTags,
  'Неправильно заполнены теги (образец #19буквИлиЦифр, без повторений)'
);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

// -------------------reading file and uploading previews
const IMAGE_SIZE_STEP = 25;

function readFile (input) {
  const file = input.files[0];
  const reader = new FileReader();

  reader.readAsDataURL(file);
  reader.onload = (evt) => {
    imagePreview.innerHTML = `<img src="${evt.target.result}" alt="Фото">`;
    previews.forEach((preview) => {
      preview.style.backgroundImage = `url(${evt.target.result})`;
    });
  };
}

// --------------changing size of the preview

const changeSize = (change) => {
  const currentValue = parseInt(scaleControlInput.value, 10);
  const newValue = currentValue + change;

  const applySize = (value) => {
    imagePreview.querySelector('img').style.transform = `scale(${value / 100})`;
  };

  if (newValue >= 0 && newValue <= 100) {
    scaleControlInput.setAttribute('value', `${newValue}%`);
    applySize(newValue);
  }
};

const onBiggerButtonClick = () => changeSize(IMAGE_SIZE_STEP);
const onSmallerButtonClick = () => changeSize(-IMAGE_SIZE_STEP);

// -----------------------------------------------------handling effects

noUiSlider.create(filtersSlider, {
  range: {
    min: 0,
    max: 1
  },
  start: 0.5,
  step: 0.1,
  connect: 'lower'
});

const addEffect = (input) => {
  const image = imagePreview.querySelector('img');
  image.setAttribute('class', '');

  if (input.value !== 'none') {
    sliderContainer.classList.remove('hidden');
    image.classList.add(`effects__preview--${input.value}`);
    const range = filtersRanges[input.value];
    const min = range.min;
    const max = range.max;
    const step = range.step;
    const style = range.filter;

    const adjustSlider = () => {
      filterDepthInput.value = max;
      filtersSlider.noUiSlider.updateOptions ({
        range: {
          min: min,
          max: max
        },
        start: max,
        step: step
      });
    };

    adjustSlider();
    filtersSlider.noUiSlider.on('update', () => {
      filterDepthInput.value = filtersSlider.noUiSlider.get();
      if (input.value === 'marvin') {
        image.style.filter = `${style}(${filterDepthInput.value}%)`;
      } else if (input.value === 'phobos') {
        image.style.filter = `${style}(${filterDepthInput.value}px)`;
      } else {
        image.style.filter = `${style}(${filterDepthInput.value})`;
      }
    });
  } else {
    sliderContainer.classList.add('hidden');
    image.removeAttribute('style');
  }
};

const chooseFilter = (evt) => {
  const filter = evt.target;
  addEffect(filter);
};

// -----------------------

const onInputFocus = (evt) => {
  const input = evt.target;
  input.addEventListener('keydown', () => {
    evt.stopImmediatePropagation();
  });
};

//--------------------------handling modal conditions

const hideModal = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onEsc);
  uploadCancelButton.removeEventListener('click', hideModal);
  photoInput.value = '';

  scaleControlInput.setAttribute('value', '100%');
  buttonBigger.removeEventListener('click', onBiggerButtonClick);
  buttonSmaller.removeEventListener('click', onSmallerButtonClick);
  filters.removeEventListener('input', chooseFilter);
  userForm.removeEventListener('submit', onFormSubmit);
};

const showModal = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  sliderContainer.classList.add('hidden');

  document.addEventListener('keydown', onEsc);
  uploadCancelButton.addEventListener('click', hideModal);
  uploadOverlay.addEventListener('click', onOverlayClick);

  buttonBigger.addEventListener('click', onBiggerButtonClick);
  buttonSmaller.addEventListener('click', onSmallerButtonClick);

  filters.addEventListener('input', chooseFilter);

  hashtagField.addEventListener('focus', onInputFocus);
  descriptionField.addEventListener('focus', onInputFocus);

  userForm.addEventListener('submit', onFormSubmit);
};


// ----------------------------------------------------util function i don`t know how to remove from here
// functions were dclared not like arrows, because they need to be used before the were declared
const isInputFocused = () => {
  const inputFocused = document.activeElement === hashtagField ||
  document.activeElement === descriptionField;
  return inputFocused;
};
function onEsc (evt) {
  if (isEsc(evt) && !isInputFocused) {
    hideModal();
  }
}

function onOverlayClick (evt) {
  if (evt.target === uploadOverlay) {
    hideModal();
  }
}

// -----------------final function to export

const modalControl = () => {
  photoInput.addEventListener('input', () => {
    showModal();
  });

  photoInput.addEventListener('change', () => {
    readFile(photoInput);
  });
};


export { modalControl };

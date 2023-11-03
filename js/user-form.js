import { validateTags } from './utils.js';
import { isEsc } from './utils.js';
const photoInput = document.querySelector('#upload-file');
const body = document.querySelector('body');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const userForm = document.querySelector('#upload-select-image');
const uploadCancelButton = document.querySelector('#upload-cancel');
const imagePreview = document.querySelector('.img-upload__preview');
const previews = document.querySelectorAll('.effects__preview');
const hashtagField = document.querySelector('.text__hashtags');
const filters = document.querySelector('.effects__list');
const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');
const scaleControlInput = document.querySelector('.scale__control--value');

const IMAGE_SIZE_STEP = 25;

// -------------------reading file and uploading previews

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
  const currentValue = parseInt(scaleControlInput.value);
  console.log(currentValue);
  console.log(typeof(currentValue));
  const newValue = currentValue + change;
  console.log(newValue);
  console.log(typeof(newValue));

  const applySize = (value) => {
    imagePreview.querySelector('img').style.transform = `scale(${value / 100})`;
  }

  if (newValue >= 0 && newValue <= 100) {
    scaleControlInput.setAttribute('value', `${newValue}%`);
    applySize(newValue);
  }
}

const onBiggerButtonClick = () => changeSize(IMAGE_SIZE_STEP);
const onSmallerButtonClick = () => changeSize(-IMAGE_SIZE_STEP);

// -------------------------util function i don`t know how to remove from here

const onEsc = (evt) => {
  if (isEsc(evt)) {
    hideModal();
  }
}

const onOverlayClick = (evt) => {
  if (evt.target === uploadOverlay) {
    hideModal();
  }
}

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
};

const showModal = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onEsc);
  uploadCancelButton.addEventListener('click', hideModal);
  uploadOverlay.addEventListener('click', onOverlayClick);

  buttonBigger.addEventListener('click', onBiggerButtonClick);
  buttonSmaller.addEventListener('click', onSmallerButtonClick);

  filters.addEventListener('input', chooseFilter);
};

// -----------handling effects

const addEffect = (input) => {
  const image = imagePreview.querySelector('img');
  image.setAttribute("class", "")
  image.classList.add(`effects__preview--${input.value}`);
}

const chooseFilter = (evt) => {
  const filter = evt.target;
  addEffect(filter);
}


// -----------------final function to export

const modalControl = () => {
  photoInput.addEventListener('input', () => {
    showModal();
  });

  photoInput.addEventListener('change', () => {
    readFile(photoInput);
  });
}

export { modalControl };

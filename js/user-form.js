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

const applySize = () => {
  const value = Number(scaleControlInput.value.slice(0, -1));
  imagePreview.querySelector('img').style.transform = `scale(${value / 100})`;
}

const makeBigger = () => {
  const currentValue = Number(scaleControlInput.value.slice(0, -1));
  const newValue = currentValue + 25;
  if (newValue <= 100) {
    scaleControlInput.setAttribute('value', `${newValue + scaleControlInput.value.slice(-1)}`);
    applySize();
  }
}
const makeSmaller = () => {
  const currentValue = Number(scaleControlInput.value.slice(0, -1));
  const newValue = currentValue - 25;
  if (newValue - 25 >= 0) {
    scaleControlInput.setAttribute('value', `${newValue + scaleControlInput.value.slice(-1)}`);
    applySize();
  }
}


// const pristine = new Pristine(userForm, {
//   classTo: 'input-wrapper',
//   errorTextParent: 'input-wrappper',
//   errorTextClass: 'input-error'
// });

// pristine.addValidator(
//   hashtagField,
//   validateTags,
//   'Неправильно заполнены хэштеги'
// );

// const onFormSubmit = (evt) => {
//   evt.preventDefault();
//   pristine.validate();
// };

const hideModal = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onEsc);
  uploadCancelButton.removeEventListener('click', hideModal);
  photoInput.value = '';

  scaleControlInput.setAttribute('value', '100%');
  buttonBigger.removeEventListener('click', makeBigger);
  buttonSmaller.removeEventListener('click', makeSmaller);
  filters.removeEventListener('input', chooseFilter);
};

const showModal = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onEsc);
  uploadCancelButton.addEventListener('click', hideModal);

  buttonBigger.addEventListener('click', makeBigger);
  buttonSmaller.addEventListener('click', makeSmaller);
  filters.addEventListener('input', chooseFilter);
};

function onEsc (evt) {
  evt.preventDefault();
  if (isEsc(evt)) {
    hideModal();
  }
}

const addEffect = (input) => {
  const image = imagePreview.querySelector('img');
  image.setAttribute("class", "")
  image.classList.add(`effects__preview--${input.value}`);
}

const chooseFilter = (evt) => {
  const filter = evt.target;
  addEffect(filter);
}

function test () {
  photoInput.addEventListener('input', () => {
    showModal();
  });

  photoInput.addEventListener('change', () => {
    readFile(photoInput);
  });




    // userForm.addEventListener('submit', () => {
    //   onFormSubmit();
    // });
  }

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

export { test };

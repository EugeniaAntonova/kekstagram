const picturesTitle = document.querySelector('.pictures__title');
const submitButton = document.querySelector('#upload-submit');
const form = document.querySelector('#upload-select-image');

const onLoadFail = (message) => {
  picturesTitle.textContent = message;
};

const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch(
      'https://25.javascript.pages.academy/kekstagram/data'
    );

    if (!response.ok) {
      throw new Error ('Не удалось загрузить фотографии, попробуйте перезагрузиться');
    } else {
      const data = await response.json();
      onSuccess(data);
    }
  } catch (error) {
    onFail(`${error.message}: Не удалось загрузить фотографии, попробуйте перезагрузиться`);
  }
};

const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch(
      'https://25.javascript.pages.academy/kekstagram',
      {
        method: 'POST',
        body,
      }
    );
    if (!response.ok) {
      throw new Error('Не удалось отправить форму. Попробуйте ещё раз');
    } else {
      onSuccess();
    }
  } catch (error) {
    onFail(error.message);
  }
};

const disableSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикуем...';
};

const enableSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const setOnFormSubmit = (fn) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const valid = pristine.validate();

    if (valid) {
      disableSubmitButton();
      await fn(new FormData(form));
      enableSubmitButton();
    }
  });
};

export {getData, onLoadFail, sendData};

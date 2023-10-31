import { showBigPic } from './big-picture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const picturesTitle = picturesContainer.querySelector('.pictures__title');
picturesTitle.classList.remove('visually-hidden');

const getPicture = (data) => {
  const {url, description, likes, comments} = data;
  const userPicture = pictureTemplate.cloneNode(true);

  userPicture.querySelector('.picture__img').src = url;
  userPicture.querySelector('.picture__img').alt = description;
  userPicture.querySelector('.picture__likes').textContent = likes;
  userPicture.querySelector('.picture__comments').textContent = comments.length;

  userPicture.addEventListener('click', () => {
    showBigPic(data);
  });
  return userPicture;
};

const renderPictures = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const userPicture = getPicture(picture);
    fragment.append(userPicture);
  });

  picturesContainer.append(fragment);
};

export {renderPictures};

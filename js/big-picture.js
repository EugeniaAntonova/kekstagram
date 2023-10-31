import { isEsc } from './utils.js';
const bigPicture = document.querySelector('.big-picture');
const commentCount = document.querySelector('.comments-count');
const commentList = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');
const cancelButton = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');

const createComment = ({avatar, name, message}) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');
  comment.innerHTML = '<img class="social__picture" src="" alt="" width="35" height="35">';
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  const userComment = document.createElement('p');
  userComment.classList.add('social__text');
  userComment.textContent = message;
  comment.append(userComment);
  return comment;
};

const renderComments = (comments) => {
  commentList.innerHTML = '';
  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentElement = createComment(comment);
    fragment.appendChild(commentElement);
  });
  commentList.append(fragment);
};

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
};

function onEscKeyDown (evt) {
  if(isEsc(evt)) {
    evt.preventDefault();
    hideBigPicture();
  }
}

const renderPictureDetails = ({ url, likes, description}) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;

};


const showBigPic = (data) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);

  renderPictureDetails(data);
  renderComments(data.comments);

  commentCount.textContent = data.comments.length;
  if (data.comments.length > 5) {
    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click', () => {
      
    })
    const comments = commentList.querySelectorAll('li');
    for (let i = 5; i < comments.length; i++) {
      comments[i].classList.add('hidden');
    }
  } else {
    commentsLoader.classList.add('hidden');
  }
};

cancelButton.addEventListener('click', () => {hideBigPicture();});

export { showBigPic };

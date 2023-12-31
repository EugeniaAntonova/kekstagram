import { isEsc } from './utils.js';
const bigPicture = document.querySelector('.big-picture');
const bigPictureOverlay = document.querySelector('.overlay');
const commentCount = document.querySelector('.comments-count');
const commentList = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');
const cancelButton = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');

// ---------------------------------filling up the markup with our data

const renderPictureDetails = ({ url, likes, description}) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;

};

// -----------------------------------creating comments and adding them to the markup

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


const commentsAmountControl = () => {
  const INCREMENT = 5;
  let commentsShown = 0;
  let commentsToShow = 5;
  let comments = commentList.children;

  if (comments.length > 5) {
    comments = [...comments];
    comments.slice(5).forEach((comment) => comment.classList.add('hidden'));
    commentsShown += INCREMENT;
    commentsToShow += INCREMENT;
    commentsLoader.classList.remove('hidden');

    const showMoreComments = () => {
      comments.slice(commentsShown, commentsToShow).forEach((comment) => {
        comment.classList.remove('hidden');
      });
      commentsShown += INCREMENT;
      commentsToShow += INCREMENT;
      const hiddenComments = commentList.getElementsByClassName('hidden');
      if (hiddenComments.length === 0) {
        commentsLoader.classList.add('hidden');
      }
    };

    commentsLoader.addEventListener('click', showMoreComments);

  }
};

// ------------------------------big picture controls

const hideBigPic = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
  cancelButton.removeEventListener('click', hideBigPic);
  bigPictureOverlay.removeEventListener('click', onOverlayClick);
};


const showBigPic = (data) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
  bigPictureOverlay.addEventListener('click', onOverlayClick);
  cancelButton.addEventListener('click', hideBigPic);

  commentCount.textContent = data.comments.length;
  renderPictureDetails(data);
  renderComments(data.comments);
  commentsAmountControl(data);
};


// ------------------setting functions to close everything


function onEscKeyDown (evt) {
  if(isEsc(evt)) {
    evt.preventDefault();
    hideBigPic();
  }
}

function onOverlayClick (evt) {
  if (evt.target === bigPictureOverlay) {
    hideBigPic();
  }
}

export { showBigPic };

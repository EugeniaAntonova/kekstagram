//рандомайзер
function getRandomInteger (a, b) {
  let randomInteger = 0;
  const startPoint = Math.min(Math.abs(a), Math.abs(b));
  const endPoint = Math.max(Math.abs(a), Math.abs(b));
  if (startPoint === endPoint) {
    randomInteger = startPoint;
  }
  randomInteger = Math.round((Math.random()*(endPoint - startPoint)) + startPoint);
  return randomInteger;
}

// проверка длины строки
function checkStringLength (line, maxLength) {
  let isLengthRight = false;
  if (line.length <= maxLength) {
    isLengthRight = true;
  }
  return isLengthRight;
}

// проверка нажатой кнопки на соответствие esc

const isEsc = (evt) => evt.key === 'Escape';

// валидация хэштегов

const MAX_HASHTAGS_COUNT = 5;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const INVALID_HASHTAG_SYMBOLS = /\W+/gi;

const isFittingTag = (tag) => {
  const valid = tag.slice(0,1) === '#' && tag.slice(1).length <= MAX_HASHTAG_LENGTH && tag.slice(1).length >= MIN_HASHTAG_LENGTH && !INVALID_HASHTAG_SYMBOLS.test(tag.slice(1));
  return valid;
}

const isCountValid = (tags) => {
  return tags.length <= MAX_HASHTAGS_COUNT;
}

const hasUniqueTags = (tags) => {
  const normalized = tags.map((tag) => tag.toLowerCase());
  return normalized.length === new Set(normalized).size;
}

const validateTags = (tags) => {
  const prepared = tags.trim().split(' ');
  return isCountValid(prepared) && hasUniqueTags(prepared) && prepared.every(isFittingTag);
}


export {getRandomInteger, checkStringLength, isEsc, validateTags};

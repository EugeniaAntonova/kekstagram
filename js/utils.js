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

const HASHTAGS_COUNT = 5;
const HASHTAG_MIN_LENGTH = 2;
const HASHTAG_MAX_LENGTH = 20;
const INVALID_HASHTAG_SYMBOLS = /\W+/gi;
// const HASHTAG_REG_EXP = /#[а-яёa-z\d]{1,19}/gi;

const isFittingTag = (tag) => {
  const valid = tag.slice(0,1) === '#' && tag.slice(1).length <= HASHTAG_MAX_LENGTH && tag.length >= HASHTAG_MIN_LENGTH && !INVALID_HASHTAG_SYMBOLS.test(tag.slice(1));
  return valid;
};
// const isFittingTag = (tag) => {
//   const valid = HASHTAG_REG_EXP.test(tag);
//   return valid;
// };

const isCountValid = (tags) => {
  const countValid = tags.length <= HASHTAGS_COUNT;
  return countValid;
};

const hasUniqueTags = (tags) => {
  const normalized = tags.map((tag) => tag.toLowerCase());
  return normalized.length === new Set(normalized).size;
};

const validateTags = (tags) => {
  const prepared = tags.trim().split(' ');
  return isCountValid(prepared) && hasUniqueTags(prepared) && prepared.every(isFittingTag);
};

const filtersRanges = {
  'chrome': {
    min: 0,
    max: 1,
    step: 0.1,
    filter: 'grayscale'
  },
  'sepia': {
    min: 0,
    max: 1,
    step: 0.1,
    filter: 'sepia'
  },
  'marvin': {
    min: 0,
    max: 100,
    step: 1,
    filter: 'invert'
  },
  'phobos': {
    min: 0,
    max: 3,
    step: 0.1,
    filter: 'blur'
  },
  'heat': {
    min: 1,
    max: 3,
    step: 0.1,
    filter: 'brightness'
  }
};

export {getRandomInteger, checkStringLength, isEsc, validateTags, filtersRanges};

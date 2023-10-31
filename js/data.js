import { getRandomInteger } from './utils.js';

const names = ['Jane', 'Kate', 'Tom', 'Richard', 'Harry', 'John', 'James', 'Molly', 'Beth'];
const messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const descriptions = ['Chilling', 'Lovely photo i have done tonight', 'My first photo online', 'Having fun with my camera'];

function getUniqueRandomNumber (min, max) {
  const usedNumbers = [];
  return function () {
    if (usedNumbers.length >= max - min + 1) {
      return null;
    }
    let currentNumber = getRandomInteger(min, max);
    while (usedNumbers.includes(currentNumber)) {
      currentNumber = getRandomInteger(min, max);
    }
    return currentNumber;
  };
}

function getRandomItem (someArray) {
  const arrayItem = someArray[getRandomInteger(0, someArray.length - 1)];
  return arrayItem;
}

function getStringArray (items) {
  const stringArray = [];
  // было до items.length временно решила скоратить, чтобы удобнее работать с комментами
  const stringArrayLength = getRandomInteger(1, 3);
  for (let i = 0; i < stringArrayLength; i++) {
    const item = getRandomItem(items);
    if (!stringArray.includes(item)) {
      stringArray.push(item);
    }
  }
  return stringArray;
}

function createComments () {
  const uniqueNumber = getUniqueRandomNumber(1, 6);
  return {
    id: getRandomInteger(1, 400),
    avatar: `img/avatar-${uniqueNumber()}.svg`,
    message: getStringArray(messages),
    name: getRandomItem(names)
  };
}

const getComments = function () {
  const commentsArrayLength = getRandomInteger(1, 15);
  const commentsArray = Array.from({length: commentsArrayLength}, createComments);
  return commentsArray;
};

const createDescription = function () {
  const uniqueId = getUniqueRandomNumber(1, 25);
  const uniqueUrl = getUniqueRandomNumber(1, 25);
  return {
    id: uniqueId(),
    url: `photos/${uniqueUrl()}.jpg`,
    description: getRandomItem(descriptions),
    likes: getRandomInteger(15, 200),
    comments: getComments(),
  };
};

const photosGallery = () => Array.from({length: 25}, createDescription);

export {photosGallery};

'use strict';
var OBJECT_QUANTITY = 25;
var AVATARS_QUANTITY = 6;
var MAX_COMMENTS_QUANTITY = 5;
var MAX_LIKES = 200;
var MIN_LIKES = 15;
var NAMES = ['Саша', 'Костя', 'Даша', 'Марина', 'Ирина', 'Василий'];
var DESCRIPTIONS = [
  'Фото 1',
  'Какое-то фоток 2',
  'Наверное фоток 3',
  'А это фоток 4',
  'Не совсем понятно',
  'Что с описаниями этими'
];
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

var fragment = document.createDocumentFragment();
var picturesSection = document.querySelector('.pictures');
var picturesArray = [];

var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var makeComment = function () {
  return {
    avatar: 'img/avatar-' + getRandomValue(1, AVATARS_QUANTITY) + '.svg',
    message: COMMENTS[getRandomValue(0, COMMENTS.length - 1)],
    name: NAMES[getRandomValue(0, NAMES.length - 1)],
  };
};

var makeComments = function () {
  var commentsArray = [];
  for (var i = 1; i <= getRandomValue(1, MAX_COMMENTS_QUANTITY); i++) {
    commentsArray.push(makeComment());
  }
  return commentsArray;
};

var makePicturesArray = function () {
  for (var i = 1; i <= OBJECT_QUANTITY; i++) {
    picturesArray.push({
      url: 'photos/' + i + '.jpg',
      description: DESCRIPTIONS[getRandomValue(0, DESCRIPTIONS.length - 1)],
      likes: getRandomValue(MIN_LIKES, MAX_LIKES),
      commets: makeComments(),
    });
  }
};

var renderPicture = function (picture) {
  var newPicture = pictureTemplate.cloneNode(true);
  newPicture.querySelector('.picture__img').src = picture.url;
  newPicture.querySelector('.picture__comments').textContent = picture.commets.length;
  newPicture.querySelector('.picture__likes').textContent = picture.likes;
  return newPicture;
};

var addElementsToPage = function (array, pageTarget, renderFunction) {
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderFunction(array[i]));
  }
  pageTarget.appendChild(fragment);
};

makePicturesArray();
addElementsToPage(picturesArray, picturesSection, renderPicture);

// task 3-3
var bigPicture = document.querySelector('.big-picture');
var bigPictureComment = bigPicture.querySelector('.social__comment');

bigPicture.classList.remove('hidden');
bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');

var updateBigPictureContent = function (content) {
  var bigPictureComments = bigPicture.querySelector('.social__comments');
  bigPicture.querySelector('.big-picture__img').src = content.url;
  bigPicture.querySelector('.likes-count').textContent = content.likes;
  bigPicture.querySelector('.comments-count').textContent = content.commets.length;
  bigPicture.querySelector('.social__caption').textContent = content.description;

  addElementsToPage(content.commets, bigPictureComments, renderComment);
};

var renderComment = function (comment) {
  var newComment = bigPictureComment.cloneNode(true);
  var commentImage = newComment.querySelector('.social__picture');
  commentImage.src = comment.avatar;
  commentImage.alt = comment.name;
  newComment.querySelector('.social__text').textContent = comment.message;
  return newComment;
};

updateBigPictureContent(picturesArray[1]);


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

var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var makeComment = function () {
  var comment = {
    avatar: 'img/avatar-' + getRandomValue(1, AVATARS_QUANTITY) + '.svg',
    message: COMMENTS[getRandomValue(0, COMMENTS.length - 1)],
    name: NAMES[getRandomValue(0, NAMES.length - 1)],
  };
  return comment;
};

var makeComments = function () {
  var commentsArray = [];
  for (var i = 1; i <= getRandomValue(1, MAX_COMMENTS_QUANTITY); i++) {
    var newComment = makeComment();
    commentsArray.push(newComment);
  }
  return commentsArray;
};

var makePicturesArray = function () {
  var picturesArray = [];
  for (var i = 1; i <= OBJECT_QUANTITY; i++) {
    var picture = {
      url: 'photos/' + i + '.jpg',
      description: getRandomValue(0, DESCRIPTIONS.length - 1),
      likes: getRandomValue(MIN_LIKES, MAX_LIKES),
      commets: makeComments(),
    };
    picturesArray.push(picture);
  }
  return picturesArray;
};

var renderPicture = function (picture) {
  var newPicture = pictureTemplate.cloneNode(true);
  newPicture.querySelector('.picture__img').src = picture.url;
  newPicture.querySelector('.picture__comments').textContent = picture.commets.length;
  newPicture.querySelector('.picture__likes').textContent = picture.likes;
  return newPicture;
};

var addPicturesToPage = function () {
  var pictures = makePicturesArray();
  for (var i = 0; i < pictures.length; i++) {
    fragment.appendChild(renderPicture(pictures[i]));
  }
  picturesSection.appendChild(fragment);
};

addPicturesToPage();


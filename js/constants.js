'use strict';

(function () {
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
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var SCALE_CONTROL_MAX_VALUE = 100;
  var SCALE_CONTROL_MIN_VALUE = 25;
  var SCALE_CONTROL_STEP = 25;
  var FILTER_ORIGINAL_NAME = 'none';
  var FILTERS = [
    {
      TITLE: 'chrome',
      CLASS: 'effects__preview--chrome',
      STYLE: 'filter: grayscale',
      MIN_VALUE: 0,
      MAX_VALUE: 1,
      UNIT: '',
    },
    {
      TITLE: 'sepia',
      CLASS: 'effects__preview--sepia',
      STYLE: 'filter: sepia',
      MIN_VALUE: 0,
      MAX_VALUE: 1,
      UNIT: '',
    },
    {
      TITLE: 'marvin',
      CLASS: 'effects__preview--marvin',
      STYLE: 'filter: invert',
      MIN_VALUE: 0,
      MAX_VALUE: 100,
      UNIT: '%',
    },
    {
      TITLE: 'phobos',
      CLASS: 'effects__preview--phobos',
      STYLE: 'filter: blur',
      MIN_VALUE: 1,
      MAX_VALUE: 3,
      UNIT: 'px',
    },
    {
      TITLE: 'heat',
      CLASS: 'effects__preview--heat',
      STYLE: 'filter: brightness',
      MIN_VALUE: 1,
      MAX_VALUE: 3,
      UNIT: '',
    },
  ];
  var MAX_HASHTAGS = 5;
  var MAX_HASHTAG_LENGTH = 20;

  window.CONST = {
    OBJECT_QUANTITY: OBJECT_QUANTITY,
    AVATARS_QUANTITY: AVATARS_QUANTITY,
    MAX_COMMENTS_QUANTITY: MAX_COMMENTS_QUANTITY,
    MAX_LIKES: MAX_LIKES,
    MIN_LIKES: MIN_LIKES,
    NAMES: NAMES,
    DESCRIPTIONS: DESCRIPTIONS,
    COMMENTS: COMMENTS,
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    SCALE_CONTROL_MAX_VALUE: SCALE_CONTROL_MAX_VALUE,
    SCALE_CONTROL_MIN_VALUE: SCALE_CONTROL_MIN_VALUE,
    SCALE_CONTROL_STEP: SCALE_CONTROL_STEP,
    FILTER_ORIGINAL_NAME: FILTER_ORIGINAL_NAME,
    FILTERS: FILTERS,
    MAX_HASHTAGS: MAX_HASHTAGS,
    MAX_HASHTAG_LENGTH: MAX_HASHTAG_LENGTH,
  };
})();

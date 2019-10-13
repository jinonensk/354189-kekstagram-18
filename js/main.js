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
var bigPictureComments = bigPicture.querySelector('.social__comments');

bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');

var updateBigPictureContent = function (content) {
  bigPicture.querySelector('.big-picture__img img').src = content.url;
  bigPicture.querySelector('.likes-count').textContent = content.likes;
  bigPicture.querySelector('.comments-count').textContent = content.commets.length;
  bigPicture.querySelector('.social__caption').textContent = content.description;

  addElementsToPage(content.commets, bigPictureComments, renderComment);
};

var cloneAndCleanComment = function () {
  var newComment = bigPicture.querySelector('.social__comment');
  while (bigPictureComments.firstChild) {
    bigPictureComments.removeChild(bigPictureComments.firstChild);
  }
  return newComment;
};

var savedCommentNode = cloneAndCleanComment();

var renderComment = function (comment) {
  var newComment = savedCommentNode.cloneNode(true);
  var commentImage = newComment.querySelector('.social__picture');
  commentImage.src = comment.avatar;
  commentImage.alt = comment.name;
  newComment.querySelector('.social__text').textContent = comment.message;
  return newComment;
};

// task 4
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

var uploadImage = document.querySelector('#upload-file');
var imgUpload = document.querySelector('.img-upload__overlay');
var uploadFormClose = imgUpload.querySelector('.img-upload__cancel');
var uploadFormValue = imgUpload.querySelector('.scale__control--value');
var uploadFormImage = imgUpload.querySelector('.img-upload__preview img');

var toTransformImage = function (value) {
  var scale = value / 100;
  uploadFormImage.style.cssText = 'transform: scale(' + scale + ')';
};

var setScaleValue = function (value) {
  uploadFormValue.value = value + '%';
  toTransformImage(value);
};

var onImgUploadEscPress = function (evt) {
  if (
    evt.keyCode === ESC_KEYCODE
    && !evt.target.classList.contains('text__hashtags')
    && !evt.target.classList.contains('text__description')
  ) {
    closeImgUpload();
  }
};

var openImgUpload = function () {
  imgUpload.classList.remove('hidden');
  document.addEventListener('keydown', onImgUploadEscPress);
  setScaleValue(SCALE_CONTROL_MAX_VALUE);
};

var closeImgUpload = function () {
  imgUpload.classList.add('hidden');
  uploadImage.value = '';
  document.removeEventListener('keydown', onImgUploadEscPress);
};

uploadImage.addEventListener('change', function () {
  openImgUpload();
});

uploadFormClose.addEventListener('click', function () {
  closeImgUpload();
});

var uploadFormMinus = imgUpload.querySelector('.scale__control--smaller');
var uploadFormPlus = imgUpload.querySelector('.scale__control--bigger');

uploadFormMinus.addEventListener('click', function () {
  var currentValue = parseInt(uploadFormValue.value, 10);
  currentValue -= SCALE_CONTROL_STEP;
  if (currentValue >= SCALE_CONTROL_MIN_VALUE) {
    setScaleValue(currentValue);
  } else {
    setScaleValue(SCALE_CONTROL_MIN_VALUE);
  }
});

uploadFormPlus.addEventListener('click', function () {
  var currentValue = parseInt(uploadFormValue.value, 10);
  currentValue += SCALE_CONTROL_STEP;
  if (currentValue <= SCALE_CONTROL_MAX_VALUE) {
    setScaleValue(currentValue);
  } else {
    setScaleValue(SCALE_CONTROL_MAX_VALUE);
  }
});

var filterButtonts = imgUpload.querySelectorAll('.effects__radio');
var filterSlider = imgUpload.querySelector('.img-upload__effect-level');
var effectLevelPin = imgUpload.querySelector('.effect-level__pin');

filterSlider.classList.add('hidden');

var currentFilter = {};
var toApplyFilter = function (name) {
  if (name !== FILTER_ORIGINAL_NAME) {
    for (var i = 0; i < FILTERS.length; i++) {
      if (FILTERS[i].TITLE === name) {
        uploadFormImage.classList = '';
        uploadFormImage.classList.add(FILTERS[i].CLASS);
        filterSlider.classList.remove('hidden');
        currentFilter = FILTERS[i];
      }
    }
  } else {
    uploadFormImage.classList = '';
    filterSlider.classList.add('hidden');
  }
};

var setFilterStyle = function (value) {
  uploadFormImage.style.cssText = currentFilter.STYLE + '(' + value + currentFilter.UNIT + ')';
};

for (var i = 0; i < filterButtonts.length; i++) {
  filterButtonts[i].addEventListener('change', function (evt) {
    toApplyFilter(evt.target.value);
    setFilterStyle(calcFilterValue(SCALE_CONTROL_MAX_VALUE));
    toTransformImage(parseInt(uploadFormValue.value, 10));
  });
}

var calcFilterValue = function (value) {
  return (currentFilter.MAX_VALUE - currentFilter.MIN_VALUE) * (value / 100) + currentFilter.MIN_VALUE;
};

effectLevelPin.addEventListener('mouseup', function (evt) {
  var currentValue = parseInt(evt.target.style.left, 10);
  setFilterStyle(calcFilterValue(currentValue));
});

var checkValidation = function (value) {
  var hashtags = value.trim().toLowerCase().split(/\s+/);
  for (var k = 0; k < hashtags.length; k++) {
    if (hashtags[k][0] !== '#') {
      return 'хэштэг должен начинаться с \'#\'';
    }
    if (hashtags[k] === '#') {
      return 'хэштэш не может быть только \'#\'';
    }
    if (hashtags[k].length > MAX_HASHTAG_LENGTH) {
      return 'хэштэш не может быть длинее 20 символов';
    }
    if (hashtags[k].lastIndexOf('#') !== 0) {
      return 'хэштеги должны быть разделены пробелами';
    }
    var duplicatedHashtags = hashtags.filter(function (item) {
      return item === hashtags[k];
    });
    if (duplicatedHashtags.length > 1) {
      return 'хэштеги не могут быть одинаковыми';
    }
  }
  if (hashtags.length > MAX_HASHTAGS) {
    return 'Масимум 5 хэштегов';
  }
  return '';
};

var textHashtags = imgUpload.querySelector('.text__hashtags');
textHashtags.addEventListener('input', function (evt) {
  textHashtags.setCustomValidity(checkValidation(evt.target.value));
});

// task 4-3
var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
var pictures = document.querySelector('.pictures');

var getCurrentImageContent = function (str) {
  var url = str.slice(str.indexOf('photos'));
  return picturesArray.filter(function (item) {
    return item.url === url;
  })[0];
};

var onBigPictureEscPress = function (evt) {
  if (
    evt.keyCode === ESC_KEYCODE
    && !evt.target.classList.contains('social__footer-text')
  ) {
    closeBigPicture();
  }
};

var openBigPicture = function () {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onBigPictureEscPress);
};

var closeBigPicture = function () {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onBigPictureEscPress);
  savedCommentNode = cloneAndCleanComment();
};

pictures.addEventListener('click', function (evt) {
  if (evt.screenX !== 0) {
    updateBigPictureContent(getCurrentImageContent(evt.target.src));
    openBigPicture();
  }
});

pictures.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    updateBigPictureContent(getCurrentImageContent(evt.target.querySelector('img').src));
    openBigPicture();
  }
});

bigPictureClose.addEventListener('click', function () {
  closeBigPicture();
});

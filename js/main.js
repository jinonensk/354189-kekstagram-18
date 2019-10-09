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

// bigPicture.classList.remove('hidden');
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

// task 4
var ESC_KEYCODE = 27;
var SCALE_CONTROL_MAX_VALUE = 100;
var SCALE_CONTROL_MIN_VALUE = 0;
var SCALE_CONTROL_STEP = 25;
var PIN_INITIAL_VALUE = 100;
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
var REGEXP_FOR_HASHTAGS = '(#[A-Za-zА-Яа-я0-9ё]{1,19})';
var MAX_HASHTAGS = 5;

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
var effectLevelBackground = imgUpload.querySelector('.effect-level__depth');
var effectLevelInput = imgUpload.querySelector('.effect-level__value');

filterSlider.classList.add('hidden');

var updateEffectLevel = function (value) {
  effectLevelPin.style.left = value + '%';
  effectLevelBackground.style.width = value + '%';
  effectLevelInput.value = value;
};

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

for (var i = 0; i < filterButtonts.length; i++) {
  filterButtonts[i].addEventListener('change', function (evt) {
    toApplyFilter(evt.target.value);
    setFilterValue(calcFilterValue(SCALE_CONTROL_MAX_VALUE));
  });
}

var setFilterValue = function (value) {
  uploadFormImage.style.cssText = currentFilter.STYLE + '(' + value + currentFilter.UNIT + ')';
};

var calcFilterValue = function (value) {
  return (currentFilter.MAX_VALUE - currentFilter.MIN_VALUE) * (value / 100) + currentFilter.MIN_VALUE;
};

effectLevelPin.addEventListener('mouseup', function (evt) {
  var currentValue = parseInt(evt.target.style.left, 10);
  setFilterValue(calcFilterValue(currentValue));
});

updateEffectLevel(PIN_INITIAL_VALUE);

var textHashtags = imgUpload.querySelector('.text__hashtags');
textHashtags.addEventListener('input', function () {
  textHashtags.setCustomValidity('');
});

var checkDuplicateHashtags = function (array) {
  var isDuplicate = false;
  for (var k = 0; k < array.length; k++) {
    var currentHashTag = array[k];
    for (var j = k + 1; j < array.length; j++) {
      if (currentHashTag === array[j]) {
        isDuplicate = true;
        break;
      }
    }
  }
  return isDuplicate;
};

var validateHashtags = function (array) {
  var isValidate = true;
  for (var k = 0; k < array.length; k++) {
    if (!array[k].match(REGEXP_FOR_HASHTAGS)) {
      isValidate = false;
    }
  }
  return isValidate;
};

var uploadForm = document.querySelector('.img-upload__form');
uploadForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  if (textHashtags.value) {
    var hashtags = textHashtags.value.toLowerCase().split(' ');
    if (hashtags.length > MAX_HASHTAGS) {
      textHashtags.setCustomValidity('Хэштеги должны быть уникальными');
    }
    if (checkDuplicateHashtags(hashtags)) {
      textHashtags.setCustomValidity('Хэштеги должны быть уникальными');
    }
    if (!validateHashtags(hashtags)) {
      textHashtags.setCustomValidity('Неправильный хэштег. Начните с #, добавьте от 2 до 19 символов');
    }
  }
});


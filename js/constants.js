'use strict';

(function () {
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
  var SLIDER_LENGTH = 453;
  var MIN_SLIDER_VALUE = 1;
  var MAX_SLIDER_VALUE = 100;
  var SUCCESS_SERVER_ANSWER = 200;
  var XHR_TIMEOUT = 30 * 1000; // 30s
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';
  var COMMENTS_PART_SIZE = 5;
  var PICTURES_FILTERS = {
    THROTTLE_INTERVAL: 500, // 0,5s
    QUANTITY_IN_RANDOM: 10,
    FIELD_NAME_IN_DISCUSSED: 'comments',
    POPULAR_BUTTON_ID: 'filter-popular',
    RANDOM_BUTTON_ID: 'filter-random',
    DISCUSSED_BUTTON_ID: 'filter-discussed',
  };

  window.CONST = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    SCALE_CONTROL_MAX_VALUE: SCALE_CONTROL_MAX_VALUE,
    SCALE_CONTROL_MIN_VALUE: SCALE_CONTROL_MIN_VALUE,
    SCALE_CONTROL_STEP: SCALE_CONTROL_STEP,
    FILTER_ORIGINAL_NAME: FILTER_ORIGINAL_NAME,
    FILTERS: FILTERS,
    MAX_HASHTAGS: MAX_HASHTAGS,
    MAX_HASHTAG_LENGTH: MAX_HASHTAG_LENGTH,
    SLIDER_LENGTH: SLIDER_LENGTH,
    MIN_SLIDER_VALUE: MIN_SLIDER_VALUE,
    MAX_SLIDER_VALUE: MAX_SLIDER_VALUE,
    SUCCESS_SERVER_ANSWER: SUCCESS_SERVER_ANSWER,
    URL_LOAD: URL_LOAD,
    XHR_TIMEOUT: XHR_TIMEOUT,
    COMMENTS_PART_SIZE: COMMENTS_PART_SIZE,
    URL_UPLOAD: URL_UPLOAD,
    PICTURES_FILTERS: PICTURES_FILTERS,
  };
})();

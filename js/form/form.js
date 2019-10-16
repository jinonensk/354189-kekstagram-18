'use strict';

(function () {
  var CONST = window.CONST;

  var uploadImage = document.querySelector('#upload-file');
  var imgUpload = document.querySelector('.img-upload__overlay');
  var uploadFormClose = imgUpload.querySelector('.img-upload__cancel');
  var uploadFormValue = imgUpload.querySelector('.scale__control--value');
  var uploadFormImage = imgUpload.querySelector('.img-upload__preview img');

  var setScaleValue = function (value) {
    uploadFormValue.value = value + '%';
    uploadFormImage.style.cssText = window.form.toTransformImage(value);
  };

  var onImgUploadEscPress = function (evt) {
    if (
      evt.keyCode === CONST.ESC_KEYCODE
      && !evt.target.classList.contains('text__hashtags')
      && !evt.target.classList.contains('text__description')
    ) {
      closeImgUpload();
    }
  };

  var openImgUpload = function () {
    imgUpload.classList.remove('hidden');
    document.addEventListener('keydown', onImgUploadEscPress);
    setScaleValue(CONST.SCALE_CONTROL_MAX_VALUE);
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
    currentValue -= CONST.SCALE_CONTROL_STEP;
    if (currentValue >= CONST.SCALE_CONTROL_MIN_VALUE) {
      setScaleValue(currentValue);
    } else {
      setScaleValue(CONST.SCALE_CONTROL_MIN_VALUE);
    }
  });

  uploadFormPlus.addEventListener('click', function () {
    var currentValue = parseInt(uploadFormValue.value, 10);
    currentValue += CONST.SCALE_CONTROL_STEP;
    if (currentValue <= CONST.SCALE_CONTROL_MAX_VALUE) {
      setScaleValue(currentValue);
    } else {
      setScaleValue(CONST.SCALE_CONTROL_MAX_VALUE);
    }
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
      if (hashtags[k].length > CONST.MAX_HASHTAG_LENGTH) {
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
    if (hashtags.length > CONST.MAX_HASHTAGS) {
      return 'Масимум 5 хэштегов';
    }
    return '';
  };

  var textHashtags = imgUpload.querySelector('.text__hashtags');
  textHashtags.addEventListener('input', function (evt) {
    textHashtags.setCustomValidity(checkValidation(evt.target.value));
  });

  window.form = {
    imgUpload: imgUpload,
    uploadFormValue: uploadFormValue,
    uploadFormImage: uploadFormImage,
    toTransformImage: function (value) {
      var scale = value / 100;
      return 'transform: scale(' + scale + ')';
    },
  };
})();

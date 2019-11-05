'use strict';

(function () {
  var CONST = window.CONST;
  var utils = window.utils;
  var dbRequests = window.dbRequests;

  var uploadForm = document.querySelector('.img-upload__form');
  var uploadImage = uploadForm.querySelector('#upload-file');
  var imgUpload = uploadForm.querySelector('.img-upload__overlay');
  var uploadFormClose = uploadForm.querySelector('.img-upload__cancel');
  var uploadFormValue = uploadForm.querySelector('.scale__control--value');
  var uploadFormImage = uploadForm.querySelector('.img-upload__preview img');
  var effectLevelPin = uploadForm.querySelector('.effect-level__pin');
  var effectLevelDepth = uploadForm.querySelector('.effect-level__depth');
  var filterSlider = imgUpload.querySelector('.img-upload__effect-level');

  var setScaleValue = function (value) {
    var currentImageStyle = uploadFormImage.style.cssText;
    var savedFilterValue = currentImageStyle.slice(0, currentImageStyle.indexOf(';'));
    uploadFormValue.value = value + '%';
    uploadFormImage.style.cssText = savedFilterValue + '; ' + window.form.toTransformImage(value);
  };

  var imgUploadEscPressHandler = function (evt) {
    if (
      evt.keyCode === CONST.ESC_KEYCODE
      && !evt.target.classList.contains('text__hashtags')
      && !evt.target.classList.contains('text__description')
    ) {
      closeImgUpload();
    }
  };

  var removeErrorMessage = function () {
    var errorMessage = document.querySelector('.top-error-message');
    if (errorMessage) {
      errorMessage.remove();
    }
    document.removeEventListener('click', removeErrorMessage);
  };

  var openImgUpload = function () {
    imgUpload.classList.remove('hidden');
    document.addEventListener('keydown', imgUploadEscPressHandler);
    setScaleValue(CONST.SCALE_CONTROL_MAX_VALUE);
  };

  var closeImgUpload = function () {
    filterSlider.classList.add('hidden');
    imgUpload.classList.add('hidden');
    uploadForm.reset();
    effectLevelPin.style.left = CONST.MAX_SLIDER_VALUE + '%';
    effectLevelDepth.style.width = CONST.MAX_SLIDER_VALUE + '%';
    uploadFormImage.style.cssText = '';
    uploadFormImage.classList = '';
    document.removeEventListener('keydown', imgUploadEscPressHandler);
  };

  uploadImage.addEventListener('change', function () {
    var file = uploadImage.files[0];
    var fileName = file.name.toLowerCase();
    var matches = CONST.FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        uploadFormImage.src = reader.result;
      });
      reader.readAsDataURL(file);
      openImgUpload();
    } else {
      utils.errorHandler('Неподходящее расширение. Попробуйте: \'gif\', \'jpg\', \'jpeg\' или  \'png\'');
      document.addEventListener('click', removeErrorMessage);
    }
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

  var fragment = document.createDocumentFragment();
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  var closeSuccessModal = function () {
    var element = document.querySelector('.success');
    element.parentNode.removeChild(element);
    document.removeEventListener('keydown', succesModalEscPressHandler);
    document.removeEventListener('click', succesModalClickHandler);
  };

  var succesModalEscPressHandler = function (evt) {
    if (evt.keyCode === CONST.ESC_KEYCODE) {
      closeSuccessModal();
    }
  };

  var succesModalClickHandler = function (evt) {
    if (
      !evt.target.classList.contains('success__inner')
      && !evt.target.classList.contains('success__title')
    ) {
      closeSuccessModal();
    }
  };

  var uploadSuccessHandler = function () {
    var newSuccess = successTemplate.cloneNode(true);
    fragment.appendChild(newSuccess);
    main.appendChild(fragment);
    document.addEventListener('keydown', succesModalEscPressHandler);
    document.addEventListener('click', succesModalClickHandler);
    closeImgUpload();
  };

  uploadForm.addEventListener('submit', function (evt) {
    dbRequests.upload(new FormData(uploadForm), uploadSuccessHandler, uploadErrorHandler);
    evt.preventDefault();
  });

  var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');

  var closeErrorModal = function () {
    var element = document.querySelector('.error');
    element.parentNode.removeChild(element);
    document.removeEventListener('keydown', errorModalEscPressHandler);
    document.removeEventListener('click', errorOverlaylClickHandler);
  };

  var errorModalEscPressHandler = function (evt) {
    if (evt.keyCode === CONST.ESC_KEYCODE) {
      closeErrorModal();
    }
  };

  var errorOverlaylClickHandler = function (evt) {
    if (evt.target.classList.contains('error')) {
      closeErrorModal();
      closeImgUpload();
    }
  };

  var errorTryAgainlClickHandler = function () {
    closeErrorModal();
    imgUpload.classList.remove('hidden');
  };

  var errorAnotherFileClickHandler = function () {
    closeErrorModal();
    closeImgUpload();
  };

  var uploadErrorHandler = function (errorMessage) {
    var newError = errorTemplate.cloneNode(true);
    newError.querySelector('.error__title').textContent = errorMessage;
    newError.querySelector('.error__button:first-child').addEventListener('click', errorTryAgainlClickHandler);
    newError.querySelector('.error__button:nth-child(2)').addEventListener('click', errorAnotherFileClickHandler);
    fragment.appendChild(newError);
    main.appendChild(fragment);

    document.addEventListener('keydown', errorModalEscPressHandler);
    document.addEventListener('click', errorOverlaylClickHandler);
    imgUpload.classList.add('hidden');
  };

  window.form = {
    imgUpload: imgUpload,
    uploadValue: uploadFormValue,
    uploadImage: uploadFormImage,
    effectLevelPin: effectLevelPin,
    effectLevelDepth: effectLevelDepth,
    filterSlider: filterSlider,
    toTransformImage: function (value) {
      var scale = value / CONST.DEFAULT_DIVIDER;
      return 'transform: scale(' + scale + ')';
    },
  };
})();

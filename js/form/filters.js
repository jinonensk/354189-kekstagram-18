'use strict';

(function () {
  var CONST = window.CONST;
  var form = window.form;

  var filterButtonts = form.imgUpload.querySelectorAll('.effects__radio');
  var filterSlider = form.imgUpload.querySelector('.img-upload__effect-level');
  var effectLevelInput = form.imgUpload.querySelector('.effect-level__value');

  filterSlider.classList.add('hidden');

  var currentFilter = {};
  var toApplyFilter = function (name) {
    if (name !== CONST.FILTER_ORIGINAL_NAME) {
      for (var i = 0; i < CONST.FILTERS.length; i++) {
        if (CONST.FILTERS[i].TITLE === name) {
          form.uploadFormImage.classList = '';
          form.uploadFormImage.classList.add(CONST.FILTERS[i].CLASS);
          filterSlider.classList.remove('hidden');
          currentFilter = CONST.FILTERS[i];
          return;
        }
      }
    } else {
      form.uploadFormImage.classList = '';
      filterSlider.classList.add('hidden');
    }
  };

  var setFilterStyle = function (value) {
    return currentFilter.STYLE + '(' + value + currentFilter.UNIT + ')';
  };

  var calcFilterValue = function (value) {
    return (currentFilter.MAX_VALUE - currentFilter.MIN_VALUE) * (value / 100) + currentFilter.MIN_VALUE;
  };

  var calcSliderValue = function (positition, maxLength) {
    var newSliderValue = Math.round(positition / maxLength * 100);
    if (newSliderValue < CONST.MIN_SLIDER_VALUE) {
      newSliderValue = CONST.MIN_SLIDER_VALUE;
    } else if (newSliderValue > CONST.MAX_SLIDER_VALUE) {
      newSliderValue = CONST.MAX_SLIDER_VALUE;
    }
    return newSliderValue;
  };

  var setPinPisition = function (value) {
    form.effectLevelPin.style.left = value + '%';
    form.effectLevelDepth.style.width = value + '%';
    effectLevelInput.value = value;
  };

  for (var i = 0; i < filterButtonts.length; i++) {
    filterButtonts[i].addEventListener('change', function (evt) {
      toApplyFilter(evt.target.value);
      form.uploadFormImage.style.cssText = form.toTransformImage(parseInt(form.uploadFormValue.value, 10));
      setPinPisition(CONST.MAX_SLIDER_VALUE);
    });
  }

  var updateDataByPin = function (value) {
    var saveImageScale = form.toTransformImage(parseInt(form.uploadFormValue.value, 10));
    var newValue = calcSliderValue(value, CONST.SLIDER_LENGTH);
    setPinPisition(newValue);
    form.uploadFormImage.style.cssText = setFilterStyle(calcFilterValue(newValue)) + '; ' + saveImageScale;
  };

  form.effectLevelPin.addEventListener('mousedown', function (evt) {
    var sliderPosition = form.effectLevelPin.offsetLeft;
    var startX = evt.clientX;

    var onMouseMove = function (moveEvt) {
      var shift = startX - moveEvt.clientX;
      sliderPosition -= shift;
      startX = moveEvt.clientX;
      updateDataByPin(sliderPosition);
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  form.effectLevelPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode !== CONST.ARROW_LEFT_KEYCODE && evt.keyCode !== CONST.ARROW_RIGHT_KEYCODE) {
      return;
    }
    var sliderPosition = form.effectLevelPin.offsetLeft;
    var stepValue = Math.round(CONST.SLIDER_LENGTH / 100);
    if (evt.keyCode === CONST.ARROW_LEFT_KEYCODE) {
      sliderPosition -= stepValue;
    } else {
      sliderPosition += stepValue;
    }
    updateDataByPin(sliderPosition);
  });
})();

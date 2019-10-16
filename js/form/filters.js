'use strict';

(function () {
  var CONST = window.CONST;
  var form = window.form;

  var filterButtonts = form.imgUpload.querySelectorAll('.effects__radio');
  var filterSlider = form.imgUpload.querySelector('.img-upload__effect-level');
  var effectLevelPin = form.imgUpload.querySelector('.effect-level__pin');

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
        }
      }
    } else {
      form.uploadFormImage.classList = '';
      filterSlider.classList.add('hidden');
    }
  };

  var setFilterStyle = function (value) {
    form.uploadFormImage.style.cssText = currentFilter.STYLE + '(' + value + currentFilter.UNIT + ')';
  };

  for (var i = 0; i < filterButtonts.length; i++) {
    filterButtonts[i].addEventListener('change', function (evt) {
      toApplyFilter(evt.target.value);
      setFilterStyle(calcFilterValue(CONST.SCALE_CONTROL_MAX_VALUE));
      form.toTransformImage(parseInt(form.uploadFormValue.value, 10));
    });
  }

  var calcFilterValue = function (value) {
    return (currentFilter.MAX_VALUE - currentFilter.MIN_VALUE) * (value / 100) + currentFilter.MIN_VALUE;
  };

  effectLevelPin.addEventListener('mouseup', function (evt) {
    var currentValue = parseInt(evt.target.style.left, 10);
    setFilterStyle(calcFilterValue(currentValue));
    form.toTransformImage(parseInt(form.uploadFormValue.value, 10));
  });
})();

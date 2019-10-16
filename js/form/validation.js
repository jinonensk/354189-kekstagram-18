'use strict';

(function () {
  var CONST = window.CONST;
  var form = window.form;

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

  var textHashtags = form.imgUpload.querySelector('.text__hashtags');
  textHashtags.addEventListener('input', function (evt) {
    textHashtags.setCustomValidity(checkValidation(evt.target.value));
  });
})();

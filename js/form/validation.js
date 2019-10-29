'use strict';

(function () {
  var CONST = window.CONST;
  var form = window.form;

  var checkValidation = function (value) {
    var hashtags = value.trim().toLowerCase().split(/\s+/);
    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i][0] !== '#') {
        return 'хэштэг должен начинаться с \'#\'';
      }
      if (hashtags[i] === '#') {
        return 'хэштэш не может быть только \'#\'';
      }
      if (hashtags[i].length > CONST.MAX_HASHTAG_LENGTH) {
        return 'хэштэш не может быть длинее 20 символов';
      }
      if (hashtags[i].lastIndexOf('#') !== 0) {
        return 'хэштеги должны быть разделены пробелами';
      }
      var duplicatedHashtags = hashtags.filter(function (item) {
        return item === hashtags[i];
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

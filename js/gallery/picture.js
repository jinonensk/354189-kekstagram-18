'use strict';

(function () {
  var CONST = window.CONST;
  var preview = window.preview;

  var pictures = document.querySelector('.pictures');

  var getCurrentImageContent = function (str) {
    var url = str.slice(str.indexOf('photos'));
    return window.picturesArray.filter(function (item) {
      return item.url === url;
    })[0];
  };

  pictures.addEventListener('click', function (evt) {
    if (evt.screenX !== 0 && evt.target.classList.contains('picture__img')) {
      preview.updateBigPictureContent(getCurrentImageContent(evt.target.src));
      preview.openBigPicture();
    }
  });

  pictures.addEventListener('keydown', function (evt) {
    if (evt.keyCode === CONST.ENTER_KEYCODE && evt.target.classList.contains('picture')) {
      preview.updateBigPictureContent(getCurrentImageContent(evt.target.querySelector('img').src));
      preview.openBigPicture();
    }
  });
})();

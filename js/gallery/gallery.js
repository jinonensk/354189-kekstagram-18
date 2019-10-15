'use strict';

(function () {
  var utils = window.utils;
  var pictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');
  var picturesSection = document.querySelector('.pictures');

  var renderPicture = function (picture) {
    var newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector('.picture__img').src = picture.url;
    newPicture.querySelector('.picture__comments').textContent = picture.commets.length;
    newPicture.querySelector('.picture__likes').textContent = picture.likes;
    return newPicture;
  };

  utils.addElementsToPage(window.picturesArray, picturesSection, renderPicture);
})();

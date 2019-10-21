'use strict';

(function () {
  var utils = window.utils;
  var dbRequests = window.dbRequests;
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var picturesSection = document.querySelector('.pictures');

  var renderPicture = function (picture) {
    var newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector('.picture__img').src = picture.url;
    newPicture.querySelector('.picture__comments').textContent = picture.comments.length;
    newPicture.querySelector('.picture__likes').textContent = picture.likes;
    return newPicture;
  };

  var loadDataHandler = function (data) {
    utils.addElementsToPage(data, picturesSection, renderPicture);
    window.picturesArray = data;
  };

  dbRequests.load(loadDataHandler);
})();

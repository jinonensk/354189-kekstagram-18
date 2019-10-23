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

  var loadDataSuccessHandler = function (data) {
    utils.addElementsToPage(data, picturesSection, renderPicture);
    window.picturesArray = data;
  };

  var loadDataErrorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  dbRequests.load(loadDataSuccessHandler, loadDataErrorHandler);
})();

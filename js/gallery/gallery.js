'use strict';

(function () {
  var utils = window.utils;
  var dbRequests = window.dbRequests;
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var picturesSection = document.querySelector('.pictures');
  var picturesFilters = document.querySelector('.img-filters');
  var picturesArray = [];

  var renderPicture = function (picture) {
    var newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector('.picture__img').src = picture.url;
    newPicture.querySelector('.picture__comments').textContent = picture.comments.length;
    newPicture.querySelector('.picture__likes').textContent = picture.likes;
    return newPicture;
  };

  var loadDataSuccessHandler = function (data) {
    utils.addElementsToPage(data, picturesSection, renderPicture);
    window.gallery.picturesArray = data;
    picturesFilters.classList.remove('img-filters--inactive');
  };

  dbRequests.load(loadDataSuccessHandler, utils.errorHandler);

  var clearGallery = function () {
    var picturesCollection = picturesSection.children;
    for (var i = picturesCollection.length - 1; i >= 0; i--) {
      if (picturesCollection[i].classList.contains('picture')) {
        picturesCollection[i].remove();
      }
    }
  };

  var filterPicturesHandler = function (array) {
    utils.addElementsToPage(array, picturesSection, renderPicture);
  };

  window.gallery = {
    picturesFilters: picturesFilters,
    picturesArray: picturesArray,
    clear: clearGallery,
    filterPicturesHandler: filterPicturesHandler,
  };
})();

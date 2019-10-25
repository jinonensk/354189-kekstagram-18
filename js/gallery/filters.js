'use strict';

(function () {
  var PICTURES_FILTERS = window.CONST.PICTURES_FILTERS;
  var gallery = window.gallery;
  var utils = window.utils;

  var makeRandomPicturesArray = function () {
    var indexesArray = utils.getRandomIndexFromArray(PICTURES_FILTERS.QUANTITY_IN_RANDOM, window.picturesArray);
    var newPicturesArray = [];
    for (var i = 0; i < indexesArray.length; i++) {
      newPicturesArray.push(window.picturesArray[indexesArray[i]]);
    }
    return newPicturesArray;
  };

  var throttoledfiltersHandler = function (evt) {
    utils.throttle(function () {
      if (!evt.target.classList.contains('img-filters__button--active')) {
        document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
        evt.target.classList.add('img-filters__button--active');
      }
      switch (evt.target.id) {
        case PICTURES_FILTERS.RANDOM_BUTTON_ID:
          gallery.clearGallery();
          gallery.filterPicturesHandler(makeRandomPicturesArray());
          break;
        case PICTURES_FILTERS.DISCUSSED_BUTTON_ID:
          gallery.clearGallery();
          gallery.filterPicturesHandler(utils.sortItemsByField(window.picturesArray, PICTURES_FILTERS.FIELD_NAME_IN_DISCUSSED));
          break;
        default:
          gallery.clearGallery();
          gallery.filterPicturesHandler(window.picturesArray);
          break;
      }
    }, PICTURES_FILTERS.THROTTLE_INTERVAL);
  };

  var filters = gallery.picturesFilters.querySelectorAll('.img-filters__button');
  filters.forEach(function (item) {
    item.addEventListener('click', throttoledfiltersHandler);
  });
})();

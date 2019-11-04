'use strict';

(function () {
  var PICTURES_FILTERS = window.CONST.PICTURES_FILTERS;
  var gallery = window.gallery;
  var utils = window.utils;
  var filtersTimeout = null;

  var debouncePictureFilters = function (callback, interval) {
    if (filtersTimeout) {
      window.clearTimeout(filtersTimeout);
    }
    filtersTimeout = window.setTimeout(function () {
      callback();
    }, interval);
  };

  var sortedPicturesArray = [];
  var debouncedfiltersHandler = function (evt) {
    debouncePictureFilters(function () {
      if (!evt.target.classList.contains('img-filters__button--active')) {
        document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
        evt.target.classList.add('img-filters__button--active');
      }
      gallery.clear();
      switch (evt.target.id) {
        case PICTURES_FILTERS.RANDOM_BUTTON_ID:
          gallery.filterPicturesHandler(utils.toShuffleArray(window.picturesArray).slice(0, PICTURES_FILTERS.QUANTITY_IN_RANDOM));
          break;
        case PICTURES_FILTERS.DISCUSSED_BUTTON_ID:
          if (!sortedPicturesArray.length) {
            sortedPicturesArray = utils.sortItemsByField(window.picturesArray, PICTURES_FILTERS.FIELD_NAME_IN_DISCUSSED);
          }
          gallery.filterPicturesHandler(sortedPicturesArray);
          break;
        default:
          gallery.filterPicturesHandler(window.picturesArray);
          break;
      }
    }, PICTURES_FILTERS.THROTTLE_INTERVAL);
  };

  var filters = gallery.picturesFilters.querySelectorAll('.img-filters__button');
  filters.forEach(function (item) {
    item.addEventListener('click', debouncedfiltersHandler);
  });
})();

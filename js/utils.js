'use strict';
(function () {
  var CONST = window.CONST;
  var fragment = document.createDocumentFragment();

  window.utils = {
    getRandomValue: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    addElementsToPage: function (array, pageTarget, renderFunction) {
      for (var i = 0; i < array.length; i++) {
        fragment.appendChild(renderFunction(array[i]));
      }
      pageTarget.appendChild(fragment);
    },
    toSplitCommentsArray: function (array) {
      var size = CONST.COMMENTS_PART_SIZE;
      var subarray = [];
      for (var i = 0; i < Math.ceil(array.length / size); i++) {
        subarray[i] = array.slice((i * size), (i * size) + size);
      }
      return subarray;
    },
    sortItemsByField: function (array, fieldName) {
      var copy = array.slice();
      return copy.sort(function (item, nextItem) {
        return (item[fieldName] < nextItem[fieldName] ? 1 : -1);
      });
    },
    toShuffleArray: function (array) {
      var copy = array.slice();
      for (var i = copy.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * i);
        var temporaryItem = copy[i];
        copy[i] = copy[j];
        copy[j] = temporaryItem;
      }
      return copy;
    },
  };
})();


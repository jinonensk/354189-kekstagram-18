'use strict';
(function () {
  var CONST = window.CONST;
  var fragment = document.createDocumentFragment();
  var time = Date.now();

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
    getRandomIndexFromArray: function (quantity, array) {
      var result = [];
      while (result.length < quantity) {
        var randomIndex = window.utils.getRandomValue(0, array.length - 1);
        if (result.indexOf(randomIndex === -1)) {
          result.push(randomIndex);
        }
      }
      return result;
    },
    throttle: function (func, interval) {
      if ((time + interval - Date.now()) < 0) {
        func();
        time = Date.now();
      }
    },
    sortItemsByField: function (array, fieldName) {
      var copy = array.slice();
      return copy.sort(function (item, nextItem) {
        return (item[fieldName] < nextItem[fieldName] ? 1 : -1);
      });
    },
  };
})();


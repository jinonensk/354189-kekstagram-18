'use strict';
(function () {
  var CONST = window.CONST;

  var fragment = document.createDocumentFragment();
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');

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
    errorHandler: function (errorMessage) {
      var newError = errorTemplate.cloneNode(true);
      newError.querySelector('.error__title').textContent = errorMessage;
      fragment.appendChild(newError);
      main.appendChild(fragment);
    },
    toSplitCommentsArray: function (array) {
      var size = CONST.COMMENTS_PART_SIZE;
      var subarray = [];
      for (var i = 0; i < Math.ceil(array.length / size); i++) {
        subarray[i] = array.slice((i * size), (i * size) + size);
      }
      return subarray;
    }
  };
})();


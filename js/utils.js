'use strict';
(function () {
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
  };
})();


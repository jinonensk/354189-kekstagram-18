'use strict';
(function () {
  var CONST = window.CONST;
  var fragment = document.createDocumentFragment();

  window.utils = {
    getRandomValue: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    addElementsToPage: function (array, pageTarget, renderFunction) {
      array.forEach(function (item) {
        fragment.appendChild(renderFunction(item));
      });
      pageTarget.appendChild(fragment);
    },
    toSplitCommentsArray: function (array) {
      var size = CONST.COMMENTS_PART_SIZE;
      var data = [];
      for (var i = 0; i < Math.ceil(array.length / size); i++) {
        data[i] = array.slice((i * size), (i * size) + size);
      }
      return data;
    },
    sortItemsByField: function (array, fieldName) {
      var copiedArray = array.slice();
      return copiedArray.sort(function (item, nextItem) {
        return (item[fieldName] < nextItem[fieldName] ? 1 : -1);
      });
    },
    toShuffleArray: function (array) {
      var copiedArray = array.slice();
      for (var i = copiedArray.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * i);
        var temporaryItem = copiedArray[i];
        copiedArray[i] = copiedArray[j];
        copiedArray[j] = temporaryItem;
      }
      return copiedArray;
    },
    errorHandler: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; line-height: 40px;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';
      node.textContent = errorMessage;
      node.classList.add('top-error-message');
      document.body.insertAdjacentElement('afterbegin', node);
    },
  };
})();


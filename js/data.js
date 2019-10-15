'use strict';

(function () {
  window.picturesArray = [];
  var CONST = window.CONST;
  var utils = window.utils;

  var makeComment = function () {
    return {
      avatar: 'img/avatar-' + utils.getRandomValue(1, CONST.AVATARS_QUANTITY) + '.svg',
      message: CONST.COMMENTS[utils.getRandomValue(0, CONST.COMMENTS.length - 1)],
      name: CONST.NAMES[utils.getRandomValue(0, CONST.NAMES.length - 1)],
    };
  };

  var makeComments = function () {
    var commentsArray = [];
    for (var i = 1; i <= utils.getRandomValue(1, CONST.MAX_COMMENTS_QUANTITY); i++) {
      commentsArray.push(makeComment());
    }
    return commentsArray;
  };

  var makePicturesArray = function () {
    for (var i = 1; i <= CONST.OBJECT_QUANTITY; i++) {
      window.picturesArray.push({
        url: 'photos/' + i + '.jpg',
        description: CONST.DESCRIPTIONS[utils.getRandomValue(0, CONST.DESCRIPTIONS.length - 1)],
        likes: utils.getRandomValue(CONST.MIN_LIKES, CONST.MAX_LIKES),
        commets: makeComments(),
      });
    }
  };

  makePicturesArray();
})();

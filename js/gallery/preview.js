'use strict';

(function () {
  var CONST = window.CONST;
  var utils = window.utils;

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureComments = bigPicture.querySelector('.social__comments');
  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

  bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');

  var cloneAndCleanComment = function () {
    var newComment = bigPicture.querySelector('.social__comment');
    while (bigPictureComments.firstChild) {
      bigPictureComments.removeChild(bigPictureComments.firstChild);
    }
    return newComment;
  };

  var savedCommentNode = cloneAndCleanComment();

  var renderComment = function (comment) {
    var newComment = savedCommentNode.cloneNode(true);
    var commentImage = newComment.querySelector('.social__picture');
    commentImage.src = comment.avatar;
    commentImage.alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;
    return newComment;
  };

  var onBigPictureEscPress = function (evt) {
    if (
      evt.keyCode === CONST.ESC_KEYCODE
      && !evt.target.classList.contains('social__footer-text')
    ) {
      closeBigPicture();
    }
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onBigPictureEscPress);
    savedCommentNode = cloneAndCleanComment();
  };

  bigPictureClose.addEventListener('click', function () {
    closeBigPicture();
  });

  window.preview = {
    updateBigPictureContent: function (content) {
      bigPicture.querySelector('.big-picture__img img').src = content.url;
      bigPicture.querySelector('.likes-count').textContent = content.likes;
      bigPicture.querySelector('.comments-count').textContent = content.commets.length;
      bigPicture.querySelector('.social__caption').textContent = content.description;
      utils.addElementsToPage(content.commets, bigPictureComments, renderComment);
    },
    openBigPicture: function () {
      bigPicture.classList.remove('hidden');
      document.addEventListener('keydown', onBigPictureEscPress);
    },
  };
})();

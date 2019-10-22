'use strict';

(function () {
  var CONST = window.CONST;
  var utils = window.utils;

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureComments = bigPicture.querySelector('.social__comments');
  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

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
    commentsLoader.addEventListener('click', commentsLoaderHandler);
    savedCommentNode = cloneAndCleanComment();
  };

  bigPictureClose.addEventListener('click', function () {
    closeBigPicture();
  });

  var commentsLoader = bigPicture.querySelector('.social__comments-loader');
  var commentsBlock = bigPicture.querySelector('.social__comment-count');
  var commentsOptions = {
    splitedComments: [],
    partsOfComments: 0,
    currentPartIndex: 0,
    quantityShownComments: 0,
    previusQuantityLength: 1,
  };

  var updateQuantityShownComments = function () {
    var str = commentsBlock.innerHTML;
    commentsOptions.quantityShownComments = document.querySelectorAll('.social__comment').length;
    str = commentsOptions.quantityShownComments + str.slice(commentsOptions.previusQuantityLength);
    commentsOptions.previusQuantityLength = String(commentsOptions.quantityShownComments).length;
    commentsBlock.innerHTML = str;
  };

  var commentsLoaderHandler = function () {
    commentsOptions.currentPartIndex += 1;
    if (commentsOptions.currentPartIndex === commentsOptions.partsOfComments - 1) {
      commentsLoader.classList.add('hidden');
    }
    utils.addElementsToPage(commentsOptions.splitedComments[commentsOptions.currentPartIndex], bigPictureComments, renderComment);
    updateQuantityShownComments();
  };

  window.preview = {
    updateBigPictureContent: function (content) {
      bigPicture.querySelector('.big-picture__img img').src = content.url;
      bigPicture.querySelector('.likes-count').textContent = content.likes;
      bigPicture.querySelector('.comments-count').textContent = content.comments.length;
      bigPicture.querySelector('.social__caption').textContent = content.description;

      commentsOptions.splitedComments = utils.toSplitCommentsArray(content.comments);
      commentsOptions.partsOfComments = commentsOptions.splitedComments.length;
      commentsOptions.currentPartIndex = 0;
      commentsOptions.quantityShownComments = commentsOptions.splitedComments[0].length;

      utils.addElementsToPage(commentsOptions.splitedComments[0], bigPictureComments, renderComment);
      updateQuantityShownComments();
    },
    openBigPicture: function () {
      bigPicture.classList.remove('hidden');
      document.addEventListener('keydown', onBigPictureEscPress);

      if (commentsOptions.partsOfComments === 1) {
        commentsLoader.classList.add('hidden');
      } else {
        commentsLoader.classList.remove('hidden');
        commentsLoader.addEventListener('click', commentsLoaderHandler);
      }
    },
  };
})();

'use strict';

(function () {
  var CONST = window.CONST;
  var utils = window.utils;

  var requestOptions = {};
  var request = function (options) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open(options.method, options.url);
    xhr.addEventListener('load', function () {
      if (xhr.status === CONST.SUCCESS_SERVER_ANSWER) {
        options.onSuccess(xhr.response);
      } else {
        utils.errorHandler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      utils.errorHandler('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      utils.errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = CONST.XHR_TIMEOUT;

    if (options.data) {
      xhr.send(options.data);
    } else {
      xhr.send();
    }
  };

  window.dbRequests = {
    load: function (onSuccess) {
      requestOptions = {
        method: 'GET',
        url: CONST.URL_LOAD,
        onSuccess: onSuccess,
      };
      request(requestOptions);
    },
  };
})();

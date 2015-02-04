const { Request } = require("sdk/request");
const { defer } = require("sdk/core/promise");

exports.get = function (url) {
  let { promise, resolve, reject } = defer();
  Request({
    url: url,
    onComplete: function ({ statusText, status, json }) {
      if (status === 200) {
        resolve(json);
      } else {
        reject(statusText);
      }
    }
  }).get();

  return promise;
};

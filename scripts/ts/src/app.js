/// <reference path="../definitions/zepto.d.ts" />
/// <reference path="functions.ts" />
/// <reference path="appstorage.ts" />

$(document).ready(function () {
  AppStorage.checkForLocalStorage();
  if (!inTestMode) {
    window.mainScreen.init();
    window.mainScreen.render();
  }
});

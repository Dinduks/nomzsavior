/// <reference path="../definitions/zepto.d.ts" />
/// <reference path="functions.ts" />
/// <reference path="appstorage.ts" />

$(document).ready(function () {
  AppStorage.checkForLocalStorage();
  window["mainScreen"].init();
  //setCurrentScreenIfNeeded();
  window['mainScreen'].render();
});

/// <reference path="../definitions/zepto.d.ts" />
/// <reference path="functions.ts" />
/// <reference path="appstorage.ts" />

$(document).ready(function () {
  var screensContainer = $("#screens-container");

  AppStorage.checkForLocalStorage();
  setCurrentScreenIfNeeded();

  screensContainer.on("click", function (): bool {
    switchScreens();
    return false;
  });
});

/// <reference path="zepto.d.ts" />
/// <reference path="functions.ts" />

$(document).ready(function () {
  var screensContainer = $("#screens-container");

  AppStorage.checkForLocalStorage();
  setCurrentScreenIfNeeded();

  screensContainer.on("click", function (): bool {
    switchScreens();
    return false;
  });
});

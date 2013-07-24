/// <reference path="zepto.d.ts" />
/// <reference path="functions.ts" />

$(document).ready(function () {
  AppStorage.checkForLocalStorage();
  setCurrentScreenIfNeeded();

  $("#main-container").on("click", function (): bool {
    switchScreens();
    return false;
  });
});

/// <reference path="zepto.d.ts" />
/// <reference path="functions.ts" />

$(document).ready(function () {
  checkForLocalStorage();
  setCurrentScreenIfNeeded();

  $("#main-container").on("click", function (): bool {
    var mainContainer: ZeptoCollection = $("#main-container");
    var targetLeftPosition: number = (getCurrentScreen() - 2) * 100;
    switchScreens(mainContainer, targetLeftPosition);

    return false;
  });
});

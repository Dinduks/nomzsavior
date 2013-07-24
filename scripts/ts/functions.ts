/// <reference path="zepto.d.ts" />
/// <reference path="appstorage.ts" />

function setCurrentScreenIfNeeded(): void {
  if (AppStorage.getCurrentScreen() == null) {
    AppStorage.setCurrentScreen(1);
  }
}

function switchScreens(): void {
  var mainContainer: ZeptoCollection = $("#main-container");
  var targetLeftPosition: number = (AppStorage.getCurrentScreen() - 2) * 100;

  mainContainer.animate({
    left:  targetLeftPosition + "%"
  }, 300);

  AppStorage.swapScreens();
}

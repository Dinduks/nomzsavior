$(document).ready(function () {
  AppStorage.checkForLocalStorage();
  if (!inTestMode) {
    window.mainScreen.init();
    window.mainScreen.render();
  }
});

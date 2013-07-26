/// <reference path="../definitions/zepto.d.ts" />
/// <reference path="appstorage.ts" />

function setCurrentScreenIfNeeded(): void {
  if (AppStorage.getCurrentScreen() != 1 &&
      AppStorage.getCurrentScreen() != 2) {
    AppStorage.setCurrentScreen(1);
  }
}

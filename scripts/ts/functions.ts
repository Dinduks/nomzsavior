/// <reference path="zepto.d.ts" />

function checkForLocalStorage(): bool {
  try {
    localStorage.setItem("enabled", "true");
    return true;
  } catch (e) {
    alert("localStorage is required.\nPlease enable cookies.");
    return false;
  }
}

function setCurrentScreenIfNeeded(): void {
  if (getCurrentScreen() == null) {
    setCurrentScreen(1);
  }
}

function getCurrentScreen(): number {
  return localStorage.getItem("currentScreen");
}

function setCurrentScreen(screenNumber: number): void {
  localStorage.setItem("currentScreen", String(screenNumber));
}

function swapScreens(): void {
  var currentScreen: number = getCurrentScreen();
  (currentScreen == 1) ? setCurrentScreen(2) : setCurrentScreen(1);
}

function switchScreens(mainContainer: ZeptoCollection, targetLeftPosition: number): void {
  mainContainer.animate({
    left:  targetLeftPosition + "%"
  }, 300);

  swapScreens();
}

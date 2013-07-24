module AppStorage {
  export function getCurrentScreen(): number {
    return parseInt(localStorage.getItem("currentScreen"));
  }

  export function setCurrentScreen(screenNumber: number): void {
    localStorage.setItem("currentScreen", String(screenNumber));
  }

  export function swapScreens(): void {
    var currentScreen: number = getCurrentScreen();
    (currentScreen == 1) ? setCurrentScreen(2) : setCurrentScreen(1);
  }

  export function checkForLocalStorage(): bool {
    try {
      localStorage.setItem("enabled", "true");
      return true;
    } catch (e) {
      alert("Local Storage is required.\nPlease enable cookies.");
      return false;
    }
  }
}

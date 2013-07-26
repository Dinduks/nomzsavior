var appStorage = app.models.AppStorage;

describe("getCurrentScreen()", function() {
  it("returns the current screen", function() {
    appStorage.setCurrentScreen(42);
    expect(appStorage.getCurrentScreen()).toEqual(42);
  });
});

describe("setCurrentScreen()", function() {
  it("sets the current screen value", function() {
    appStorage.setCurrentScreen(9000);
    expect(appStorage.getCurrentScreen()).toEqual(9000);
  });
});

describe("swapScreens()", function() {
  it("swap the stored current screen value", function() {
    appStorage.setCurrentScreen(1);

    appStorage.swapScreens();
    expect(appStorage.getCurrentScreen()).toEqual(2);

    appStorage.swapScreens();
    expect(appStorage.getCurrentScreen()).toEqual(1);
  });
});

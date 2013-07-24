/// <reference path="../definitions/jasmine.d.ts" />
/// <reference path="../src/appstorage.ts" />

describe("getCurrentScreen()", function() {
  AppStorage.setCurrentScreen(42);
  it("returns the current screen", function() {
    expect(AppStorage.getCurrentScreen()).toEqual(42);
  });
});

describe("setCurrentScreen()", function() {
  it("sets the current screen value", function() {
    AppStorage.setCurrentScreen(9000);
    expect(AppStorage.getCurrentScreen()).toEqual(9000);
  });
});

describe("swapScreens()", function() {
  it("swap the stored current screen value", function() {
    AppStorage.setCurrentScreen(1);

    AppStorage.swapScreens();
    expect(AppStorage.getCurrentScreen()).toEqual(2);

    AppStorage.swapScreens();
    expect(AppStorage.getCurrentScreen()).toEqual(1);
  });
});

/// <reference path="../definitions/jasmine.d.ts" />
/// <reference path="../src/functions.ts" />

describe("setCurrentScreenIfNeeded()", function() {
  it("set the current screen to 1 if no info is available", function() {
    localStorage.clear();

    setCurrentScreenIfNeeded();
    expect(AppStorage.getCurrentScreen()).toEqual(1);
  });

  it("set the current screen to 1 if the Local Storage data is wrong", function() {
    AppStorage.setCurrentScreen(42);
    setCurrentScreenIfNeeded();
    expect(AppStorage.getCurrentScreen()).toEqual(1);
  });

  it("set the current screen if screen exists", function() {
    AppStorage.setCurrentScreen(2)
    setCurrentScreenIfNeeded();
    expect(AppStorage.getCurrentScreen()).toEqual(2);
  });
});

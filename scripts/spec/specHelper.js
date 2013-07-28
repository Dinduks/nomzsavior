beforeEach(function (args) {
    var store = {};

    spyOn(localStorage, "getItem").andCallFake(function (key) {
        return store[key];
    });
    spyOn(localStorage, "setItem").andCallFake(function (key, value) {
        store[key] = value.toString();
    });
    spyOn(localStorage, "clear").andCallFake(function () {
        store = {};
    });
});

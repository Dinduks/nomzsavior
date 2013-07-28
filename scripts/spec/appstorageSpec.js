var appStorage = app.models.AppStorage;

describe("isWelcomeMessageAlreadySeen()", function() {
    it("returns false if the welcome message was not seen before", function () {
        expect(appStorage.isWelcomeMessageAlreadySeen()).toBeFalsy();
        localStorage.setItem("isWelcomeMessageAlreadySeen", "true");
        expect(appStorage.isWelcomeMessageAlreadySeen()).toBeTruthy();
    });
});

describe("welcomeMessageSeen()", function() {
    it("sets the isWelcomeMessageAlreadySeen value to true in the LS", function () {
        appStorage.welcomeMessageSeen();
        expect(localStorage.getItem('isWelcomeMessageAlreadySeen')).toEqual('true');
    });
});

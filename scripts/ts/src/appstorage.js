app.models.AppStorage = {
    getCurrentScreen: function () {
        return parseInt(localStorage.getItem("currentScreen"), 10);
    },
    setCurrentScreen: function (screenNumber) {
        localStorage.setItem("currentScreen", screenNumber.toString());
    },
    swapScreens: function() {
        if (this.getCurrentScreen() == 1) this.setCurrentScreen(2);
        else this.setCurrentScreen(1);
    },
    checkForLocalStorage: function() {
        try {
            localStorage.setItem("enabled", "true");
            return true;
        } catch (e) {
            alert("Local Storage is required.\nPlease enable cookies.");
            return false;
        }
    },
    save: function (id, items) {
        localStorage.setItem(id, JSON.stringify(items));
    },
    get: function (id) {
        return JSON.parse(localStorage.getItem(id));
    }
};

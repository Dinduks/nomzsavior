app.models.AppStorage = {
    checkForLocalStorage: function() {
        try {
            localStorage.setItem("enabled", "true");
            return true;
        } catch (e) {
            alert("Local Storage is required.\nPlease enable cookies.");
            return false;
        }
    },
    save: function (key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    get: function (id) {
        var result = localStorage.getItem(id);
        return (result) ? JSON.parse(result) : null;
    },
    isWelcomeMessageAlreadySeen: function () {
        if (!this.get("isWelcomeMessageAlreadySeen")) return false;
        else return true;
    },
    welcomeMessageSeen: function () {
        localStorage.setItem("isWelcomeMessageAlreadySeen", "true");
    }
};

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
    save: function (id, items) {
        localStorage.setItem(id, JSON.stringify(items));
    },
    get: function (id) {
        var result = localStorage.getItem(id);
        return (result) ? JSON.parse(result) : "";
    }
};

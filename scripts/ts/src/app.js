var app = {};
app.models = app.models || {};

$(document).ready(function () {
    app.models.AppStorage.checkForLocalStorage();
    if (typeof inTestMode === undefined && !inTestMode) {
        window.mainScreen.init();
        window.mainScreen.render();
    }
});

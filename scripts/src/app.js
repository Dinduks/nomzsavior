var app = {};
app.models = app.models || {};

$(document).ready(function () {
    app.models.AppStorage.checkForLocalStorage();

    if (!inTestMode) {
        window.mainScreen.init();
        window.mainScreen.render();
    }

    if (!isMobile()) $("#github-ribbon").show();

    // Source: http://www.tablemaker.net/test/detect-browser.js
    function isMobile() {
        var index = navigator.appVersion.indexOf("Mobile");
        return (index > -1);
    }
});

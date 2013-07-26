/// <reference path="../definitions/zepto.d.ts" />
/// <reference path="../src/appstorage.ts" />

$("#add-item-btn").on("click", function () {
    var mainContainer = $("#main-container");
    var targetLeftPosition = (AppStorage.getCurrentScreen() - 2) * 100;
    mainContainer.animate({ left:  targetLeftPosition + "%" },
      300,
      "linear",
      function () { AppStorage.swapScreens(); });

    return true;
});

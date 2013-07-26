/// <reference path="../definitions/zepto.d.ts" />

window["viewport"] = {};

$("#add-item-btn").on("click", function () {
    window["viewport"].switchPanel();

    return true;
});

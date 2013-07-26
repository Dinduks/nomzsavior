/// <reference path="../definitions/zepto.d.ts" />

window["viewport"] = {};

$("#add-item-btn").on("click", function () {
  window["viewport"].switchPanel()
    .then(function () { $("#title").get(0).focus(); });

  return true;
});

$(document).ready(function () {
  var date = new Date();
  date.setTime(date.getTime() + 60*60*24*1000);
  $('#date-picker').val(date.toJSON().slice(0,10));
});

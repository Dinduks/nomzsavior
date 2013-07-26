/// <reference path="../definitions/zepto.d.ts" />
/// <reference path="models.ts" />

window["viewport"] = {};
window["items"] = new ItemsCollection();

$(document).ready(function () {
  var date = new Date();
  date.setTime(date.getTime() + 60*60*24*1000);
  $('#date-picker').val(date.toJSON().slice(0,10));

  $("#add-item-btn").on("click", function () {
    window["viewport"].switchPanel()
      .then(function () { $("#title").get(0).focus(); });

    return true;
  });

  $("#submit-btn").on("click", function () {
    var item: Item;
    var title: string;
    var date: number;
    var quantity: number;

    title = $("#title").val();
    date = new Date($("#date-picker").val()).getTime();
    quantity = parseInt($("#quantity").val());

    item = new Item(title, date, quantity);
    window["items"].add(item);

    return false;
  });
});

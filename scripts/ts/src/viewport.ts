/// <reference path="../definitions/zepto.d.ts" />
/// <reference path="models.ts" />

window["viewport"] = {};
window["items"] = new ItemsCollection();

$(document).ready(function () {
  setDateToTomorrow();

  $(".return").on("click", function () {
    window['viewport'].switchPanel();

    return true;
  });

  function submitForm() {
    var item: Item;
    var title: string;
    var date: number;
    var quantity: number;

    title = $("#title").val();
    date  = new Date($("#date-picker").val()).getTime();
    quantity = parseInt($("#quantity").val());

    item = new Item(title, date, quantity);
    window["items"].add(item);

    resetForm();
  }

  $("#submit-btn").on("click", function () { submitForm(); return true; });

  $("#title").on("keyup", function () {
    if($(this).val() != "") $("#submit-btn").removeAttr("disabled");
    else $("#submit-btn").attr("disabled", "disabled");

    return true;
  });
});

function setDateToTomorrow() {
  var date = new Date();
  date.setTime(date.getTime() + 60*60*24*1000);
  $('#date-picker').val(date.toJSON().slice(0,10));
  $('#date-picker').attr("min", (new Date()).toJSON().slice(0,10));
}

function resetForm() {
  $("#title").val("");
  $("#quantity").val("1");
  setDateToTomorrow();
  $("#title").get(0).focus();
  $("#submit-btn").attr("disabled", "disabled");
}

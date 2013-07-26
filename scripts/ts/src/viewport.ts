/// <reference path="../definitions/zepto.d.ts" />
/// <reference path="models.ts" />

window["viewport"] = {};
window["items"] = new ItemsCollection();

$(document).ready(function () {
  setDateToTomorrow();

  $(".return").on("click", function () {
    window['viewport'].switchPanel();
  });

  function submitForm() {
    var item: Item;
    var title: string;
    var date: string;
    var quantity: number;

    title = $("#title").val();
    date  = String(new Date($("#date-picker").val()).getTime());
    quantity = parseInt($("#quantity").val());

    item = new Item(title, date, quantity);
    window["items"].add(item);

    resetForm();

    return false;
  }

  $("#submit-btn").on("click", function () { return submitForm(); });
  $("#title").on("keypress", function (event) {
    if (event.which == 13 && $(this).val() != "") return submitForm();
  });

  $("#title").on("keyup", function () {
    if($(this).val() != "") $("#submit-btn").removeAttr("disabled");
    else $("#submit-btn").attr("disabled", "disabled");
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

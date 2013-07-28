window.items = new ItemsCollection();

$(document).ready(function () {
    var $$  = function (s) { return document.getElementById(s); };
    var log = function (m) { console.log(m); };

    setDateToTomorrow();

    window.viewport = {
        init : function () {
            this.container = $$('screens-container');
            this.flag = true;
        },
        getPosition : function () {
            return this.flag ? window.innerWidth : 0;
        },
        switchPanel : function () {
            var self = this;
            return Zanimo(this.container)
                    .then(function (el) { window.mainScreen.render(); return el; })
                    .then(Zanimo.transitionf('transform', 'translate3d(-' + self.getPosition() + 'px,0,0)', 200))
                    .then(function (el) { self.flag = !self.flag; return el;});
        }
    };

    window.viewport.init();

    // Support submitting the form using the enter key
    $("#title").on("keypress", function (event) {
        if (event.keyCode == 13 && $(this).val() !== "") submitForm();
    });
    $("#date-picker").on("keypress", function (event) {
        if (event.keyCode == 13 && $(this).val() !== "") submitForm();
    });
    $("#quantity").on("keypress", function (event) {
        if (event.keyCode == 13 && $(this).val() !== "") submitForm();
    });

    $("#return").on("click", function () { window.viewport.switchPanel(); });
    $("#submit-btn").on("click", function () { submitForm(); return true; });


    enableAddBtnToggling();
});

function submitForm() {
    var item;
    var title;
    var date;
    var quantity;

    title = $("#title").val();
    date  = new Date($("#date-picker").val()).getTime();
    quantity = parseInt($("#quantity").val(), 10);

    item = new Item(title, date, quantity);
    window.items.add(item);

    resetForm();
}

/**
 * Given a date, sets the value of the date-picker field to the next day's
 * Also sets the minimal possible date to today's
 */
function setDateToTomorrow() {
    var date = new Date();
    date.setTime(date.getTime() + 60*60*24*1000);
    $('#date-picker').val(date.toJSON().slice(0,10));
    $('#date-picker').attr("min", (new Date()).toJSON().slice(0,10));
}

function resetForm() {
    $("#title").val("");
    $("#quantity").val("");
    setDateToTomorrow();
    $("#title").get(0).focus();
    $("#submit-btn").attr("disabled", "disabled");
}

/**
 * Enable the ADD button if the product name is specified
 * Disable it otherwise
 */
function enableAddBtnToggling() {
    $("#title").on("keyup", function () {
        if ($(this).val() !== "") {
            $("#submit-btn").removeAttr("disabled");
            setQuantityTo1();
        } else {
            $("#submit-btn").attr("disabled", "disabled");
        }

        return true;
    });

    function setQuantityTo1() {
        if (!$("#quantity").val()) $("#quantity").val(1);
    }
}

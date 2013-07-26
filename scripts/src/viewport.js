window.items = new ItemsCollection();

$(document).ready(function () {
    var $$  = function (s) { return document.getElementById(s); };
    var log = function (m) { console.log(m); };

    setDateToTomorrow();

    window.viewport = {
        init : function () {
            this.container = $$('screens-container');
            this.left = $$('main-screen');
            this.right = $$('add-form-screen');
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

    $("#return").on("click", function () {
        window.viewport.switchPanel();
    });

    $("#title").on("keypress", function (event) {
        if (event.keyCode == 13 && $(this).val() !== "") submitForm();
    });
    $("#date-picker").on("keypress", function (event) {
        if (event.keyCode == 13 && $(this).val() !== "") submitForm();
    });
    $("#quantity").on("keypress", function (event) {
        if (event.keyCode == 13 && $(this).val() !== "") submitForm();
    });

    $("#submit-btn").on("click", function () { submitForm(); return true; });

    $("#title").on("keyup", function () {
        if($(this).val() !== "") $("#submit-btn").removeAttr("disabled");
        else $("#submit-btn").attr("disabled", "disabled");

        return true;
    });
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

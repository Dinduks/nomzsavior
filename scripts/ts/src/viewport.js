$(document).ready(function () {
    var $$  = function (s) { return document.getElementById(s); }
    var log = function (m) { console.log(m); }

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
                    .then(function (el) { window['mainScreen'].render(); return el; })
                    .then(Zanimo.transitionf('transform', 'translate3d(-' + self.getPosition() + 'px,0,0)', 200))
                    .then(function (el) { self.flag = !self.flag; return el;});
        }
    };

    window.viewport.init();

    $("#title").on("keypress", function (event) {
        if (event.keyCode == 13 && $(this).val() != "") submitForm();
        return true;
    });
});

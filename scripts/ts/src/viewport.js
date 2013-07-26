$(document).ready(function () {
    var $$  = function (s) { return document.getElementById(s); }
    var log = function (m) { console.log(m); }

    window.viewport = {
        init : function () {
            this.container = $$('screens-container');
            this.left = $$('main-screen');
            this.right = $$('add-form-screen');
            this.flag = true;

            if (AppStorage.getCurrentScreen() == 2) {
                $("#main-container").css({ left:  "-100%" });
            }
        },
        getPosition : function () {
            return this.flag ? window.innerWidth : 0;
        },
        switchPanel : function () {
            var self = this;
            return Zanimo(this.container)
                    .then(Zanimo.transitionf('transform', 'translate3d(-' + self.getPosition() + 'px,0,0)', 200))
                    .then(function () { self.flag = !self.flag; return self.getPosition();})
                    .then(log, log);
        }
    };

    window.viewport.init();
});

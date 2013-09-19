var $$  = function (s) { return document.getElementById(s); };
var appStorage = app.models.AppStorage;

window.mainScreen = {
    init: function () {
        this.screen = $$('main-screen');
        var touched = false,
            x = 0,
            nx = 0,
            swiped = false,
            iconNotVisible = true;

        function onTouchstart (evt) {
            if (touched) return;
            if (!touched && /inner/.test(evt.target.className)){
                touched = true;
                x = evt.touches[0].pageX;
            }
        }

        function onTouchmove(evt) {
            if ($(evt.target).data("expired") === true) return;

            if (!swiped && touched && /inner/.test(evt.target.className)){
                touched = true;
                nx = evt.touches[0].pageX;
                if (Math.abs(nx - x) > 10) {
                    if (nx - x > 10) hideDeleteIcon(evt.target);
                    else if (nx - x < 10) showDeleteIcon(evt.target);
                    swiped = true;
                }
            }
        }

        function hideDeleteIcon(t) {
            return Zanimo(t).then(function (t) {
                return Zanimo.transition(t, "left", "0", 100);
            });
        }

        function showDeleteIcon(t) {
            return Zanimo(t).then(function (t) {
                return Zanimo.transition(t, "left", "-42px", 100);
            });
        }

        function onTouchend (evt) {
            touched = false;
            swiped = false;
        }

        this.screen.addEventListener('touchstart', onTouchstart);
        this.screen.addEventListener('touchmove', onTouchmove);
        this.screen.addEventListener('touchend', onTouchend);

        this.screen.addEventListener('click', onClick);

        function onClick (evt) {
            if (!/icon-cross/.test(evt.target.className)) {
                return true;
            }

            $(evt.target).parents().each(function (i, el) {
                if (el.tagName != "LI") {
                    return true;
                }

                var $el = $(el);
                var quantity = $el.data("quantity");

                if (!$el.find(".inner").data("expired")) {
                    if (quantity == 1) {
                        Zanimo.transition(el, "opacity", "0", 100)
                            .then(function () { $el.remove(); });

                        items.removeById(el.id);
                    } else if (quantity > 1) {
                        $el.data("quantity", quantity - 1);
                        hideDeleteIcon($el.children().first().get(0)).then(function () {

                        var quantityBox = $el.find(".quantity").first().get(0);
                        Zanimo.transition(quantityBox, "opacity", "0", 100)
                            .then(function () {
                                Zanimo.transition(quantityBox, "opacity", "1", 100);
                            })
                            .then(function () {
                                if (quantity > 2) $el.find(".quantity").html(quantity - 1);
                                else $el.find(".quantity").html("");
                            });
                        });

                        items.removeById(el.id);
                    }
                } else {
                    Zanimo.transition(el, "opacity", "0", 100)
                        .then(function () { $el.remove(); });

                    items.removeAllById(el.id);
                }
            });
        }
    },
    _getExpirationInfo: function (date) {
        var daysDifferenceBetweenDates = function (date1, date2) {
            return parseInt((date1.getTime() - date2.getTime()) / millisecondsInADay);
        };

        var today = new Date();
        var millisecondsInADay = 60 * 60 * 24 * 1000;

        today.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);

        if (daysDifferenceBetweenDates(today, date) === 0) {
            return {
                firstLine: "0",
                secondLine: "day",
                days: 0
            };
        } else if (daysDifferenceBetweenDates(date, today) >= 2 &&
                   daysDifferenceBetweenDates(date, today) < 7) {
            var days = (date.getTime() - today.getTime()) / (millisecondsInADay);
            return {
                firstLine: days,
                secondLine: "days",
                days: days
            };
        } else if (daysDifferenceBetweenDates(date, today) >= 7) {
            return {
                firstLine: "+ 1",
                secondLine: "week",
                days: daysDifferenceBetweenDates(date, today)
            };
        } else if (daysDifferenceBetweenDates(date, today) >= 1) {
            return {
                firstLine: "1",
                secondLine: "day",
                days: 1
            };
        } else {
            var diff = daysDifferenceBetweenDates(date, today);
            return {
                firstLine: diff,
                secondLine: "day" + ((diff === -1) ? "" : "s"),
                days: diff
            };
        }

        throw "Couldn't process the specified date";
    },
    _renderItem: function (item) {
        var d = new Date(parseInt(item.expirationDate, 10));
        var expirationText = window.mainScreen._getExpirationInfo(d);
        var li = document.createElement('li'),
            div0 = document.createElement('div'),
            div1 = document.createElement('div'),
            div2 = document.createElement('div'),
            div3 = document.createElement('div'),
            icon2 = document.createElement('span');

        li.id = item.id;

        if (this._getExpirationInfo(d).days < 0) {
            div0.className = "inner gray";
            div0.setAttribute("style", "width: calc(100% - 42px)");
            div0.setAttribute("data-expired", true);
        } else if (this._getExpirationInfo(d).days < 2) {
            div0.className = "inner red";
        } else if (this._getExpirationInfo(d).days >= 2 &&
                  this._getExpirationInfo(d).days < 7) {
            div0.className = "inner orange";
        } else {
            div0.className = "inner green";
        }

        div1.className = "case-item";
        div1.innerHTML = "<span class='parent'>"+ expirationText.firstLine +"<br><span class='month'>" + expirationText.secondLine + "</span></span>";
        div2.className = "item";
        div2.innerHTML = item.name;
        if (item.quantity > 1) div2.innerHTML += " <span class='quantity'>"+ item.quantity +"</span>";
        div3.className = "delete";
        icon2.className = "delete-icons icon-cross";

        div0.appendChild(div1);
        div0.appendChild(div2);
        div3.appendChild(icon2);
        li.appendChild(div0);
        li.appendChild(div3);

        $(li).data("quantity", item.quantity);

        return li;
    },
    render: function () {
        var self = this,
            ul = document.querySelector('.item-list ul');
            li = document.createElement('li'),
            div1 =  document.createElement('div'),
            icon = document.createElement('span'),
            div2 = document.createElement('div');

        li.className = "add";
        li.id = "add-item-btn";
        div1.className = "case-item";
        icon.className = "icon-plus";
        div2.className = "item";
        div2.innerHTML = "Add an item";

        div1.appendChild(icon);
        li.appendChild(div1);
        li.appendChild(div2);

        ul.innerHTML = "";
        ul.appendChild(li);

        if (items.collection.length === 0) {
            this._displayWelcomeMessage();
        } else {
            items.collection.forEach(function (item) {
                ul.appendChild(self._renderItem(item));
            });
        }

        $("#add-item-btn").on("click", function () {
            window.viewport.switchPanel().then(function () { $("#title").get(0).focus(); });
            return false;
      });
    },
    _displayWelcomeMessage: function () {
        $.ajax({
            url: 'welcome-message.html',
            success: onSuccessCB
        });

        function onSuccessCB(data) {
            $('#welcome-message').html(data.replace("$URL", window.location.hostname));
            $('#welcome-message').show();
            Zanimo.transition($$('#welcome-message'), 'opacity', '1', 100);
        }
    }
};

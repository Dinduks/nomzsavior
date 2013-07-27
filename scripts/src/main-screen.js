var $$  = function (s) { return document.getElementById(s); };

window.mainScreen = {
    init : function () {
        this.screen = $$('main-screen');
        var touched = false, x = 0, nx = 0, swiped = false, iconNotVisible = true;

        function onTouchstart (evt) {
            if (touched) return;
            if (!touched && /inner/.test(evt.target.className)){
                touched = true;
                x = evt.touches[0].pageX;
            }
        }

        function onTouchmove (evt) {
            if (!swiped && touched && /inner/.test(evt.target.className)){
                touched = true;
                nx = evt.touches[0].pageX;
                if (Math.abs(nx-x)>10) {
                    swiped = true;
                    switchDeleteIcon(evt.target);
                }
            }
        }

        function onTouchend (evt) {
            touched = false;
            swiped = false;
        }

        function switchDeleteIcon(t) {
            return Zanimo(t).then(function (t) {
                    return Zanimo.transition(t, 'left', t.style.left == "-42px" ? '0': '-42px', 100);
            });
        }

        this.screen.addEventListener('touchstart', onTouchstart);
        this.screen.addEventListener('touchmove', onTouchmove);
        this.screen.addEventListener('touchend', onTouchend);

        this.screen.addEventListener('click', onClick);

        function onClick (evt) {
            if(/delete/.test(evt.target.className) || /delete-icons/.test(evt.target.className)) {
                $(evt.target).parents().each(function (i, el) {
                    if(el.tagName == "LI") {
                        $(el).remove();
                        items.removeById(el.id);
                    }
                });
            }
        }
    },
    _getExpirationInfo: function (date) {
        var daysDifferenceBetweenDates = function (date1, date2) {
            return (date1.getTime() - date2.getTime()) / millisecondsInADay;
        };

        var today = new Date();
        var millisecondsInADay = 60 * 60 * 24 * 1000;

        today.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);

        if (daysDifferenceBetweenDates(today, date) === 0) {
            return ["Today", ""];
        } else if (daysDifferenceBetweenDates(date, today) >= 2 &&
                   daysDifferenceBetweenDates(date, today) < 7) {
            var days = (date.getTime() - today.getTime()) / (millisecondsInADay);
            return ["+ " + days, "days"];
        } else if (daysDifferenceBetweenDates(date, today) >= 7) {
            return ["+ 1", "week"];
        } else if (daysDifferenceBetweenDates(date, today) >= 1) {
            return ["Tmrw", ""];
        } else {
            return ["Expird", ""];
        }

        throw "Couldn't process the specified date";
    },
    _item : function (item) {
        var d = new Date(parseInt(item.expirationDate, 10));
        var expirationText = window.mainScreen._getExpirationInfo(d);
        var li = document.createElement('li'),
            div0 =  document.createElement('div'),
            div1 =  document.createElement('div'),
            div2 = document.createElement('div'),
            div3 = document.createElement('div');

        li.id = item.id;

        div0.className = "inner red";
        div1.className = "case-item";
        div1.innerHTML = "<span class='parent'>"+ expirationText[0] +"<br><span class='month'>" + expirationText[1] + "</span></span>";
        div2.className = "item";
        div2.innerHTML = item.name + " <span>"+ item.quantity +"</span>";
        div3.innerHTML = "<img src='images/icon-delete.jpg' class='delete-icon' alt='Supprimer un élément'>";
        div3.className = "delete";

        div0.appendChild(div1);
        div0.appendChild(div2);
        li.appendChild(div0);
        li.appendChild(div3);

        return li;
    },
    render : function () {

        var self = this,
            ul = document.querySelector('.item-list ul');
            li = document.createElement('li'),
            div1 =  document.createElement('div'),
            img = new Image(),
            div2 = document.createElement('div');

        li.className = "add";
        li.id = "add-item-btn";
        div1.className = "case-item";
        img.src = "images/icon-add.jpg";
        div2.className = "item";
        div2.innerHTML = "Add an item";

        div1.appendChild(img);
        li.appendChild(div1);
        li.appendChild(div2);

        ul.innerHTML = "";
        ul.appendChild(li);

        items.collection.forEach(function (item) {
            ul.appendChild(self._item(item));
        });

        $("#add-item-btn").on("click", function () {
            window.viewport.switchPanel().then(function () { $("#title").get(0).focus(); });
            return false;
      });
    }
};

var $$  = function (s) { return document.getElementById(s); }
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
                    return Zanimo.transition(t, 'left', t.style.left == "-84px" ? '0': '-84px', 100);
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
                    }
                });
            }
        }
    },
    _item : function (item) {
        var li = document.createElement('li'),
            div0 =  document.createElement('div'),
            div1 =  document.createElement('div'),
            div2 = document.createElement('div'),
            div3 = document.createElement('div');

        div0.className = "red inner";
        div1.className = "case-item";
        div1.innerHTML = "<span class='parent'>27<br><span class='month'>Juillet</span></span>";
        div2.className = "item";
        div2.innerHTML = "du thon <span>4</span>";
        div3.innerHTML = "<img src='images/icon-delete.jpg' class='delete-icon' alt='Supprimer un élément'>";
        div3.className = "delete";

        div0.appendChild(div1);
        div0.appendChild(div2);
        li.appendChild(div0);
        li.appendChild(div3);

        return li;
    },
    render : function (model) {
        var a = new ItemsCollection();
        a.add(new Item('toto', new Date(), 10));

        var ul = document.querySelector('.item-list ul');
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

        ul.appendChild(this._item());
        ul.appendChild(this._item());
        ul.appendChild(this._item());
        ul.appendChild(this._item());
        ul.appendChild(this._item());
        ul.appendChild(this._item());
        ul.appendChild(this._item());
        ul.appendChild(this._item());
        ul.appendChild(this._item());
        ul.appendChild(this._item());
        ul.appendChild(this._item());
        ul.appendChild(this._item());
        ul.appendChild(this._item());
        ul.appendChild(this._item());
    }
};

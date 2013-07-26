var AppStorage;
(function (AppStorage) {
    function getCurrentScreen() {
        return parseInt(localStorage.getItem("currentScreen"));
    }
    AppStorage.getCurrentScreen = getCurrentScreen;

    function setCurrentScreen(screenNumber) {
        localStorage.setItem("currentScreen", String(screenNumber));
    }
    AppStorage.setCurrentScreen = setCurrentScreen;

    function swapScreens() {
        var currentScreen = getCurrentScreen();
        (currentScreen == 1) ? setCurrentScreen(2) : setCurrentScreen(1);
    }
    AppStorage.swapScreens = swapScreens;

    function checkForLocalStorage() {
        try  {
            localStorage.setItem("enabled", "true");
            return true;
        } catch (e) {
            alert("Local Storage is required.\nPlease enable cookies.");
            return false;
        }
    }
    AppStorage.checkForLocalStorage = checkForLocalStorage;

    function save(id, items) {
        localStorage.setItem(id, JSON.stringify(items));
    }
    AppStorage.save = save;

    function get(id) {
        return JSON.parse(localStorage.getItem(id));
    }
    AppStorage.get = get;
})(AppStorage || (AppStorage = {}));
function setCurrentScreenIfNeeded() {
    if (AppStorage.getCurrentScreen() != 1 && AppStorage.getCurrentScreen() != 2) {
        AppStorage.setCurrentScreen(1);
    }
}
$(document).ready(function () {
    AppStorage.checkForLocalStorage();
    window["mainScreen"].init();

    window['mainScreen'].render();
});
var Item = (function () {
    function Item(name, expirationDate, quantity) {
        this.id = String((new Date()).getTime() + Math.floor(Math.random() * 10000));
        this.name = name;
        this.expirationDate = expirationDate;

        if (quantity == null)
            this.quantity = 1; else if (quantity < 1)
            throw "Quantity must be greater than 1."; else
            this.quantity = quantity;
    }
    Item.prototype.getPriority = function () {
        var now = new Date();
        var priority = 0;
        var oneDay = 24 * 60 * 60 * 1000;
        var diff = Math.round(Math.abs((parseInt(this.expirationDate) - now.getTime()) / oneDay));

        if (diff <= 2) {
            priority = 3;
        } else if (diff <= 7) {
            priority = 2;
        } else {
            priority = 1;
        }
        return priority;
    };
    return Item;
})();

var ItemsCollection = (function () {
    function ItemsCollection() {
        this._size = 0;
        this.name = "items";
        this.collection = AppStorage.get(this.name) || [];
        this._size = AppStorage.get('size') || 0;
    }
    ItemsCollection.prototype.add = function (item) {
        var len = this.collection.length;
        for (var i = 0; i < len; ++i) {
            var current = this.collection[i];
            if (current.name == item.name && current.expirationDate == item.expirationDate) {
                current.quantity += item.quantity;
                this._size += item.quantity;
                return;
            }
        }

        this.append(item);
    };

    ItemsCollection.prototype.append = function (item) {
        this._size += item.quantity;
        this.collection.push(item);
        AppStorage.save(this.name, this.collection);
        AppStorage.save("size", this._size);
    };

    ItemsCollection.prototype.removeById = function (id) {
        this.collection = this.collection.filter(function (item) {
            return item.id != id;
        });
        AppStorage.save(this.name, this.collection);
        AppStorage.save("size", this._size);
    };

    ItemsCollection.prototype.remove = function (item) {
        for (var i = 0; i < this._size; i++) {
            if (this.collection[i]["id"] == item["id"]) {
                if (this.collection[i]["quantity"] == 1)
                    this.collection.splice(i, 1); else
                    this.collection[i]["quantity"] = this.collection[i]["quantity"] - 1;

                this._size--;
                return;
            }
        }
        AppStorage.save(this.name, this.collection);
        AppStorage.save("size", this._size);
    };

    ItemsCollection.prototype.size = function () {
        return this._size;
    };

    ItemsCollection.prototype.getNth = function (n) {
        if (n >= this.size())
            throw "Array out of bounds.";
        return this.collection[n];
    };

    ItemsCollection.prototype.get = function (id) {
        for (var i = 0; i < this._size; i++) {
            if (this.collection[i].id == id) {
                return this.collection[i];
            }
        }

        return null;
    };

    ItemsCollection.prototype.sort = function () {
        var weGood;
        var tmp;

        while (!weGood) {
            weGood = true;
            for (var i = 0; i < this.collection.length - 1; i++) {
                if (this.collection[i].expirationDate > this.collection[i + 1].expirationDate) {
                    weGood = false;
                    tmp = this.collection[i];
                    this.collection[i] = this.collection[i + 1];
                    this.collection[i + 1] = tmp;
                }
            }
            ;
        }

        return this;
    };
    return ItemsCollection;
})();

var ItemsCache = (function () {
    function ItemsCache() {
        this.storageName = "itemsCache";
        this.items = AppStorage.get(this.storageName) || {};
    }
    ItemsCache.prototype.addItem = function (name, quantity) {
        if (this.items[name] == undefined) {
            this.items[name] = 0;
        }
        this.items[name] += quantity;
        AppStorage.save(this.storageName, this.items);
        return this.items;
    };

    ItemsCache.prototype.getMostPopularItemsByName = function (name, numberOfItems) {
        var popularItems = this.getMostPopularItems(numberOfItems);
        var regexp = new RegExp(name, "g");
        return popularItems.filter(function (item) {
            return item.name.match(regexp) != null;
        });
    };

    ItemsCache.prototype.getMostPopularItems = function (numberOfItems) {
        var popularItems = [];
        for (var name in this.items) {
            var quantity = this.items[name];
            popularItems.push({ name: name, quantity: quantity });
        }

        if (numberOfItems == undefined) {
            numberOfItems = popularItems.length;
        }

        return popularItems.sort(function (a, b) {
            return b.quantity - a.quantity;
        }).slice(0, numberOfItems);
    };

    ItemsCache.prototype.clear = function () {
        this.items = {};
        AppStorage.save(this.storageName, this.items);
    };
    return ItemsCache;
})();
var Util;
(function (Util) {
    function dateToDay(date) {
        date.setHours(0, 0, 0, 0);

        return date;
    }
    Util.dateToDay = dateToDay;
})(Util || (Util = {}));
window["viewport"] = {};
window["items"] = new ItemsCollection();

$(document).ready(function () {
    setDateToTomorrow();

    $(".return").on("click", function () {
        window['viewport'].switchPanel();
    });

    function submitForm() {
        var item;
        var title;
        var date;
        var quantity;

        title = $("#title").val();
        date = String(new Date($("#date-picker").val()).getTime());
        quantity = parseInt($("#quantity").val());

        item = new Item(title, date, quantity);
        window["items"].add(item);

        resetForm();

        return false;
    }

    $("#submit-btn").on("click", function () {
        return submitForm();
    });
    $("#title").on("keypress", function (event) {
        if (event.which == 13 && $(this).val() != "")
            return submitForm();
    });

    $("#title").on("keyup", function () {
        if ($(this).val() != "")
            $("#submit-btn").removeAttr("disabled"); else
            $("#submit-btn").attr("disabled", "disabled");
    });
});

function setDateToTomorrow() {
    var date = new Date();
    date.setTime(date.getTime() + 60 * 60 * 24 * 1000);
    $('#date-picker').val(date.toJSON().slice(0, 10));
    $('#date-picker').attr("min", (new Date()).toJSON().slice(0, 10));
}

function resetForm() {
    $("#title").val("");
    $("#quantity").val("1");
    setDateToTomorrow();
    $("#title").get(0).focus();
    $("#submit-btn").attr("disabled", "disabled");
}

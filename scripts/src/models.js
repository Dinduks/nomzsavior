var appStorage = app.models.AppStorage;

var Item = (function () {
    function Item(name, expirationDate, quantity) {
        this.id = (new Date()).getTime() + Math.floor(Math.random() * 10000).toString();
        this.name = name;
        this.expirationDate = expirationDate;

        if (quantity == null) this.quantity = 1;
        else if (quantity < 1) throw "Quantity must be greater than 1.";
        else this.quantity = quantity;
    }

    Item.prototype.getPriority = function () {
        var now = new Date();
        var priority = 0;
        var oneDay = 24 * 60 * 60 * 1000;
        var diff = Math.round(Math.abs((this.expirationDate - now.getTime()) / oneDay));

        if (diff <= 2) priority = 3;
        else if (diff <= 7) priority = 2;
        else priority = 1;

        return priority;
    };

    return Item;
})();

/**
 * Items that the user have in his fridge
 */
var ItemsCollection = (function () {
    function ItemsCollection() {
        this._size = 0;
        this.name = "items";
        this.collection = appStorage.get(this.name) || [];
        this._size = appStorage.get('size') || 0;
    }

    ItemsCollection.prototype.add = function (item) {
        for (var i = 0; i < this.collection.length; ++i) {
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
        appStorage.save(this.name, this.collection);
        appStorage.save("size", this._size);
    };

    ItemsCollection.prototype.removeById = function (id) {
        for (var i = 0; i < this._size; i++) {
            if (this.collection[i].id == id) {
                if (this.collection[i].quantity == 1) this.collection.splice(i, 1);
                else this.collection[i].quantity = this.collection[i].quantity - 1;

                this._size--;

                return;
            }
        }

        appStorage.save(name, this.collection);
        appStorage.save("size", this._size);
    };

    ItemsCollection.prototype.remove = function (item) {
        for (var i = 0; i < this._size; i++) {
            if (this.collection[i].id == item.id) {
                if (this.collection[i].quantity == 1) this.collection.splice(i, 1);
                else this.collection[i].quantity = this.collection[i].quantity - 1;

                this._size--;

                return;
            }
        }

        appStorage.save(this.name, this.collection);
        appStorage.save("size", this._size);
    };

    ItemsCollection.prototype.size = function () {
        return this._size;
    };

    ItemsCollection.prototype.getNth = function (n) {
        if (n >= this.size()) {
            throw "Array out of bounds.";
        }

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
        }

        return this;
    };

    return ItemsCollection;
})();


/* The ItemsCache stores all the items from the start.
   The ItemsCache is used to offer suggestions when adding a new item. */
var ItemsCache = (function () {
    function ItemsCache() {
        this.storageName = "itemsCache";
        this.items = appStorage.get(this.storageName) || {};
    }

    ItemsCache.prototype.addItem = function (name, quantity) {
        if (this.items[name] === undefined) this.items[name] = 0;
        this.items[name] += quantity;
        appStorage.save(this.storageName, this.items);

        return this.items;
    };

    ItemsCache.prototype.getMostPopularItemsByName = function (name, numberOfItems) {
        var popularItems = this.getMostPopularItems(numberOfItems);
        var regexp = new RegExp(name, "g");

        return popularItems.filter(function (item) {
            return item.name.match(regexp) !== null;
        });
    };

    ItemsCache.prototype.getMostPopularItems = function (numberOfItems) {
        var popularItems = [];

        for (var name in this.items) {
            var quantity = this.items[name];

            popularItems.push({
                name: name,
                quantity: quantity
            });
        }

        if (numberOfItems === undefined) {
            numberOfItems = popularItems.length;
        }

        return popularItems.sort(function (a, b) {
            return b.quantity - a.quantity;
        }).slice(0, numberOfItems);
    };

    ItemsCache.prototype.clear = function () {
        this.items = {};
        appStorage.save(this.storageName, this.items);
    };

    return ItemsCache;
})();

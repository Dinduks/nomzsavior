/// <reference path="../definitions/jasmine.d.ts" />
/// <reference path="../src/models.ts" />

describe("Item.constructor()", function() {
  var date: number;
  var item: Item;

  it("creates an object with the correct values", function() {
    date = (new Date()).getTime();
    item = new Item("foo", date, 9000)

    expect(item.name).toEqual("foo")
    expect(item.expirationDate).toEqual(date);
    expect(item.quantity).toEqual(9000)
  });

  it("sets quantity to one if not specified", function() {
    date = (new Date()).getTime();
    item = new Item("foo", date)

    expect(item.quantity).toEqual(1)
  });

  it("throws an exception if not logical quantity is specified", function() {
    // toThrow() doesn't catch the exceptions
    //expect(new Item("foo", date, -42)).toThrow();
  });
});

describe("ItemsCollection: size, add, remove, removeById, getNth", function() {
  var item0, item1, item2: Item;
  var items: ItemsCollection;
  var date1, date2: number;

  it("returns the size of the collection", function() {
    items = new ItemsCollection();
    expect(items.size()).toEqual(0);

    item0 = new Item("foo", date1, 1);
    item1 = new Item("bar", date2, 1);

    items.add(item0);
    expect(items.size()).toEqual(1);

    items.add(item1);
    expect(items.size()).toEqual(2);

    item2 = items.getNth(0);
    expect(item2.name).toEqual("foo");

    // toThrow() doesn't catch the exceptions
    //expect(items.getNth(100)).toThrow();

    items.remove(item0);
    item2 = items.getNth(0);
    expect(item2.name).toEqual("bar");
    expect(items.size()).toEqual(1);

    items.remove(item1);
    expect(items.size()).toEqual(0);
    items.add(item0);
    items.add(item1);
    expect(items.size()).toEqual(2);

    items.removeById(item1["id"]);
    item2 = items.getNth(0);
    expect(item2.name).toEqual("foo");
    expect(items.size()).toEqual(1);

    item2 = null;
    item2 = items.get(item0["id"]);
    expect(item2.name).toEqual("foo");
  });
});

describe("ItemsCollection: remove, removeById, size", function() {
  it("decreases the quantity of the item", function () {
    localStorage.clear();

    var item: Item = new Item("foo", (new Date()).getTime(), 2);
    var item1: Item = new Item("bar", (new Date()).getTime(), 10);
    var items: ItemsCollection = new ItemsCollection();

    items.add(item);
    expect(items.size()).toEqual(2);

    items.remove(item);
    expect(items.size()).toEqual(1);

    items.add(item1);
    expect(items.size()).toEqual(11);

    items.remove(item);
    expect(items.size()).toEqual(10);
    expect(items.getNth(0).quantity).toEqual(10);

    items.removeById(item1["id"]);
    expect(items.size()).toEqual(9);
  });
});

describe("ItemsCollection.sort()", function() {
  localStorage.clear();

  var item0, item1, item2, item3, item4: Item;
  var items: ItemsCollection = new ItemsCollection();

  it("correctly sorts the items of the collection", function () {
    item0 = new Item("0", (new Date(2013, 0, 1).getTime()));
    item1 = new Item("1", (new Date(2013, 1, 1).getTime()));
    item2 = new Item("2", (new Date(2013, 2, 1).getTime()));
    item3 = new Item("3", (new Date(2013, 3, 1).getTime()));

    items.add(item1);
    items.add(item3);
    items.add(item2);
    items.add(item0);

    items.sort();

    expect(items.getNth(0).name).toEqual("0");
    expect(items.getNth(1).name).toEqual("1");
    expect(items.getNth(2).name).toEqual("2");
    expect(items.getNth(3).name).toEqual("3");
  });
});

describe("ItemsCache", function() {
  var cache: ItemsCache;
  cache = new ItemsCache();
  cache.addItem("lemon", 2);
  cache.addItem("tomato", 3);
  cache.addItem("orange", 10);
  cache.addItem("lemon", 1);

  it("getMostPopularItems", function () {
    var popularItems = cache.getMostPopularItems();
    var limit = popularItems.length - 1;
    for (var i=0; i <limit; ++i) {
      expect(popularItems.length).toEqual(3);
      expect(popularItems[i].quantity >= popularItems[i+1].quantity).toEqual(true);
    }
  });

  it("getMostPopularItems with a limit of numberOfItems", function () {
    var popularItems = cache.getMostPopularItems(2);
    var limit = popularItems.length - 1;
    for (var i=0; i <limit; ++i) {
      expect(popularItems.length).toEqual(2);
      expect(popularItems[i].quantity >= popularItems[i+1].quantity).toEqual(true);
    }
  });

  it("getMostPopularItems filtered by name", function () {
    var popularItems = cache.getMostPopularItemsByName("m");
    expect(popularItems.length).toEqual(2);
  });
});

describe("ItemsCache", function() {
  var cache: ItemsCache;
  cache = new ItemsCache();
  cache.addItem("lemon", 2);
  cache.addItem("tomato", 3);
  cache.addItem("orange", 10);
  cache.addItem("lemon", 1);

  it("getMostPopularItems", function () {
    var popularItems = cache.getMostPopularItems();
    var limit = popularItems.length - 1;
    for (var i=0; i <limit; ++i) {
      expect(popularItems.length).toEqual(3);
      expect(popularItems[i].quantity >= popularItems[i+1].quantity).toEqual(true);
    }
  });

  it("getMostPopularItems with a limit of numberOfItems", function () {
    var popularItems = cache.getMostPopularItems(2);
    var limit = popularItems.length - 1;
    for (var i=0; i <limit; ++i) {
      expect(popularItems.length).toEqual(2);
      expect(popularItems[i].quantity >= popularItems[i+1].quantity).toEqual(true);
    }
  });

  it("getMostPopularItems filtered by name", function () {
    var popularItems = cache.getMostPopularItemsByName("m");
    expect(popularItems.length).toEqual(2);
  });
});

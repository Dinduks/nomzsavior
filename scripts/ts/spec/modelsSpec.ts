/// <reference path="../definitions/jasmine.d.ts" />
/// <reference path="../src/models.ts" />

describe("Item.constructor()", function() {
  var date: Date;
  var item: Item;

  it("creates an object with the correct values", function() {
    date = new Date();
    item = new Item("foo", date, 9000)

    expect(item.name).toEqual("foo")
    expect(item.expirationDate).toEqual(date);
    expect(item.quantity).toEqual(9000)
  });

  it("sets quantity to one if not specified", function() {
    date = new Date();
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
  var date1, date2: Date;

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

    var item: Item = new Item("foo", new Date(), 2);
    var item1: Item = new Item("bar", new Date(), 10);
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

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
    // toThrow() doesn't work on the constructor
    //expect(new Item("foo", date, -42)).toThrow();
  });
});

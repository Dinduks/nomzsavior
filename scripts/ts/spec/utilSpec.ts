/// <reference path="../definitions/jasmine.d.ts" />
/// <reference path="../src/util.ts" />

describe("Util.dateToDay()", function() {
  it("return the date of the day (at midnight)", function() {
    var date;

    date = new Date();
    date.setTime(1374822983270);

    expect(Util.dateToDay(date).getTime()).toEqual(1374789600000);
  });
});

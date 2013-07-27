describe("window.mainScreen._getExpirationInfo()", function () {
    var getExpirationInfo = window.mainScreen._getExpirationInfo;
    var millisecondsInADay = 60 * 60 * 24 * 1000;
    var addDaysToDate = function (date, days) { date.setDate(date.getDate() + days); };

    it("returns 'Today' when it's the case", function () {
        var date = new Date();
        expect(getExpirationInfo(date)).toEqual(["Today", ""]);
    });

    it("returns 'Tomorrow' when it's the case", function () {
        var date = new Date();
        addDaysToDate(date, 1);
        expect(getExpirationInfo(date)).toEqual(["Tomorrow", ""]);
    });

    it("returns the numbers of days left when >= 2 and < 7", function () {
        var date;

        date = new Date();
        addDaysToDate(date, 2);
        expect(getExpirationInfo(date)).toEqual(["+ 2", "days"]);

        date = new Date();
        addDaysToDate(date, 5);
        expect(getExpirationInfo(date)).toEqual(["+ 5", "days"]);

        date = new Date();
        addDaysToDate(date, 6);
        expect(getExpirationInfo(date)).toEqual(["+ 6", "days"]);
    });

    it("returns 'more than a week' when it's the case", function () {
        var date = new Date();
        addDaysToDate(date, 42);
        expect(getExpirationInfo(date)).toEqual(["+ 1", "week"]);
    });

    it("returns 'Expired' when it's the case", function () {
        var date = new Date();
        addDaysToDate(date, -6);
        expect(getExpirationInfo(date)).toEqual(["Expired", ""]);
    });
});

describe("window.mainScreen._getExpirationInfo()", function () {
    var getExpirationInfo = window.mainScreen._getExpirationInfo;
    var millisecondsInADay = 60 * 60 * 24 * 1000;
    var addDaysToDate = function (date, days) { date.setDate(date.getDate() + days); };

    it("returns 'Today' when it's the case", function () {
        var date = new Date();
        expect(getExpirationInfo(date)).toEqual({
            firstLine: "0",
            secondLine: "day",
            days: 0
        });
    });

    it("returns 'Tomorrow' when it's the case", function () {
        var date = new Date();
        addDaysToDate(date, 1);
        expect(getExpirationInfo(date)).toEqual({
            firstLine: "1",
            secondLine: "day",
            days: 1
        });
    });

    it("returns the numbers of days left when >= 2 and < 7", function () {
        var date;

        date = new Date();
        addDaysToDate(date, 2);
        expect(getExpirationInfo(date)).toEqual({
            firstLine: 2,
            secondLine: "days",
            days: 2
        });

        date = new Date();
        addDaysToDate(date, 5);
        expect(getExpirationInfo(date)).toEqual({
            firstLine: 5,
            secondLine: "days",
            days: 5
        });

        date = new Date();
        addDaysToDate(date, 6);
        expect(getExpirationInfo(date)).toEqual({
            firstLine: 6,
            secondLine: "days",
            days: 6
        });
    });

    it("returns 'more than a week' when it's the case", function () {
        var date = new Date();
        addDaysToDate(date, 42);
        expect(getExpirationInfo(date)).toEqual({
            firstLine: "+ 1",
            secondLine: "week",
            days: 42
        });
    });

    it("returns 'Expired' when it's the case", function () {
        var date;

        date = new Date();
        addDaysToDate(date, -6);
        expect(getExpirationInfo(date)).toEqual({
            firstLine: -6,
            secondLine: "days",
            days: -6
        });

        date = new Date();
        addDaysToDate(date, -1);
        expect(getExpirationInfo(date)).toEqual({
            firstLine: -1,
            secondLine: "day",
            days: -1
        });
    });
});

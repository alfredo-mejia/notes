import test from "node:test";
import assert from "node:assert";
import {MonthField} from "../../src/Field.js";

test("MonthField Constructor", (testObject) => {
    assert.throws(() => {
        new MonthField()
    }, Error, "MonthField must fail without a name");

    assert.throws(() => {
        new MonthField("test")
    }, Error, "MonthField must fail if name is not a valid field name");

    assert.doesNotThrow(() => {
        new MonthField("record_calendar_month")
    }, Error, "MonthField must not fail if name is a valid field name");
});

test("MonthField format() Method", async (testObject) => {
    await testObject.test("Invalid Values", () => {
        let a = new MonthField("record_calendar_month").format("");
        assert.strictEqual(a, "");

        let b = new MonthField("record_calendar_month").format("test");
        assert.strictEqual(b, "");

        let c = new MonthField("record_calendar_month").format(true);
        assert.strictEqual(c, "");
    });

    await testObject.test("Valid Values", () => {
        let a = new MonthField("record_calendar_month").format(1.23456789);
        assert.strictEqual(a, "01");

        let b = new MonthField("record_calendar_month").format(123.23456789);
        assert.strictEqual(b, "123");

        let c = new MonthField("record_calendar_month").format(1);
        assert.strictEqual(c, "01");

        let d = new MonthField("record_calendar_month").format(100);
        assert.strictEqual(d, "100");

        let e = new MonthField("record_calendar_month").format(-12);
        assert.strictEqual(e, "-12");

        let f = new MonthField("record_calendar_month").format(5);
        assert.strictEqual(f, "05");
    });
});

test("MonthField isValid() Method", async (testObject) => {
    await testObject.test("Invalid Values", () => {
        let a = new MonthField("record_calendar_month").isValid("");
        assert.strictEqual(a, false);

        let b = new MonthField("record_calendar_month").isValid(1.0);
        assert.strictEqual(b, false);

        let c = new MonthField("record_calendar_month").isValid(true);
        assert.strictEqual(c, false);

        let d = new MonthField("record_calendar_month").isValid("test");
        assert.strictEqual(d, false);

        let e = new MonthField("record_calendar_month").isValid("-1");
        assert.strictEqual(e, false);

        let f = new MonthField("record_calendar_month").isValid("1.23456789");
        assert.strictEqual(f, false);

        let g = new MonthField("record_calendar_month").isValid("1098.23456789");
        assert.strictEqual(g, false);

        let h = new MonthField("record_calendar_month").isValid("3000");
        assert.strictEqual(h, false);

        let i = new MonthField("record_calendar_month").isValid("1000");
        assert.strictEqual(i, false);

        let j = new MonthField("record_calendar_month").isValid("123");
        assert.strictEqual(j, false);

        let k = new MonthField("record_calendar_month").isValid("12345");
        assert.strictEqual(k, false);

        let l = new MonthField("record_calendar_month").isValid("-1000");
        assert.strictEqual(l, false);

        let m = new MonthField("record_calendar_month").isValid("0");
        assert.strictEqual(m, false);

        let n = new MonthField("record_calendar_month").isValid("13");
        assert.strictEqual(n, false);
    });

    await testObject.test("Valid Values", () => {
        let a = new MonthField("record_calendar_month").isValid("01");
        assert.strictEqual(a, true);

        let b = new MonthField("record_calendar_month").isValid("02");
        assert.strictEqual(b, true);

        let c = new MonthField("record_calendar_month").isValid("03");
        assert.strictEqual(c, true);

        let d = new MonthField("record_calendar_month").isValid("04");
        assert.strictEqual(d, true);

        let e = new MonthField("record_calendar_month").isValid("12");
        assert.strictEqual(e, true);

        let f = new MonthField("record_calendar_month").isValid("11");
        assert.strictEqual(f, true);

        let g = new MonthField("record_calendar_month").isValid("10");
        assert.strictEqual(g, true);

        let h = new MonthField("record_calendar_month").isValid("09");
        assert.strictEqual(h, true);

        let i = new MonthField("record_calendar_month").isValid("08");
        assert.strictEqual(i, true);

        let j = new MonthField("record_calendar_month").isValid("07");
        assert.strictEqual(j, true);

        let k = new MonthField("record_calendar_month").isValid("06");
        assert.strictEqual(k, true);

        let l = new MonthField("record_calendar_month").isValid("05");
        assert.strictEqual(l, true);

        let m = new MonthField("record_calendar_month").isValid("04");
        assert.strictEqual(m, true);
    });
});
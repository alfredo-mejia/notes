import test from "node:test";
import assert from "node:assert";
import {DayField} from "../../src/Field.js";

test("DayField Constructor", (testObject) => {
    assert.throws(() => {
        new DayField()
    }, Error, "DayField must fail without a name");

    assert.throws(() => {
        new DayField("test")
    }, Error, "DayField must fail if name is not a valid field name");

    assert.doesNotThrow(() => {
        new DayField("record_calendar_day")
    }, Error, "DayField must not fail if name is a valid field name");
});

test("DayField format() Method", async (testObject) => {
    await testObject.test("Invalid Values", () => {
        let a = new DayField("record_calendar_day").format("");
        assert.strictEqual(a, "");

        let b = new DayField("record_calendar_day").format("test");
        assert.strictEqual(b, "");

        let c = new DayField("record_calendar_day").format(true);
        assert.strictEqual(c, "");

        let d = new DayField("record_calendar_day").format("123");
        assert.strictEqual(d, "");
    });

    await testObject.test("Valid Values", () => {
        let a = new DayField("record_calendar_day").format(1.23456789);
        assert.strictEqual(a, "01");

        let b = new DayField("record_calendar_day").format(123.23456789);
        assert.strictEqual(b, "123");

        let c = new DayField("record_calendar_day").format(1);
        assert.strictEqual(c, "01");

        let d = new DayField("record_calendar_day").format(100);
        assert.strictEqual(d, "100");

        let e = new DayField("record_calendar_day").format(-12);
        assert.strictEqual(e, "-12");

        let f = new DayField("record_calendar_day").format(5);
        assert.strictEqual(f, "05");

        let g = new DayField("record_calendar_day").format(30);
        assert.strictEqual(g, "30");
    });
});

test("DayField isValid() Method", async (testObject) => {
    await testObject.test("Invalid Values", () => {
        let a = new DayField("record_calendar_day").isValid("");
        assert.strictEqual(a, false);

        let b = new DayField("record_calendar_day").isValid(1.0);
        assert.strictEqual(b, false);

        let c = new DayField("record_calendar_day").isValid(true);
        assert.strictEqual(c, false);

        let d = new DayField("record_calendar_day").isValid("test");
        assert.strictEqual(d, false);

        let e = new DayField("record_calendar_day").isValid("-1");
        assert.strictEqual(e, false);

        let f = new DayField("record_calendar_day").isValid("1.23456789");
        assert.strictEqual(f, false);

        let g = new DayField("record_calendar_day").isValid("1098.23456789");
        assert.strictEqual(g, false);

        let h = new DayField("record_calendar_day").isValid("3000");
        assert.strictEqual(h, false);

        let i = new DayField("record_calendar_day").isValid("1000");
        assert.strictEqual(i, false);

        let j = new DayField("record_calendar_day").isValid("123");
        assert.strictEqual(j, false);

        let k = new DayField("record_calendar_day").isValid("12345");
        assert.strictEqual(k, false);

        let l = new DayField("record_calendar_day").isValid("-1000");
        assert.strictEqual(l, false);

        let m = new DayField("record_calendar_day").isValid("0");
        assert.strictEqual(m, false);

        let n = new DayField("record_calendar_day").isValid("32");
        assert.strictEqual(n, false);
    });

    await testObject.test("Valid Values", () => {
        let a = new DayField("record_calendar_day").isValid("01");
        assert.strictEqual(a, true);

        let b = new DayField("record_calendar_day").isValid("02");
        assert.strictEqual(b, true);

        let c = new DayField("record_calendar_day").isValid("03");
        assert.strictEqual(c, true);

        let d = new DayField("record_calendar_day").isValid("04");
        assert.strictEqual(d, true);

        let e = new DayField("record_calendar_day").isValid("12");
        assert.strictEqual(e, true);

        let f = new DayField("record_calendar_day").isValid("11");
        assert.strictEqual(f, true);

        let g = new DayField("record_calendar_day").isValid("10");
        assert.strictEqual(g, true);

        let h = new DayField("record_calendar_day").isValid("09");
        assert.strictEqual(h, true);

        let i = new DayField("record_calendar_day").isValid("08");
        assert.strictEqual(i, true);

        let j = new DayField("record_calendar_day").isValid("07");
        assert.strictEqual(j, true);

        let k = new DayField("record_calendar_day").isValid("06");
        assert.strictEqual(k, true);

        let l = new DayField("record_calendar_day").isValid("05");
        assert.strictEqual(l, true);

        let m = new DayField("record_calendar_day").isValid("04");
        assert.strictEqual(m, true);

        let n = new DayField("record_calendar_day").isValid("31");
        assert.strictEqual(n, true);

        let o = new DayField("record_calendar_day").isValid("30");
        assert.strictEqual(o, true);

        let p = new DayField("record_calendar_day").isValid("29");
        assert.strictEqual(p, true);

        let q = new DayField("record_calendar_day").isValid("28");
        assert.strictEqual(q, true);

        let r = new DayField("record_calendar_day").isValid("27");
        assert.strictEqual(r, true);

        let s = new DayField("record_calendar_day").isValid("26");
        assert.strictEqual(s, true);

        let t = new DayField("record_calendar_day").isValid("25");
        assert.strictEqual(t, true);

        let u = new DayField("record_calendar_day").isValid("24");
        assert.strictEqual(u, true);

        let v = new DayField("record_calendar_day").isValid("23");
        assert.strictEqual(v, true);
    });
});
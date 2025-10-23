import test from "node:test";
import assert from "node:assert";
import {QuarterField} from "../../src/Field.js";

test("QuarterField Constructor", (testObject) => {
    assert.throws(() => {
        new QuarterField()
    }, Error, "QuarterField must fail without a name");

    assert.throws(() => {
        new QuarterField("test")
    }, Error, "QuarterField must fail if name is not a valid field name");

    assert.doesNotThrow(() => {
        new QuarterField("record_fiscal_quarter")
    }, Error, "QuarterField must not fail if name is a valid field name");
});

test("QuarterField format() Method", async (testObject) => {
    await testObject.test("Invalid Values", () => {
        let a = new QuarterField("record_fiscal_quarter").format("");
        assert.strictEqual(a, "");

        let b = new QuarterField("record_fiscal_quarter").format("test");
        assert.strictEqual(b, "");

        let c = new QuarterField("record_fiscal_quarter").format(true);
        assert.strictEqual(c, "");
    });

    await testObject.test("Valid Values", () => {
        let a = new QuarterField("record_fiscal_quarter").format(1.23456789);
        assert.strictEqual(a, "1");

        let b = new QuarterField("record_fiscal_quarter").format(123.23456789);
        assert.strictEqual(b, "123");

        let f = new QuarterField("record_fiscal_quarter").format(1);
        assert.strictEqual(f, "1");

        let g = new QuarterField("record_fiscal_quarter").format(100);
        assert.strictEqual(g, "100");
    });
});

test("QuarterField isValid() Method", async (testObject) => {
    await testObject.test("Invalid Values", () => {
        let a = new QuarterField("record_fiscal_quarter").isValid("");
        assert.strictEqual(a, false);

        let b = new QuarterField("record_fiscal_quarter").isValid(1.0);
        assert.strictEqual(b, false);

        let c = new QuarterField("record_fiscal_quarter").isValid(true);
        assert.strictEqual(c, false);

        let d = new QuarterField("record_fiscal_quarter").isValid("test");
        assert.strictEqual(d, false);

        let e = new QuarterField("record_fiscal_quarter").isValid("-1");
        assert.strictEqual(e, false);

        let f = new QuarterField("record_fiscal_quarter").isValid("1.23456789");
        assert.strictEqual(f, false);

        let g = new QuarterField("record_fiscal_quarter").isValid("1098.23456789");
        assert.strictEqual(g, false);

        let h = new QuarterField("record_fiscal_quarter").isValid("3000");
        assert.strictEqual(h, false);

        let i = new QuarterField("record_fiscal_quarter").isValid("1000");
        assert.strictEqual(i, false);

        let j = new QuarterField("record_fiscal_quarter").isValid("123");
        assert.strictEqual(j, false);

        let k = new QuarterField("record_fiscal_quarter").isValid("12345");
        assert.strictEqual(k, false);

        let l = new QuarterField("record_fiscal_quarter").isValid("-1000");
        assert.strictEqual(l, false);

        let m = new QuarterField("record_fiscal_quarter").isValid("0");
        assert.strictEqual(m, false);

        let n = new QuarterField("record_fiscal_quarter").isValid("5");
        assert.strictEqual(n, false);
    });

    await testObject.test("Valid Values", () => {
        let a = new QuarterField("record_fiscal_quarter").isValid("1");
        assert.strictEqual(a, true);

        let b = new QuarterField("record_fiscal_quarter").isValid("2");
        assert.strictEqual(b, true);

        let c = new QuarterField("record_fiscal_quarter").isValid("3");
        assert.strictEqual(c, true);

        let d = new QuarterField("record_fiscal_quarter").isValid("4");
        assert.strictEqual(d, true);
    });
});
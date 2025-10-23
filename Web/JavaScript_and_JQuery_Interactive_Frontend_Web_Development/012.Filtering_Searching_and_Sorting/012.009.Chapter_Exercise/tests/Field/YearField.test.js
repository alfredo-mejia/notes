import test from "node:test";
import assert from "node:assert";
import {YearField} from "../../src/Field.js";

test("YearField Constructor", (testObject) => {
    assert.throws(() => {
        new YearField()
    }, Error, "YearField must fail without a name");

    assert.throws(() => {
        new YearField("test")
    }, Error, "YearField must fail if name is not a valid field name");

    assert.doesNotThrow(() => {
        new YearField("record_fiscal_year")
    }, Error, "YearField must not fail if name is a valid field name");
});

test("YearField format() Method", async (testObject) => {
    await testObject.test("Invalid Values", () => {
        let a = new YearField("record_fiscal_year").format("");
        assert.strictEqual(a, "");

        let b = new YearField("record_fiscal_year").format("test");
        assert.strictEqual(b, "");

        let c = new YearField("record_fiscal_year").format(true);
        assert.strictEqual(c, "");
    });

    await testObject.test("Valid Values", () => {
        let a = new YearField("record_fiscal_year").format(1.23456789);
        assert.strictEqual(a, "1");

        let b = new YearField("record_fiscal_year").format(123.23456789);
        assert.strictEqual(b, "123");

        let f = new YearField("record_fiscal_year").format(1);
        assert.strictEqual(f, "1");

        let g = new YearField("record_fiscal_year").format(100);
        assert.strictEqual(g, "100");
    });
});

test("YearField isValid() Method", async (testObject) => {
    await testObject.test("Invalid Values", () => {
        let a = new YearField("record_fiscal_year").isValid("");
        assert.strictEqual(a, false);

        let b = new YearField("record_fiscal_year").isValid(1.0);
        assert.strictEqual(b, false);

        let c = new YearField("record_fiscal_year").isValid(true);
        assert.strictEqual(c, false);

        let d = new YearField("record_fiscal_year").isValid("test");
        assert.strictEqual(d, false);

        let e = new YearField("record_fiscal_year").isValid("-1");
        assert.strictEqual(e, false);

        let f = new YearField("record_fiscal_year").isValid("1.23456789");
        assert.strictEqual(f, false);

        let g = new YearField("record_fiscal_year").isValid("1098.23456789");
        assert.strictEqual(g, false);

        let h = new YearField("record_fiscal_year").isValid("3000");
        assert.strictEqual(h, false);

        let i = new YearField("record_fiscal_year").isValid("1000");
        assert.strictEqual(i, false);

        let j = new YearField("record_fiscal_year").isValid("123");
        assert.strictEqual(j, false);

        let k = new YearField("record_fiscal_year").isValid("12345");
        assert.strictEqual(k, false);

        let l = new YearField("record_fiscal_year").isValid("-1000");
        assert.strictEqual(l, false);
    });

    await testObject.test("Valid Values", () => {
        let a = new YearField("record_fiscal_year").isValid("2000");
        assert.strictEqual(a, true);

        let b = new YearField("record_fiscal_year").isValid("2010");
        assert.strictEqual(b, true);

        let c = new YearField("record_fiscal_year").isValid("2022");
        assert.strictEqual(c, true);
    });
});
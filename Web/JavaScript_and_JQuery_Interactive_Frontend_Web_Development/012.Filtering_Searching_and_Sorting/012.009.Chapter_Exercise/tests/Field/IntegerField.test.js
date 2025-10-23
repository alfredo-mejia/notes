import test from "node:test";
import assert from "node:assert";
import {IntegerField} from "../../src/Field.js";

test("IntegerField Constructor", (testObject) => {
    assert.throws(() => {
        new IntegerField()
    }, Error, "IntegerField must fail without a name");

    assert.throws(() => {
        new IntegerField("test")
    }, Error, "IntegerField must fail if name is not a valid field name");

    assert.doesNotThrow(() => {
        new IntegerField("src_line_nbr")
    }, Error, "IntegerField must not fail if name is a valid field name");
});

test("IntegerField format() Method", async (testObject) => {
    await testObject.test("Invalid Values", () => {
        let a = new IntegerField("src_line_nbr").format("");
        assert.strictEqual(a, "");

        let b = new IntegerField("src_line_nbr").format("test");
        assert.strictEqual(b, "");

        let c = new IntegerField("src_line_nbr").format(true);
        assert.strictEqual(c, "");
    });

    await testObject.test("Valid Values", () => {
        let a = new IntegerField("src_line_nbr").format(1.23456789);
        assert.strictEqual(a, "1");

        let b = new IntegerField("src_line_nbr").format(123.23456789);
        assert.strictEqual(b, "123");

        let f = new IntegerField("src_line_nbr").format(1);
        assert.strictEqual(f, "1");

        let g = new IntegerField("src_line_nbr").format(100);
        assert.strictEqual(g, "100");
    });
});

test("IntegerField isValid() Method", async (testObject) => {
    await testObject.test("Invalid Values", () => {
        let a = new IntegerField("src_line_nbr").isValid("");
        assert.strictEqual(a, false);

        let b = new IntegerField("src_line_nbr").isValid(1.0);
        assert.strictEqual(b, false);

        let c = new IntegerField("src_line_nbr").isValid(true);
        assert.strictEqual(c, false);

        let d = new IntegerField("src_line_nbr").isValid("test");
        assert.strictEqual(d, false);

        let e = new IntegerField("src_line_nbr").isValid("-1");
        assert.strictEqual(e, false);

        let f = new IntegerField("src_line_nbr").isValid("1.23456789");
        assert.strictEqual(f, false);

        let g = new IntegerField("src_line_nbr").isValid("1098.23456789");
        assert.strictEqual(g, false);
    });

    await testObject.test("Valid Values", () => {
        let a = new IntegerField("src_line_nbr").isValid("1");
        assert.strictEqual(a, true);

        let b = new IntegerField("src_line_nbr").isValid("13423");
        assert.strictEqual(b, true);

        let c = new IntegerField("src_line_nbr").isValid("2344");
        assert.strictEqual(c, true);
    });
});
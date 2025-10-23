import test from "node:test";
import assert from "node:assert";
import {FloatField} from "../../src/Field.js";

test("FloatField Constructor", async(testObject) => {
    await testObject.test("Invalid Arguments", () => {
        assert.throws(() => {
            new FloatField()
        }, Error, "FloatField must fail without a name");

        assert.throws(() => {
            new FloatField("test")
        }, Error, "FloatField must fail if name is not a valid field name");

        assert.doesNotThrow(() => {
            new FloatField("avg_interest_rate_amt")
        }, Error, "FloatField must not fail if name is a valid field name");

        assert.throws(() => {
            new FloatField("avg_interest_rate_amt", 1.0, 1.0);
        }, Error, "FloatField must fail if precisionRequired is not a boolean");

        assert.throws(() => {
            new FloatField("avg_interest_rate_amt", 1.25, true);
        }, Error, "FloatField must fail if precision is not a number");

        assert.throws(() => {
           new FloatField("avg_interest_rate_amt", "test", "test");
        }, Error, "FloatField must fail if precision is not a number and precisionRequired is not a boolean");

        assert.throws(() => {
            new FloatField("avg_interest_rate_amt", -1);
        }, Error, "FloatField must fail if precision is not a positive number");
    });

    await testObject.test("Valid Arguments", () => {
       assert.doesNotThrow(() => {
           new FloatField("avg_interest_rate_amt")
       }, Error, "FloatField must not fail if name is a valid field name without any arguments (using default values)");

       assert.doesNotThrow(() => {
          new FloatField("avg_interest_rate_amt", 5);
       }, Error, "FloatField must not fail if name is a valid field name and precision is a number");

       assert.doesNotThrow(() => {
          new FloatField("avg_interest_rate_amt", 7, true);
       }, Error, "FloatField must not fail if name is a valid field name and precision is a number and precisionRequired is a boolean");

       assert.doesNotThrow(() => {
          new FloatField("avg_interest_rate_amt", 10, false);
       }, Error, "FloatField must not fail if name is a valid field name and precision is a number and precisionRequired is a boolean");
    });
});

test("FloatField format() Method", async (testObject) => {
    await testObject.test("Invalid Values", () => {
       let a = new FloatField("avg_interest_rate_amt").format("");
       assert.strictEqual(a, "");

       let b = new FloatField("avg_interest_rate_amt").format("test");
       assert.strictEqual(b, "");

       let c = new FloatField("avg_interest_rate_amt").format(true);
       assert.strictEqual(c, "");
    });

    await testObject.test("Valid Values", () => {
       let a = new FloatField("avg_interest_rate_amt").format(1.23456789);
       assert.strictEqual(a, "1.235");

       let b = new FloatField("avg_interest_rate_amt", 5).format(1.23456789);
       assert.strictEqual(b, "1.23457");

       let c = new FloatField("avg_interest_rate_amt", 2, false).format(1.23456789);
       assert.strictEqual(c, "1.23456789");

       let d = new FloatField("avg_interest_rate_amt", 2, true).format(1.23456789);
       assert.strictEqual(d, "1.23");

       let e = new FloatField("avg_interest_rate_amt", 0, true).format(1.23456789);
       assert.strictEqual(e, "1");

       let f = new FloatField("avg_interest_rate_amt", 5, true).format(1);
       assert.strictEqual(f, "1.00000");

       let g = new FloatField("avg_interest_rate_amt", 5, false).format(100);
       assert.strictEqual(g, "100");
    });
});

test("FloatField isValid() Method", async (testObject) => {
    await testObject.test("Invalid Values", () => {
        let a = new FloatField("avg_interest_rate_amt").isValid("");
        assert.strictEqual(a, false);

        let b = new FloatField("avg_interest_rate_amt").isValid(1.0);
        assert.strictEqual(b, false);

        let c = new FloatField("avg_interest_rate_amt").isValid(true);
        assert.strictEqual(c, false);

        let d = new FloatField("avg_interest_rate_amt").isValid("test");
        assert.strictEqual(d, false);

        let e = new FloatField("avg_interest_rate_amt").isValid("-1");
        assert.strictEqual(e, false);

        let f = new FloatField("avg_interest_rate_amt", 3, true).isValid("1.23456789");
        assert.strictEqual(f, false);

        let g = new FloatField("avg_interest_rate_amt", 5, true).isValid("1.23456789");
        assert.strictEqual(g, false);
    });

    await testObject.test("Valid Values", () => {
       let a = new FloatField("avg_interest_rate_amt", 3, false).isValid("1.23456789");
       assert.strictEqual(a, true);

       let b = new FloatField("avg_interest_rate_amt", 8, true).isValid("1.23456789");
       assert.strictEqual(b, true);

       let c = new FloatField("avg_interest_rate_amt").isValid("134234234.234");
       assert.strictEqual(c, true);
    });
});

test("FloatField getPrecision() Method", (testObject) => {
   let a = new FloatField("avg_interest_rate_amt").getPrecision();
   assert.strictEqual(a, 3);

   let b = new FloatField("avg_interest_rate_amt", 5).getPrecision();
   assert.strictEqual(b, 5);
});

test("FloatField getPrecisionRequired() Method", (testObject) => {
    let a = new FloatField("avg_interest_rate_amt").isPrecisionRequired();
    assert.strictEqual(a, true);

    let b = new FloatField("avg_interest_rate_amt", 3, true).isPrecisionRequired();
    assert.strictEqual(b, true);

    let c = new FloatField("avg_interest_rate_amt", 3, false).isPrecisionRequired();
    assert.strictEqual(c, false);
})
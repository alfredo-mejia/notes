import test from "node:test";
import assert from "node:assert";
import {DateField} from "../../src/Field.js";

test("DateField Constructor", (testObject) => {
    assert.throws(() => {
       new DateField()
    }, Error, "DateField must fail without a name");

    assert.throws(() => {
       new DateField("test")
    }, Error, "DateField must fail if name is not a valid field name");

    assert.doesNotThrow(() => {
       new DateField("record_date")
    }, Error, "DateField must not fail if name is a valid field name");
});

test("DateField format() Method", async (testObject) => {
    await testObject.test("Invalid Values", () => {
        let a = new DateField("record_date").format();
        assert.strictEqual(a, "");

        let b = new DateField("record_date").format(1);
        assert.strictEqual(b, "");

        let c = new DateField("record_date").format(true);
        assert.strictEqual(c, "");

        let d = new DateField("record_date").format("test");
        assert.strictEqual(d, "");

        let e = new DateField("record_date").format("30/30/2000");
        assert.strictEqual(e, "");

        let f = new DateField("record_date").format("30-30-2000 12:00:00");
        assert.strictEqual(f, "");

        let g = new DateField("record_date").format("31-12-2000");
        assert.strictEqual(g, "");

        let h = new DateField("record_date").format("31/12/2000");
        assert.strictEqual(h, "");

        let i = new DateField("record_date").format("2000-30-01");
        assert.strictEqual(a, "");

        let j = new DateField("record_date").format("2000/30/01");
        assert.strictEqual(b, "");
    });

    await testObject.test("Valid Values", () => {
        let c = new DateField("record_date").format("2000-01-30");
        assert.strictEqual(c, "2000-01-30");

        let d = new DateField("record_date").format("2000/01/30");
        assert.strictEqual(d, "2000-01-30");

        let e = new DateField("record_date").format("01-31-2000");
        assert.strictEqual(e, "2000-01-31");

        let f = new DateField("record_date").format("01/31/2000");
        assert.strictEqual(f, "2000-01-31");

        let g = new DateField("record_date").format("01-01-2000");
        assert.strictEqual(g, "2000-01-01");

        let h = new DateField("record_date").format("2000/01/01");
        assert.strictEqual(h, "2000-01-01");

        let i = new DateField("record_date").format("12/31/2000");
        assert.strictEqual(i, "2000-12-31");

        let j = new DateField("record_date").format("2000-12-31");
        assert.strictEqual(j, "2000-12-31");
    });
});

test("DateField isValid() Method", async (testObject) => {
   await testObject.test("Invalid Values", () => {
       let a = new DateField("record_date").isValid();
       assert.strictEqual(a, false);

       let b = new DateField("record_date").isValid("test");
       assert.strictEqual(b, false);

       let c = new DateField("record_date").isValid(1.5);
       assert.strictEqual(c, false);

       let d = new DateField("record_date").isValid("30/30/2000");
       assert.strictEqual(d, false);

       let e = new DateField("record_date").isValid("30-30-2000 12:00:00");
       assert.strictEqual(e, false);

       let f = new DateField("record_date").isValid("31-12-2000");
       assert.strictEqual(f, false);

       let g = new DateField("record_date").isValid("31/12/2000");
       assert.strictEqual(g, false);

       let h = new DateField("record_date").isValid(true);
       assert.strictEqual(h, false);

       let i = new DateField("record_date").isValid("30-2000-01");
       assert.strictEqual(i, false);

       let j = new DateField("record_date").isValid("2000-31-02");
       assert.strictEqual(j, false);

       let k = new DateField("record_date").isValid("2000-01-32");
       assert.strictEqual(k, false);
   });

   await testObject.test("Valid Values", () => {
       let a = new DateField("record_date").isValid("2000-01-30");
       assert.strictEqual(a, true);

       let b = new DateField("record_date").isValid("2000-12-31");
       assert.strictEqual(b, true);
   });
});
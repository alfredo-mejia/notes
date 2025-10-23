import test from "node:test";
import assert from "node:assert";
import {DateField, StringField} from '../../src/Field.js';

test("StringField Constructor", () => {
    assert.throws(() => {
        new StringField();
    }, Error, "StringField must fail without a name");

    assert.throws(() => {
        new StringField("test");
    }, Error, "StringField must fail if name is not a valid field name");

    assert.doesNotThrow(() => {
        new StringField("security_type_desc");
    }, Error, "StringField must not fail if name is a valid field name");
});

test("DateString format() Method", async (testObject) => {
    await testObject.test("Invalid Values", () => {
       let a = new StringField("security_type_desc").format();
       assert.strictEqual(a, "");

       let b = new StringField("security_type_desc").format(1);
       assert.strictEqual(b, "");

       let c = new StringField("security_type_desc").format(true);
       assert.strictEqual(c, "");

       let d = new StringField("security_type_desc").format("");
       assert.strictEqual(d, "");
    });

    await testObject.test("Valid Values", () => {
       let a = new StringField("security_type_desc").format("2000-01-30");
       assert.strictEqual(a, "2000-01-30");

       let b = new StringField("security_type_desc").format("123hello123");
       assert.strictEqual(b, "123hello123");

        let c = new StringField("security_type_desc").format("test");
        assert.strictEqual(c, "test");
    });
});

test("DateString isValid() Method", async (testObject) => {
    await testObject.test("Invalid Values", () => {
        let a = new StringField("security_type_desc").isValid(1);
        assert.strictEqual(a, false);

        let b = new StringField("security_type_desc").isValid(true);
        assert.strictEqual(b, false);

        let c = new StringField("security_type_desc").isValid("");
        assert.strictEqual(c, false);
    });

    await testObject.test("Valid Values", () => {
        let a = new StringField("security_type_desc").isValid("2000-01-30");
        assert.strictEqual(a, true);

        let b = new StringField("security_type_desc").isValid("123hello123");
        assert.strictEqual(b, true);

        let c = new StringField("security_type_desc").isValid("test");
        assert.strictEqual(c, true);
    })
});
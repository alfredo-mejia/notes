import test from "node:test";
import assert from "node:assert";
import {Field} from "../../src/Field.js";


test("Field Constructor", async (testObject) => {
    await testObject.test("No Argument Test", () => {
       assert.throws(() => {
           new Field();
       }, Error, "Field must fail without a name");
    });

    await testObject.test("Non-string Argument Test", () => {
        assert.throws(() => {
            new Field(1);
        }, Error, "Field must fail if name is int, must be string");

        assert.throws(() => {
            new Field(50.123);
        }, Error, "Field must fail if name is float, must be string");

        assert.throws(() => {
            new Field(true);
        }, Error, "Field must fail if name is boolean, must be string");

        assert.throws(() => {
            new Field(null);
        }, Error, "Field must fail if name is null, must be string");

        assert.throws(() => {
            new Field(undefined);
        }, Error, "Field must fail if name is undefined, must be string");

        assert.throws(() => {
            new Field(NaN);
        }, Error, "Field must fail if name is NaN, must be string");
    });

    await testObject.test("Invalid Name Test", () => {
        assert.throws(() => {
            new Field("test");
        }, Error, "Field must not fail if name is not a valid name");

        assert.throws(() => {
            new Field("abc");
        }, Error, "Field must not fail if name is not a valid name");

        assert.throws(() => {
            new Field(String("record"));
        }, Error, "Field must not fail if name is not a valid name");

        assert.throws(() => {
            new Field(String("date"));
        }, Error, "Field must not fail if name is not a valid name");
    });

    await testObject.test("Valid Name Test", () => {
        assert.doesNotThrow(() => {
            let x = new Field("record_date");
        }, Error, "record_date is a valid name");

        assert.doesNotThrow(() => {
            new Field("security_type_desc");
        }, Error, "security_type_desc is a valid name");

        assert.doesNotThrow(() => {
            new Field("security_desc");
        }, Error, "security_desc is a valid name");

        assert.doesNotThrow(() => {
            new Field("avg_interest_rate_amt");
        }, Error, "avg_interest_rate_amt is a valid name");

        assert.doesNotThrow(() => {
            new Field("src_line_nbr");
        }, Error, "src_line_nbr is a valid name");

        assert.doesNotThrow(() => {
            new Field("record_fiscal_year");
        }, Error, "record_fiscal_year is a valid name");

        assert.doesNotThrow(() => {
            new Field("record_fiscal_quarter");
        }, Error, "record_fiscal_quarter is a valid name");

        assert.doesNotThrow(() => {
            new Field("record_calendar_year");
        }, Error, "record_calendar_year is a valid name");

        assert.doesNotThrow(() => {
            new Field("record_calendar_quarter");
        }, Error, "record_calendar_quarter is a valid name");

        assert.doesNotThrow(() => {
            new Field("record_calendar_month");
        }, Error, "record_calendar_month is a valid name");

        assert.doesNotThrow(() => {
            new Field("record_calendar_day");
        }, Error, "record_calendar_day is a valid name");
    });

    await testObject.test("String Object Test", () => {
       assert.doesNotThrow(() => {
           new Field(String("record_date"));
       }, Error, "record_date is a valid name");

       assert.doesNotThrow(() => {
           new Field(String("security_type_desc"));
       }, Error, "security_type_desc is a valid name");

       assert.doesNotThrow(() => {
           new Field(String("security_desc"));
       }, Error, "security_desc is a valid name");

       assert.doesNotThrow(() => {
           new Field(String("avg_interest_rate_amt"));
       }, Error, "avg_interest_rate_amt is a valid name");

       assert.doesNotThrow(() => {
           new Field(String("src_line_nbr"));
       }, Error, "src_line_nbr is a valid name");
    });
});

test("Field Getter Methods", async (testObject) => {
    await testObject.test("Valid Values", () => {
        let a = new Field("record_date");
        assert.strictEqual(a.getName(), "record_date");
        assert.strictEqual(a.getDisplayName(), "Record Date");

        let b = new Field("security_type_desc");
        assert.strictEqual(b.getName(), "security_type_desc");
        assert.strictEqual(b.getDisplayName(), "Security Type Description");

        let c = new Field("security_desc");
        assert.strictEqual(c.getName(), "security_desc");
        assert.strictEqual(c.getDisplayName(), "Security Description");

        let d = new Field("avg_interest_rate_amt");
        assert.strictEqual(d.getName(), "avg_interest_rate_amt");
        assert.strictEqual(d.getDisplayName(), "Average Interest Rate Amount");

        let e = new Field("src_line_nbr");
        assert.strictEqual(e.getName(), "src_line_nbr");
        assert.strictEqual(e.getDisplayName(), "Source Line Number");

        let f = new Field("record_fiscal_year");
        assert.strictEqual(f.getName(), "record_fiscal_year");
        assert.strictEqual(f.getDisplayName(), "Fiscal Year");

        let g = new Field("record_fiscal_quarter");
        assert.strictEqual(g.getName(), "record_fiscal_quarter");
        assert.strictEqual(g.getDisplayName(), "Fiscal Quarter Number");

        let h = new Field("record_calendar_year");
        assert.strictEqual(h.getName(), "record_calendar_year");
        assert.strictEqual(h.getDisplayName(), "Calendar Year");

        let i = new Field("record_calendar_quarter");
        assert.strictEqual(i.getName(), "record_calendar_quarter");
        assert.strictEqual(i.getDisplayName(), "Calendar Quarter Number");

        let j = new Field("record_calendar_month");
        assert.strictEqual(j.getName(), "record_calendar_month");
        assert.strictEqual(j.getDisplayName(), "Calendar Month Number");

        let k = new Field("record_calendar_day");
        assert.strictEqual(k.getName(), "record_calendar_day");
        assert.strictEqual(k.getDisplayName(), "Calendar Day Number");
    });

    await testObject.test("Invalid Values", () => {
        let a = new Field("record_date");
        assert.notStrictEqual(a.getName(), "record date");
        assert.notStrictEqual(a.getDisplayName(), "Record-Date");

        let b = new Field("security_type_desc");
        assert.notStrictEqual(b.getName(), "security type desc");
        assert.notStrictEqual(b.getDisplayName(), "Security-Type-Description");

        let c = new Field("security_desc");
        assert.notStrictEqual(c.getName(), "security desc");
        assert.notStrictEqual(c.getDisplayName(), "Security-Description");

        let d = new Field("avg_interest_rate_amt");
        assert.notStrictEqual(d.getName(), "avg interest rate amt");
        assert.notStrictEqual(d.getDisplayName(), "Average-Interest-Rate-Amount");

        let e = new Field("src_line_nbr");
        assert.notStrictEqual(e.getName(), "src line nbr");
        assert.notStrictEqual(e.getDisplayName(), "Source-Line-Number");

        let f = new Field("record_fiscal_year");
        assert.notStrictEqual(f.getName(), "record fiscal year");
        assert.notStrictEqual(f.getDisplayName(), "Fiscal-Year");

        let g = new Field("record_fiscal_quarter");
        assert.notStrictEqual(g.getName(), "record fiscal quarter");
        assert.notStrictEqual(g.getDisplayName(), "Fiscal-Quarter-Number");

        let h = new Field("record_calendar_year");
        assert.notStrictEqual(h.getName(), "record calendar year");
        assert.notStrictEqual(h.getDisplayName(), "Calendar-Year");

        let i = new Field("record_calendar_quarter");
        assert.notStrictEqual(i.getName(), "record calendar quarter");
        assert.notStrictEqual(i.getDisplayName(), "Calendar-Quarter-Number");

        let j = new Field("record_calendar_month");
        assert.notStrictEqual(j.getName(), "record calendar month");
        assert.notStrictEqual(j.getDisplayName(), "Calendar-Month-Number");

        let k = new Field("record_calendar_day");
        assert.notStrictEqual(k.getName(), "record calendar day");
        assert.notStrictEqual(k.getDisplayName(), "Calendar-Day-Number");
    });
});

test("Field Abstract Methods",(testObject) => {
    assert.throws(() => {
        new Field("record_date").isValid();
    }, Error, "Method isValid() must be implemented");

    assert.throws(() => {
        new Field("record_date").isValid("test");
    }, Error, "Method isValid() must be implemented");

    assert.throws(() => {
        new Field("avg_interest_rate_amt").format();
    }, Error, "Method format() must be implemented");

    assert.throws(() => {
       new Field("avg_interest_rate_amt").format("test");
    }, Error, "Method format() must be implemented");
});

test("Field ToString",(testObject) => {
    let a = new Field("record_date");
    assert.strictEqual(a.toString(), "Field Name: record_date\nField Display Name: Record Date");

    let b = new Field("avg_interest_rate_amt");
    assert.strictEqual(b.toString(), "Field Name: avg_interest_rate_amt\nField Display Name: Average Interest Rate Amount");

    let c = new Field("record_date");
    assert.notStrictEqual(c.toString(), "Field Name: record date\nField Display Name: Record-Date");
});
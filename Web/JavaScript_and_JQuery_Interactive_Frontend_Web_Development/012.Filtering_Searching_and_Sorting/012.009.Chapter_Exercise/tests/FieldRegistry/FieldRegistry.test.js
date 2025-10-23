import FieldRegistry from '../../src/FieldRegistry.js';
import { DateField, IntegerField, FloatField, StringField, DayField, YearField, MonthField, QuarterField } from '../../src/Field.js';
import test from "node:test";
import assert from "node:assert";

test("FieldRegistry Constructor", async (testObject) => {

    await testObject.test("Invalid Arguments", () => {
        assert.throws(() => {
           new FieldRegistry("a");
        }, Error, "FieldRegistry should fail if first argument is not a boolean");

        assert.throws(() => {
            new FieldRegistry(1.0);
        }, Error, "FieldRegistry should fail if first argument is not a boolean");

        assert.throws(() => {
           new FieldRegistry("a", "a");
        }, Error, "FieldRegistry should fail if both arguments are not a boolean");

        assert.throws(() => {
           new FieldRegistry(1.0, 1.0);
        }, Error, "FieldRegistry should fail if both arguments are not a boolean");
    });

    await testObject.test("Valid Arguments", () => {
        assert.doesNotThrow(() => {
            new FieldRegistry()
        }, Error, "FieldRegistry should not fail if no arguments are passed");

        assert.doesNotThrow(() => {
            new FieldRegistry(true);
        }, Error, "FieldRegistry should not fail if only one argument is passed");

        assert.doesNotThrow(() => {
            new FieldRegistry(true, true);
        }, Error, "FieldRegistry should not fail if both arguments are passed");

        assert.doesNotThrow(() => {
            new FieldRegistry(true, false);
        }, Error, "FieldRegistry should not fail if both arguments are passed");

        assert.doesNotThrow(() => {
            new FieldRegistry(false, true);
        }, Error, "FieldRegistry should not fail if both arguments are passed");

        assert.doesNotThrow(() => {
            new FieldRegistry(false, false);
        }, Error, "FieldRegistry should not fail if both arguments are passed");
    });

    await testObject.test("Testing Singleton", () => {
        let a = new FieldRegistry();
        let b = new FieldRegistry();
        assert.strictEqual(a, b);

        let c = new FieldRegistry();
        let d = new FieldRegistry();
        assert.strictEqual(a, c);
        assert.strictEqual(b, d);
        assert.strictEqual(a, d);
        assert.strictEqual(b, c);
        assert.strictEqual(c, d);

        let e = new FieldRegistry(true);
        assert.notStrictEqual(a, e);
        assert.notStrictEqual(b, e);
        assert.notStrictEqual(c, e);
        assert.notStrictEqual(d, e);

        let f = new FieldRegistry();
        assert.notStrictEqual(a, f);
        assert.notStrictEqual(b, f);
        assert.notStrictEqual(c, f);
        assert.notStrictEqual(d, f);
        assert.strictEqual(e, f);

        let g = new FieldRegistry(true);
        let h = new FieldRegistry(true);
        assert.notStrictEqual(g, h);

        let i = new FieldRegistry(false);
        let j = new FieldRegistry(false);
        assert.strictEqual(i, j);
        assert.strictEqual(h, i);
        assert.strictEqual(h, j);
        assert.notStrictEqual(g, i);
        assert.notStrictEqual(g, j);
    });
});

test("FieldRegistry Static Methods", async (testObject) => {
    await testObject.test("getFilterOperators()", () => {
        let filters = FieldRegistry.getFilterOperators();

        assert.throws(() => {
            filters.push("test");
        }, Error, "Filters should not be able to be modified");

        assert.throws(() => {
            filters[0] = "test";
        }, Error, "Filters should not be able to be modified");

        assert.throws(() => {
            delete filters[0];
        }, Error, "Filters should not be able to be modified");

        assert.strictEqual(filters.length, 6);
        assert.strictEqual(filters.join(','), ["lt", "lte", "gt", "gte", "eq", "in"].join(','));
    });

    await testObject.test("getSortOperators()", () => {
       let sorts = FieldRegistry.getSortOperators();

        assert.throws(() => {
            sorts.push("test");
        }, Error, "Filters should not be able to be modified");

        assert.throws(() => {
            sorts[0] = "test";
        }, Error, "Filters should not be able to be modified");

        assert.throws(() => {
            delete sorts[0];
        }, Error, "Filters should not be able to be modified");

        assert.strictEqual(sorts.length, 2);
        assert.strictEqual(sorts[0], "asc");
        assert.strictEqual(sorts[1], "desc");
    });

    await testObject.test("getFieldNames()", () => {
        let fieldNames = FieldRegistry.getFieldNames();

        assert.throws(() => {
            fieldNames.delete("test");
        }, Error, "FieldNames map should not be able to be modified");

        assert.throws(() => {
            fieldNames.set("test", "test");
        }, Error, "FieldNames map should not be able to be modified");

        assert.throws(() => {
            fieldNames.clear();
        }, Error, "FieldNames map should not be able to be modified");

        assert.strictEqual(fieldNames.size, 11);
        assert.strictEqual(fieldNames.get("record_date"), "Record Date");
        assert.strictEqual(fieldNames.get("security_type_desc"), "Security Type Description");
        assert.strictEqual(fieldNames.get("security_desc"), "Security Description");
        assert.strictEqual(fieldNames.get("avg_interest_rate_amt"), "Average Interest Rate Amount");
        assert.strictEqual(fieldNames.get("src_line_nbr"), "Source Line Number");
        assert.strictEqual(fieldNames.get("record_fiscal_year"), "Fiscal Year");
        assert.strictEqual(fieldNames.get("record_fiscal_quarter"), "Fiscal Quarter Number");
        assert.strictEqual(fieldNames.get("record_calendar_year"), "Calendar Year");
        assert.strictEqual(fieldNames.get("record_calendar_quarter"), "Calendar Quarter Number");
        assert.strictEqual(fieldNames.get("record_calendar_month"), "Calendar Month Number");
        assert.strictEqual(fieldNames.get("record_calendar_day"), "Calendar Day Number");
    });
});

test("FieldRegistry Init of Fields", (testObject) => {
    let fieldRegistry = new FieldRegistry();
    fieldRegistry.initAllFields();
    assert.strictEqual(fieldRegistry.getRegistrySize(), 11);

    let registry = fieldRegistry.getRegistry();
    assert.strictEqual(registry.size, 11);
    assert.strictEqual(registry.get("record_date").getDisplayName(), "Record Date");
    assert.strictEqual(registry.get("security_type_desc").getDisplayName(), "Security Type Description");
    assert.strictEqual(registry.get("security_desc").getDisplayName(), "Security Description");
    assert.strictEqual(registry.get("avg_interest_rate_amt").getDisplayName(), "Average Interest Rate Amount");
    assert.strictEqual(registry.get("src_line_nbr").getDisplayName(), "Source Line Number");
    assert.strictEqual(registry.get("record_fiscal_year").getDisplayName(), "Fiscal Year");
    assert.strictEqual(registry.get("record_fiscal_quarter").getDisplayName(), "Fiscal Quarter Number");
    assert.strictEqual(registry.get("record_calendar_year").getDisplayName(), "Calendar Year");
    assert.strictEqual(registry.get("record_calendar_quarter").getDisplayName(), "Calendar Quarter Number");
    assert.strictEqual(registry.get("record_calendar_month").getDisplayName(), "Calendar Month Number");
    assert.strictEqual(registry.get("record_calendar_day").getDisplayName(), "Calendar Day Number");

    assert.strictEqual(registry.get("record_date") instanceof DateField, true);
    assert.strictEqual(registry.get("security_type_desc") instanceof StringField, true);
    assert.strictEqual(registry.get("security_desc") instanceof StringField, true);
    assert.strictEqual(registry.get("avg_interest_rate_amt") instanceof FloatField, true);
    assert.strictEqual(registry.get("src_line_nbr") instanceof IntegerField, true);
    assert.strictEqual(registry.get("record_fiscal_year") instanceof YearField, true);
    assert.strictEqual(registry.get("record_fiscal_quarter") instanceof QuarterField, true);
    assert.strictEqual(registry.get("record_calendar_year") instanceof YearField, true);
    assert.strictEqual(registry.get("record_calendar_quarter") instanceof QuarterField, true);
    assert.strictEqual(registry.get("record_calendar_month") instanceof MonthField, true);
    assert.strictEqual(registry.get("record_calendar_day") instanceof DayField, true);

    assert.strictEqual(registry.get("test"), undefined);
    assert.strictEqual(registry.get(1), undefined);

    let fieldRegistry2 = new FieldRegistry();

    assert.strictEqual(fieldRegistry, fieldRegistry2);
    assert.strictEqual(fieldRegistry.getRegistrySize(), fieldRegistry2.getRegistrySize());
    assert.strictEqual(fieldRegistry.getRegistry().size, fieldRegistry2.getRegistry().size);

    assert.strictEqual(fieldRegistry2.getRegisteredField("record_date").getDisplayName(), "Record Date");
    assert.strictEqual(fieldRegistry2.getRegisteredField("security_type_desc").getDisplayName(), "Security Type Description");
    assert.strictEqual(fieldRegistry2.getRegisteredField("security_desc").getDisplayName(), "Security Description");
    assert.strictEqual(fieldRegistry2.getRegisteredField("avg_interest_rate_amt").getDisplayName(), "Average Interest Rate Amount");
    assert.strictEqual(fieldRegistry2.getRegisteredField("src_line_nbr").getDisplayName(), "Source Line Number");
    assert.strictEqual(fieldRegistry2.getRegisteredField("record_fiscal_year").getDisplayName(), "Fiscal Year");
    assert.strictEqual(fieldRegistry2.getRegisteredField("record_fiscal_quarter").getDisplayName(), "Fiscal Quarter Number");
    assert.strictEqual(fieldRegistry2.getRegisteredField("record_calendar_year").getDisplayName(), "Calendar Year");
    assert.strictEqual(fieldRegistry2.getRegisteredField("record_calendar_quarter").getDisplayName(), "Calendar Quarter Number");
    assert.strictEqual(fieldRegistry2.getRegisteredField("record_calendar_month").getDisplayName(), "Calendar Month Number");
    assert.strictEqual(fieldRegistry2.getRegisteredField("record_calendar_day").getDisplayName(), "Calendar Day Number");

    assert.strictEqual(fieldRegistry2.getRegisteredField("record_date") instanceof DateField, true);
    assert.strictEqual(fieldRegistry2.getRegisteredField("security_type_desc") instanceof StringField, true);
    assert.strictEqual(fieldRegistry2.getRegisteredField("security_desc") instanceof StringField, true);
    assert.strictEqual(fieldRegistry2.getRegisteredField("avg_interest_rate_amt") instanceof FloatField, true);
    assert.strictEqual(fieldRegistry2.getRegisteredField("src_line_nbr") instanceof IntegerField, true);
    assert.strictEqual(fieldRegistry2.getRegisteredField("record_fiscal_year") instanceof YearField, true);
    assert.strictEqual(fieldRegistry2.getRegisteredField("record_fiscal_quarter") instanceof QuarterField, true);
    assert.strictEqual(fieldRegistry2.getRegisteredField("record_calendar_year") instanceof YearField, true);
    assert.strictEqual(fieldRegistry2.getRegisteredField("record_calendar_quarter") instanceof QuarterField, true);
    assert.strictEqual(fieldRegistry2.getRegisteredField("record_calendar_month") instanceof MonthField, true);
    assert.strictEqual(fieldRegistry2.getRegisteredField("record_calendar_day") instanceof DayField, true);

    assert.throws(() => {
        fieldRegistry2.getRegisteredField("test");
    }, Error, "If field name is not found or valid, an error should be thrown in getRegisteredField()");

    assert.throws(() => {
       fieldRegistry2.getRegisteredField(1.0);
    }, Error, "If field name is not found or valid, an error should be thrown in getRegisteredField()");
});

test("FieldRegistry Register Field & Deregister Field", async (testObject) => {

    await testObject.test("Invalid Arguments For Register", () => {
        assert.throws(() => {
            new FieldRegistry().registerField("");
        }, Error, "RegisterField should fail if first argument is an empty string");

        assert.throws(() => {
            new FieldRegistry().registerField("test");
        }, Error, "RegisterField must fail if first argument is not a valid field name");

        assert.throws(() => {
           new FieldRegistry().registerField(1.0);
        }, Error, "RegisterField must fail if the first argument is not a string");
    });

    await testObject.test("Valid Arguments For Register", () => {
       assert.doesNotThrow(() => {
           new FieldRegistry().registerField("record_date");
       }, Error, "RegisterField must not fail if first argument is a valid field name");

       assert.doesNotThrow(() => {
           new FieldRegistry().registerField("security_type_desc");
       }, Error, "RegisterField must not fail if first argument is a valid field name");

       assert.doesNotThrow(() => {
           new FieldRegistry().registerField("security_desc");
       }, Error, "RegisterField must not fail if first argument is a valid field name");
    });

    await testObject.test("Invalid Arguments For Deregister", () => {
        assert.throws(() => {
            new FieldRegistry().deregisterField("");
        }, Error, "DeregisterField should fail if first argument is an empty string");

        assert.throws(() => {
            new FieldRegistry().deregisterField("test");
        }, Error, "DeregisterField must fail if first argument is not a valid field name");

        assert.throws(() => {
           new FieldRegistry().deregisterField(1.0);
        }, Error, "DeregisterField must fail if the first argument is not a string");
    });

    await testObject.test("Valid Arguments For Deregister", () => {
       assert.doesNotThrow(() => {
           new FieldRegistry().deregisterField("record_date");
       }, Error, "DeregisterField must not fail if first argument is a valid field name");
    });

    await testObject.test("Registering Fields", () => {
        let fieldRegistry = new FieldRegistry(true);
        fieldRegistry.registerField("record_date");

        let registry = fieldRegistry.getRegistry();
        assert.strictEqual(registry.size, 1);
        assert.strictEqual(registry.get("record_date").getDisplayName(), "Record Date");
        assert.strictEqual(registry.get("record_date") instanceof DateField, true);

        fieldRegistry.registerField("record_date");
        assert.strictEqual(registry.size, 1);

        let fieldRegistry2 = new FieldRegistry();
        fieldRegistry2.registerField("security_type_desc");
        assert.strictEqual(fieldRegistry.getRegistrySize(), 2);
        registry = fieldRegistry.getRegistry();

        assert.strictEqual(registry.size, 2);
        assert.strictEqual(registry.get("security_type_desc").getDisplayName(), "Security Type Description");
        assert.strictEqual(registry.get("security_type_desc") instanceof StringField, true);

        let registeredField = fieldRegistry.getRegisteredField("security_type_desc");
        assert.strictEqual(registeredField.getDisplayName(), "Security Type Description");
        assert.strictEqual(registeredField instanceof StringField, true);

        let nullField = fieldRegistry.getRegisteredField("record_fiscal_year");
        assert.strictEqual(nullField, null);

        let fieldRegistry3 = new FieldRegistry(true);
        fieldRegistry3.registerField("record_fiscal_year");
        assert.strictEqual(fieldRegistry3.getRegistrySize(), 1);
        let registry2 = fieldRegistry3.getRegistry();
        assert.strictEqual(registry2.size, 1);
        assert.strictEqual(registry2.get("record_fiscal_year").getDisplayName(), "Fiscal Year");
        assert.strictEqual(registry2.get("record_fiscal_year") instanceof YearField, true);

        assert(fieldRegistry.getRegistrySize() === fieldRegistry2.getRegistrySize());
        assert(fieldRegistry.getRegistry().size !== fieldRegistry3.getRegistry().size);
    });

    await testObject.test("Deregistering Fields", () => {
       let fieldRegistry = new FieldRegistry(true);
       fieldRegistry.registerField("record_date");
       fieldRegistry.registerField("security_type_desc");

       assert.strictEqual(fieldRegistry.getRegistrySize(), 2);
       let recordDateField = fieldRegistry.getRegisteredField("record_date");

       assert.strictEqual(recordDateField.getDisplayName(), "Record Date");
       assert.strictEqual(recordDateField instanceof DateField, true);

       fieldRegistry.deregisterField("record_date");
       assert.strictEqual(fieldRegistry.getRegistrySize(), 1);
       let securityTypeField = fieldRegistry.getRegisteredField("security_type_desc");
       assert.strictEqual(securityTypeField.getDisplayName(), "Security Type Description");
       assert.strictEqual(securityTypeField instanceof StringField, true);

       assert.strictEqual(fieldRegistry.deregisterField("record_date"), false);

       fieldRegistry.deregisterField("security_type_desc");
       assert.strictEqual(fieldRegistry.getRegistrySize(), 0);
       assert.strictEqual(fieldRegistry.deregisterField("security_type_desc"), false);

       let registry = fieldRegistry.getRegistry();
       assert.strictEqual(registry.size, 0);
    });
});

test("Helper Functions", () => {
   let fieldRegistry = new FieldRegistry(true);
   fieldRegistry.initAllFields();
   assert.strictEqual(fieldRegistry.getRegistrySize(), 11);
   assert.strictEqual(fieldRegistry.getRegistry().size, 11);

   fieldRegistry.clearRegistry();
   assert.strictEqual(fieldRegistry.getRegistrySize(), 0);
   assert.strictEqual(fieldRegistry.getRegistry().size, 0);

   assert.strictEqual(fieldRegistry.isDebugMode(), false);

   let fieldRegistry2 = new FieldRegistry(false, true);
   assert.strictEqual(fieldRegistry2.isDebugMode(), false);

   let fieldRegistry3 = new FieldRegistry(true, true);
   assert.strictEqual(fieldRegistry3.isDebugMode(), true);
});
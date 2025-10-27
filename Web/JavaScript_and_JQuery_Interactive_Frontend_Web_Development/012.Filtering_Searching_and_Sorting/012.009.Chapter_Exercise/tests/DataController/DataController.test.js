import test from "node:test";
import assert from "node:assert";
import DataController from "../../src/DataController.js";

test("DataController addSort() Method", async (testObject) => {
    let dataController = new DataController();

    assert.doesNotThrow(() => {
        dataController.addSorting("record_date", "desc")
            .then((data) => {
                assert.strictEqual(data.length, 50);
            });
    });

    dataController.fetchData()
        .then((data) => {
            assert.strictEqual(data.length, 50);
        });
});
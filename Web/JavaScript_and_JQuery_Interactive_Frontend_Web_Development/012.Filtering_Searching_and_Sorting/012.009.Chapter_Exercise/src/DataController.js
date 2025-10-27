import FieldRegistry from "./FieldRegistry.js";
import APIClient from "./APIClient.js";
import Row from "./Row.js"
import {isEmptyString, isNumber} from "./utils.js";

class DataController {
    #apiClient;
    #fieldRegistry;
    #debugMode;

    constructor(debugMode = false) {
        this.#apiClient = new APIClient(debugMode);
        this.#fieldRegistry = new FieldRegistry(true);
        this.#fieldRegistry.initAllFields();
        this.#debugMode = debugMode;
    }

    async fetchData() {
        try {
            const data = await this.#apiClient.fetchData(); // Wait for the data to resolve
            return this.#organizeData(data); // Organize data after fetching
        } catch (error) {
            console.log(error);
            return null; // Return null in case of error
        }
    }

    async addSorting(fieldName, order) {
        if (isEmptyString(fieldName) || isEmptyString(order) ) {
            throw new Error("Field name and order must be non-empty strings.");
        }

        if (!FieldRegistry.getFieldNames().has(fieldName)) {
            throw new Error(`Field name ${fieldName} is not valid.`);
        }

        if (!FieldRegistry.getSortOperators().includes(order) && order !== "delete") {
            throw new Error(`Order ${order} is not valid.`);
        }

        const field = this.#fieldRegistry.getRegisteredField(fieldName);

        if (order === "delete") {
            this.#apiClient.removeSorting(field);
        } else {
            this.#apiClient.addSorting(field, order);
        }

        return this.fetchData();
    }

    async addFilter(fieldName, operator, value) {
        console.log(fieldName, operator, value);

        if (isEmptyString(fieldName) || isEmptyString(operator) || (!isNumber(value) && isEmptyString(value) && !Array.isArray(value))) {
            throw new Error("Field name, operator, and value must be non-empty strings.");
        }

        if (!FieldRegistry.getFieldNames().has(fieldName)) {
            throw new Error(`Field name ${fieldName} is not valid.`);
        }

        if (!FieldRegistry.getFilterOperators().includes(operator)) {
            throw new Error(`Operator ${operator} is not valid.`);
        }

        if (operator === "in" && !Array.isArray(value)) {
            throw new Error("Value must be an array with the \"in\" operator.");
        }

        const field = this.#fieldRegistry.getRegisteredField(fieldName);
        console.log("Adding filter: ", fieldName, " ", operator, " ", value)
        this.#apiClient.addFilter(field, operator, value);
        return this.fetchData();
    }

    getSort(fieldName) {
        if (isEmptyString(fieldName)) {
            throw new Error("Field name must be non-empty string.");
        }

        if (!FieldRegistry.getFieldNames().has(fieldName)) {
            throw new Error(`Field name ${fieldName} is not valid.`);
        }

        const sortMap = this.#apiClient.getSortingMap();

        if (sortMap.has(fieldName)) {
            return `${fieldName}:${sortMap.get(fieldName)}`;
        }
        else {
            return "";
        }
    }

    deleteSorting(fieldName) {
        if (isEmptyString(fieldName)) {
            throw new Error("Field name must be non-empty string.");
        }

        if (!FieldRegistry.getFieldNames().has(fieldName)) {
            throw new Error(`Field name ${fieldName} is not valid.`);
        }

        const field = this.#fieldRegistry.getRegisteredField(fieldName);
        this.#apiClient.removeSorting(field);
        return this.fetchData();
    }

    deleteFilter(fieldName, operator) {
        if (isEmptyString(fieldName) || isEmptyString(operator)) {
            throw new Error("Field name and operator must be non-empty strings.");
        }

        if (!FieldRegistry.getFieldNames().has(fieldName)) {
            throw new Error(`Field name ${fieldName} is not valid.`);
        }

        const field = this.#fieldRegistry.getRegisteredField(fieldName);
        this.#apiClient.removeFilter(field, operator);
        return this.fetchData();
    }

    getPageNumber() {
        return this.#apiClient.getPageNumber();
    }

    async getPageNumbers() {
        try {
            const data = await this.#apiClient.fetchData();
            if (!("meta" in data) || !("total-count" in data.meta) || !("total-pages" in data.meta)
                || !("count" in data.meta)) {
                console.log("meta, total-count, total-pages, count not found in data");
                return 0;
            }

            if (data.meta["total-count"] === 0) {
                console.log("total-count is 0");
                return [0, 0, 0, 0, 0];
            }

            return [1, this.getPageNumber(), data.meta["total-pages"], data.meta["total-count"], data.meta["count"]];
        } catch (error) {
            console.log(error);
            return [0, 0, 0, 0, 0];
        }
    }

    getPageSize() {
        return this.#apiClient.getPageSize();
    }

    getSortingMap() {
        return this.#apiClient.getSortingMap();
    }

    getFilterMap() {
        return this.#apiClient.getFiltersMap();
    }

    getSortingArray() {
        return this.#apiClient.getSorting().split(",");
    }

    getFilterArray() {
        return this.#apiClient.getFilters(" | ").split(",");
    }

    setPageNumberFetch(pageNumber) {
        this.setPageNumber(pageNumber);
        return this.fetchData();
    }

    setPageNumber(pageNumber) {
        if (!Number.isInteger(pageNumber) || pageNumber <= 0) {
            throw new Error("Page number must be an integer greater than 0.");
        }

        this.#apiClient.setPageNumber(pageNumber);
        return this;
    }

    setPageSize(pageSize) {
        if (!Number.isInteger(pageSize) || pageSize <= 0) {
            throw new Error("Page size must be an integer greater than 0.");
        }

        this.#apiClient.setPageSize(pageSize);
        return this;
    }

    setPageSizeFetch(pageSize) {
        if (!Number.isInteger(pageSize) || pageSize <= 0) {
            throw new Error("Page size must be an integer greater than 0.");
        }

        this.setPageSize(pageSize);
        return this.fetchData();
    }


    #organizeData(jsonData) {
        if (!("data" in jsonData)) {
            return null
        }

       const data = [];

        for(const singleData of jsonData.data) {
            const record_date = singleData["record_date"].split("-");
            const displayRow = new Row(
                `${record_date[1]}-${record_date[2]}-${record_date[0]}`,
                singleData["security_type_desc"],
                singleData["security_desc"],
                singleData["avg_interest_rate_amt"],
                singleData["src_line_nbr"],
                singleData["record_fiscal_year"],
                singleData["record_fiscal_quarter"],
                singleData["record_calendar_year"],
                singleData["record_calendar_quarter"],
                singleData["record_calendar_month"],
                singleData["record_calendar_day"],
            );

            data.push(displayRow);
        }

        return data;
    }
}

export default DataController;

import {isEmptyString, isNumber, extractLowercaseString, getDecimalLength} from "./utils.js";
import FieldRegistry from "./FieldRegistry.js";

/**
 * Base class representing a data field with validation and formatting methods
 * @class
 */
class Field {
    /**
     * The name of the field
     * @type {string}
     */
    #name = "";

    /**
     * The display name (human-readable) of the field
     * @type {string}
     */
    #displayName = "";

    /**
     * Creates a new Field instance
     * @param {string} name - The name of the field
     * @throws {Error} If the field name is invalid or not found in FIELD_NAMES
     */
    constructor(name) {
        const normalizedName = extractLowercaseString(name);

        if (isEmptyString(name) || !FieldRegistry.getFieldNames().has(normalizedName)) {
            throw new Error("Field name is invalid.");
        }

        // Name must always be lowercase
        this.#name = normalizedName;
        this.#displayName = FieldRegistry.getFieldNames().get(this.#name);
    }

    /**
     * Gets the name of the field
     * @returns {string} The name of the field (always lowercase)
     */
    getName() {
        return this.#name;
    }

    /**
     * Gets the human-readable display name of the field
     * @returns {string} The display name of the field
     */
    getDisplayName() {
        return this.#displayName;
    }

    /**
     * Validates a value for this field
     * Value must always be a string
     * @param {string} value - The value to validate
     * @returns {boolean} True if the value is valid, false otherwise
     * @abstract
     * @throws {Error} If the method is not implemented in a child class
     */
    isValid(value) {
        throw new Error("Method not implemented.");
    }

    /**
     * Formats a value for this field
     * If the format fails the original value is returned
     * Idea is for the value to be formatted and then validated
     * Value returned is always a string
     * @param {string | number} value - The value to format
     * @returns {string} The formatted value or original value if formatting fails
     * @abstract
     * @throws {Error} If the method is not implemented in a child class
     */
    format(value) {
        throw new Error("Method not implemented.");
    }

    /**
     * Converts the field to a string representation
     * @override
     * @returns {string}
     */
    toString() {
        return `Field Name: ${this.#name}\nField Display Name: ${this.#displayName}`;
    }
}

/**
 * Field class for date fields
 * This field class needs dates in the format of YYYY-MM-DD.
 * The field class can use the format function to format any date into the desired format.
 * @class
 * @extends {Field}
 */
class DateField extends Field {

    /**
     * Creates a new DateField instance
     * @param {string} name - The field name
     */
    constructor(name) {
        super(name);
    }

    /**
     * Validates the date is an actual valid date and follows the format of YYYY-MM-DD.
     * Ensures the date is valid and matches the original date.
     * Format must be YYYY-MM-DD.
     * @override
     * @param {string} value - The date value to validate
     * @returns {boolean} True if the date is valid, false otherwise
     */
    isValid(value) {
        if (!isEmptyString(value) && value.match(/^\d{4}-\d{2}-\d{2}$/) !== null) {
            const date = new Date(value);

            if (date.toString() === "Invalid Date") {
                return false;
            }

            const year = date.getUTCFullYear();
            const month = date.getUTCMonth() + 1;
            const day = date.getUTCDate();

            const [originalYear, originalMonth, originalDay] = value.split("-").map(Number)

            return year === originalYear && month === originalMonth && day === originalDay;
        }

        return false;
    }

    /**
     * Formats a date string in the format of YYYY-MM-DD.
     * The date string can be in any format, but the output will always be in YYYY-MM-DD.
     * If the value is not a string, then it returns an empty string.
     * If the value is not a valid date, then it returns an empty string.
     * @override
     * @param {string} value - The date value to format
     * @returns {string} The formatted date value
     */
    format(value) {
        if (isEmptyString(value)) {
            return "";
        }

        const date = new Date(value);

        if (date.toString() === "Invalid Date") {
            return "";
        }

        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();

        return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
    }
}

/**
 * Field class for string fields
 * This field class can handle any string value.
 * @class
 * @extends {Field}
 */
class StringField extends Field {
    /**
     * Creates a new StringField instance
     * @param {string} name - The field name
     */
    constructor(name) {
        super(name);
    }

    /**
     * Validates a string value by ensuring the string is not empty.
     * @override
     * @param {string} value - The string value to validate
     * @returns {boolean} True if the string is not empty, false otherwise
     */
    isValid(value) {
        return !isEmptyString(value);
    }

    /**
     * No formatting rules.
     * Simply returns the original string value if the value is a valid string.
     * If it is not a string, then it returns an empty string.
     * @override
     * @param {string} value - The string value to format
     * @returns {string} The original string value
     */
    format(value) {
        if (isEmptyString(value)) {
            return "";
        }

        return value;
    }
}

/**
 * Field class for floating point precision fields
 * This field class can handle numeric values with a specified number of decimals.
 * The number of decimals can be specified in the constructor of the class.
 * A flag can be set if the number of decimals is required
 * The value of the format method must return a string because if the number of decimals is required, padding may be required.
 * @class
 * @extends {Field}
 */
class FloatField extends Field {
    /**
     * Minimum value for the field.
     * @type {number}
     */
    #minValue = 0;

    /**
     * Maximum number of decimals for the field.
     * @type {number}
     */
    #precision;

    /**
     * Flag indicating whether the number of decimals is required.
     * @type {boolean}
     */
    #precisionRequired;

    /**
     * Creates a new FloatField instance.
     * @param {string} name - The field name.
     * @param {number} precision - The number of decimals for the field: default value is 3.
     * @param {boolean} precisionRequired - Flag indicating whether the number of decimals is required: default value is true.
     */
    constructor(name, precision = 3, precisionRequired = true) {
        super(name);

        if (!Number.isInteger(precision) || precision < 0) {
            throw new Error("Precision must be a non-negative integer.");
        }

        if (typeof precisionRequired !== "boolean") {
            throw new Error("precisionRequired must be a boolean.");
        }

        this.#precision = precision;
        this.#precisionRequired = precisionRequired;
    }

    /**
     * Validates a string value by ensuring it is not empty, is a number, and is greater than or equal to the minimum value.
     * If the number of decimals is required, the value is also validated to ensure it has the specified number of decimals.
     * @param {string} value
     * @returns {boolean}
     */
    isValid(value) {
        if (isEmptyString(value) || isNaN(Number(value)) || Number(value) < this.#minValue) {
            return false;
        }

        if (!this.#precisionRequired)
            return true;

        return getDecimalLength(value) === this.#precision;
    }

    /**
     * Formats a numeric value by rounding it to the specified number of decimals.
     * If the number of decimals is required, the value is rounded to the specified number of decimals.
     * Otherwise, if the number of decimals is not required, the value is returned as is.
     * If the value is not a number, an empty string is returned.
     * Validation is not performed here, but in the isValid method.
     * @param {number} value
     * @returns {string}
     */
    format(value) {
        if (!isNumber(value)) {
            return "";
        }
        else if (!this.#precisionRequired) {
            return value.toString();
        }

        return value.toFixed(this.#precision);
    }

    /**
     * Gets the number of decimals for the field.
     * @returns {number} The number of decimals for the field.
     */
    getPrecision() {
        return this.#precision;
    }

    /**
     * Gets a flag indicating whether the number of decimals is required.
     * @returns {boolean} True if the number of decimals is required, false otherwise.
     */
    isPrecisionRequired() {
        return this.#precisionRequired;
    }
}

/**
 * Field class for integer fields
 * This field class can handle only numeric values with no decimals.
 * The format method will return a string to keep consistency with the rest of the fields.
 * @class
 * @extends {Field}
 */
class IntegerField extends Field {
    /**
     * Minimum value for the field.
     * @type {number}
     */
    #minValue = 0;

    /**
     * Creates a new IntegerField instance.
     * @param {string} name - The field name.
     */
    constructor(name) {
        super(name);
    }

    /**
     * Validates a string value by ensuring it is a number, and it is greater than or equal to the minimum value.
     * Also ensures the value does not have any decimals.
     * If it is not a number, then it is considered invalid.
     * @param {string} value
     * @returns {boolean}
     */
    isValid(value) {
        if (isEmptyString(value) || isNaN(Number(value)) || Number(value) < this.#minValue) {
            return false;
        }

        return getDecimalLength(value) === 0;
    }

    /**
     * Formats a numeric value by removing any decimals.
     * If the value is not a number, an empty string is returned.
     * The returned value is always a string.
     * Validation is not performed here, but in the isValid method.
     * @param {number} value
     * @returns {string}
     */
    format(value) {
        if (!isNumber(value)) {
            return "";
        }

        return Math.trunc(value).toString();
    }
}

/**
 * Field class for year fields
 * This field class can handle only numeric values with no decimals and a maximum of 4 digits.
 * The format method will return a string to keep consistency with the rest of the fields.
 * This takes into account a regular year and a fiscal year
 * @class
 * @extends {IntegerField}
 */
class YearField extends IntegerField {
    /**
     * Minimum year for the field.
     * @type {number}
     */
    #minYear = 2000;

    /**
     * Creates a new YearField instance.
     * @param {string} name - The field name.
     */
    constructor(name) {
        super(name);
    }

    /**
     * Validates a string value by ensuring it is a number, and it is greater than or equal to the minimum year but less than or equal to the current year.
     * Also ensures the value does not have any decimals and is a valid 4-digit year.
     * If it is not a string number, then it is considered invalid.
     * Since we do not know if this field is being used as a regular year or a fiscal year, we will always assume a fiscal year is being used.
     * If the current month is after September, then the current year is increased by 1.
     * This is to account for the fact that the federal government's fiscal year runs from October 1 to September 30.
     * E.g., 2025 is the fiscal year from October 1, 2024, to September 30, 2025.
     * @param {string} value
     * @returns {boolean}
     */
    isValid(value) {
        if (isEmptyString(value) || isNaN(Number(value))) {
            return false;
        }

        // The federal government's fiscal year runs from October 1 to September 30
        // E.g., 2025 is the fiscal year for October 1, 2024, to September 30, 2025

        let currentDate = new Date();
        let currentYear = currentDate.getFullYear();

        if (currentDate.getMonth() >= 9) {
            currentYear++;
        }

        return getDecimalLength(value) === 0 && value.length === 4 &&
            Number(value) >= this.#minYear && Number(value) <= currentYear;
    }

    /**
     * Formats a number by checking it is a valid number, then removes any decimals and returns a string.
     * The parent function is called to format the value.
     * This method does not check if the value is valid or a 4-digit string number.
     * To validate the value, use the isValid method.
     * @override
     * @param {number} value
     * @returns {string}
     */
    format(value) {
        return super.format(value);
    }
}

/**
 * Field class for quarter fields
 * This field class can handle only string numeric values with no decimals and a maximum of 1 digit.
 * @class
 * @extends {IntegerField}
 */
class QuarterField extends IntegerField {
    /**
     * Minimum quarter for the field.
     * @type {number}
     */
    #minQuarter = 1;

    /**
     * Maximum quarter for the field.
     * @type {number}
     */
    #maxQuarter = 4;

    /**
     * Creates a new QuarterField instance.
     * @param {string} name - The field name.
     */
    constructor(name) {
        super(name);
    }

    /**
     * Validates a string number value by ensuring it is greater than or equal to the minimum quarter but less than or equal to the maximum quarter.
     * Also ensures the value does not have any decimals and is a valid 1-digit quarter.
     * If it is not a string number, then it is considered invalid.
     * @param {string} value
     * @returns {boolean}
     */
    isValid(value) {
        if (isEmptyString(value) || isNaN(Number(value)) ||
            Number(value) < this.#minQuarter || Number(value) > this.#maxQuarter) {
            return false;
        }

        return getDecimalLength(value) === 0 && value.length === 1;
    }

    /**
     * Formats a number by checking it is a valid number, then removes any decimals and returns a string.
     * The parent function is called to format the value.
     * This method does not check if the value is valid or a single-digit string number.
     * To validate the value, use the isValid method.
     * @override
     * @param {number} value
     * @returns {string}
     */
    format(value) {
        return super.format(value);
    }
}

/**
 * Field class for month fields
 * This field class can handle only string numeric values with no decimals and a maximum of 2 digits.
 * However, since we need every numeric value to be 2 digits, it will be a string value so it can be padded with leading zeros, if needed.
 * @class
 * @extends {IntegerField}
 */
class MonthField extends IntegerField {
    /**
     * Minimum month for the field.
     * @type {number}
     */
    #minMonth = 1;

    /**
     * Maximum month for the field.
     * @type {number}
     */
    #maxMonth = 12;

    /**
     * Creates a new MonthField instance.
     * @param {string} name - The field name.
     */
    constructor(name) {
        super(name);
    }

    /**
     * Validates a string value by ensuring it is not empty, is a number, and is greater than or equal to the minimum month but less than or equal to the maximum month.
     * Also ensures the value does not have any decimals and is a valid 2-digit month.
     * If it is not a number, then it is considered invalid.
     * @param {string} value
     * @returns {boolean}
     */
    isValid(value) {
        if (isEmptyString(value) || isNaN(Number(value)) ||
            Number(value) < this.#minMonth || Number(value) > this.#maxMonth) {
            return false;
        }

        return getDecimalLength(value) === 0 && value.length === 2;
    }

    /**
     * Formats a numeric value by removing any decimals and making it a 2-digit string.
     * If the value is not a number, an empty string is returned.
     * The returned value is always a string.
     * Validation is not performed here, but in the isValid method.
     * @param {number} value
     * @returns {string}
     */
    format(value) {
        if (!isNumber(value)) {
            return "";
        }

        return Math.trunc(value).toString().padStart(2, "0");
    }
}

/**
 * Field class for day fields
 * This field class can handle only string numeric values with no decimals and a maximum of 2 digits.
 * However, since we need every numeric value to be 2 digits, it will be a string value so it can be padded with leading zeros, if needed.
 * @class
 * @extends {IntegerField}
 */
class DayField extends IntegerField {
    /**
     * Minimum day for the field.
     * @type {number}
     */
    #minDay = 1;

    /**
     * Maximum day for the field.
     * @type {number}
     */
    #maxDay = 31;

    /**
     * Creates a new DayField instance.
     * @param {string} name - The field name.
     */
    constructor(name) {
        super(name);
    }

    /**
     * Validates a string numeric value by ensuring it is not empty, is a number, and is greater than or equal to the minimum day but less than or equal to the maximum day.
     * Also ensures the value does not have any decimals and is always a valid 2-digit day.
     * If it is not a number, then it is considered invalid.
     * @param {string} value
     * @returns {boolean}
     */
    isValid(value) {
        if (isEmptyString(value) || isNaN(Number(value)) ||
            Number(value) < this.#minDay || Number(value) > this.#maxDay) {
            return false;
        }

        return getDecimalLength(value) === 0 && value.length === 2;
    }

    /**
     * Formats a numeric value by removing any decimals and making it a 2-digit string (must be 2 digits).
     * If the value is not a number, an empty string is returned.
     * The returned value is always a string.
     * Validation is not performed here, but in the isValid method.
     * @param {number} value
     * @returns {string}
     */
    format(value) {
        if (!isNumber(value)) {
            return "";
        }

        return Math.trunc(value).toString().padStart(2, "0");
    }
}

export {Field, DateField, StringField, FloatField, IntegerField, YearField,
        QuarterField, MonthField, DayField};
import {ReadOnlyMap, isEmptyString, extractLowercaseString} from "./utils.js";
import {DateField, StringField, FloatField, IntegerField, YearField, QuarterField, MonthField, DayField} from "./Field.js";

/**
 * Registry for managing field instances.
 * Class can be used to register new fields and get a list of registered fields.
 * Static methods can be used to get the available filter operators, sort operators, and field names.
 * @class
 */
class FieldRegistry {
    /**
     * Singleton instance of the FieldRegistry class.
     * @static
     * @type {FieldRegistry}
     */
    static #singletonInstance;

    /**
     * Available filter operators for API queries.
     * @static
     * @private
     * @type {Readonly<string[]>}
     */
    static #FILTER_OPERATORS = Object.freeze(["lt", "lte", "gt", "gte", "eq", "in"]);

    /**
     * Available sort operators for API queries.
     * @static
     * @private
     * @type {Readonly<string[]>}
     */
    static #SORT_OPERATORS = Object.freeze(["asc", "desc"]);

    /**
     * Available fields, their display names, and their Field instance.
     * Each field is represented as a tuple of [name, display_name, factory].
     * The factory function creates a new instance of the corresponding Field subclass.
     * This can be used to get the field names or field instances.
     * @static
     * @private
     * @type {Readonly<Array<Readonly<[string, string, Function]>>>}
     */
    static #FIELD_DEFS = Object.freeze([
        Object.freeze(["record_date", "Record Date", () => new DateField("record_date")]),
        Object.freeze(["security_type_desc", "Security Type Description", () => new StringField("security_type_desc")]),
        Object.freeze(["security_desc", "Security Description", () => new StringField("security_desc")]),
        Object.freeze(["avg_interest_rate_amt", "Average Interest Rate Amount", () => new FloatField("avg_interest_rate_amt")]),
        Object.freeze(["src_line_nbr", "Source Line Number", () => new IntegerField("src_line_nbr")]),
        Object.freeze(["record_fiscal_year", "Fiscal Year", () => new YearField("record_fiscal_year")]),
        Object.freeze(["record_fiscal_quarter", "Fiscal Quarter Number", () => new QuarterField("record_fiscal_quarter")]),
        Object.freeze(["record_calendar_year", "Calendar Year", () => new YearField("record_calendar_year")]),
        Object.freeze(["record_calendar_quarter", "Calendar Quarter Number", () => new QuarterField("record_calendar_quarter")]),
        Object.freeze(["record_calendar_month", "Calendar Month Number", () => new MonthField("record_calendar_month")]),
        Object.freeze(["record_calendar_day", "Calendar Day Number", () => new DayField("record_calendar_day")])
    ]);

    /**
     * Map of field names to display names.
     * Obtained from the FIELD_DEFS array.
     * @static
     * @private
     * @type {ReadOnlyMap}
     */
    static #FIELD_NAMES = new ReadOnlyMap(new Map(
        FieldRegistry.#FIELD_DEFS.map(([key, label]) => [key, label])
    ));

    /**
     * Map of field names to Field instances.
     * Obtained from the FIELD_DEFS array.
     * This is not static because field subclasses are created when the FieldRegistry is instantiated.
     * @private
     * @type {Readonly<{[name: string]: Function}>}
     */
    #FIELD_FACTORIES = Object.freeze(
        Object.fromEntries(FieldRegistry.#FIELD_DEFS.map(([key, , factory]) => [key, factory]))
    );

    /**
     * Boolean flag to enable debug logging.
     * @type {boolean}
     */
    #debugMode;

    /**
     * Map of field names to Field instances.
     * @private
     * @type {Map<string, Field>}
     */
    #registry = new Map();

    /**
     * Constructor: FieldRegistry is a singleton class.
     * So the constructor checks if the singleton instance already exists.
     * If it does, it returns the existing instance.
     * Otherwise, it creates a new instance and sets the debugMode flag.
     * If needed, the singleton can be reset by setting resetSingleton to true.
     * If resetSingleton is true, the singleton instance is updated to the newly created instance, and the old instance is discarded.
     * If debug is true, then logs will be outputted but if the singleton instance is not replaced, the debug flag used will be from the singleton instances and not the constructor.
     * @param {boolean} resetSingleton - Flag to reset the singleton instance.
     * @param {boolean} debug - Flag to enable debug logging.
     * @returns {FieldRegistry} The singleton instance of FieldRegistry.
     */
    constructor(resetSingleton = false, debug = false) {
        if (typeof resetSingleton !== "boolean" || typeof debug !== "boolean") {
            throw new Error("Invalid arguments. resetSingleton and debug must be boolean.");
        }

        if (debug) {
            console.log(`Creating FieldRegistry instance. Reset Singleton: ${resetSingleton} - Debug Mode: ${debug}`);
        }
        
        if (FieldRegistry.#singletonInstance && !resetSingleton) {
            if (debug) {
                console.log("FieldRegistry already exists. Returning existing FieldRegistry instance. Singleton stays the same.");
            }

            return FieldRegistry.#singletonInstance;
        }

        this.#debugMode = debug;
        FieldRegistry.#singletonInstance = this;

        if (FieldRegistry.#singletonInstance && resetSingleton && debug) {
            console.log("FieldRegistry already exists. Resetting singleton instance. New instance will be created for the singleton and old instance will be discarded.");
        }
    }

    /**
     * Initializes all fields in the registry.
     * It registers all fields defined in the FIELD_DEFS array.
     * Registry should be full after this method is called.
     * @public
     */
    initAllFields() {
        for (const name of FieldRegistry.#FIELD_NAMES.keys()) {
            this.registerField(name);
        }
    }

    /**
     * Registers a new field by name in the registry.
     * Field name must be one of the predefined field names.
     * If the field is already registered, it is skipped.
     * @param {string} name - The name of the field to register.
     * @throws {Error} If the field name is invalid.
     * @throws {Error} If field factory is not found.
     */
    registerField(name) {
        const normalizedName = extractLowercaseString(name);

        if (isEmptyString(name) || !FieldRegistry.#FIELD_NAMES.has(normalizedName)) {
            throw new Error("Field name is invalid.");
        }

        const factory = this.#FIELD_FACTORIES[normalizedName];
        if (!factory) {
            throw new Error("Field factory is not found.");
        }

        if (!this.#registry.has(normalizedName)) {
            this.#registry.set(normalizedName, factory());
        }
    }

    /**
     * Unregisters a field by name from the registry.
     * Field name must be one of the predefined field names.
     * If the field is not registered, it does nothing.
     * @param {string} name - The name of the field to unregister.
     * @throws {Error} If the field name is invalid or not registered.
     * @returns {boolean} True if the field was successfully unregistered, false otherwise.
     */
    deregisterField(name) {
        const normalizedName = extractLowercaseString(name);
        if (isEmptyString(name) || !FieldRegistry.#FIELD_NAMES.has(normalizedName)) {
            throw new Error("Field name is invalid.");
        }

        return this.#registry.delete(normalizedName);
    }

    /**
     * Gets a specific registered field instance by name.
     * Field name must be one of the predefined field names.
     * @param {string} name - The name of the field to get.
     * @throws {Error} If the field name is invalid or empty string
     * @returns {Field} The registered field instance or null if the field is not registered.
     */
    getRegisteredField(name) {
        const normalizedName = extractLowercaseString(name);

        if (isEmptyString(name) || !FieldRegistry.#FIELD_NAMES.has(normalizedName)) {
            throw new Error("Field name is invalid.");
        }

        if (!this.#registry.has(extractLowercaseString(name))) {
            return null;
        }

        return this.#registry.get(normalizedName);
    }

    /**
     * Gets all registered field instances.
     * Note that this is not dynamic, so if a field is registered after this method is called, it will not be included in the returned map.
     * @returns {ReadOnlyMap} A map of field names to field instances.
     */
    getRegistry() {
        return new ReadOnlyMap(this.#registry);
    }

    /**
     * Gets the number of registered fields in the registry.
     * @returns {number} The number of registered fields.
     */
    getRegistrySize() {
        return this.#registry.size;
    }

    /**
     * Clears all registered field instances and the registry becomes empty.
     */
    clearRegistry() {
        this.#registry.clear();
    }

    /**
     * Returns the debug mode flag.
     * @public
     * @returns {boolean}
     */
    isDebugMode() {
        return this.#debugMode;
    }

    /**
     * Gets the available filter operators for this field
     * @static
     * @returns {Readonly<string[]>} Array of filter operators as strings
     */
    static getFilterOperators() {
        return FieldRegistry.#FILTER_OPERATORS;
    }

    /**
     * Gets the available sort operators for this field
     * @static
     * @returns {Readonly<string[]>} Array of sort operators as strings
     */
    static getSortOperators() {
        return FieldRegistry.#SORT_OPERATORS;
    }

    /**
     * Gets the available field names
     * @static
     * @returns {ReadOnlyMap} Map of field names to display names
     */
    static getFieldNames() {
        return FieldRegistry.#FIELD_NAMES;
    }
}

export default FieldRegistry;
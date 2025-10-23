export function isEmptyString(value) {
    return value === null || ((typeof value !== "string" && !(value instanceof String)) || value.toString().trim().length <= 0);
}

export function isNumber(value) {
    return value !== null && typeof value === "number" && !isNaN(value);
}

export function extractLowercaseString(value) {
    if (isEmptyString(value)) {
        return "";
    }

    return value.toString().trim().toLowerCase();
}

export function getDecimalLength(value) {
    if (isEmptyString(value.toString()) || isNaN(Number(value.toString()))) {
        throw new Error("Value is not a number.");
    }

    let decimalLength = 0;
    let decimalPointIndex = value.toString().indexOf(".");
    if (decimalPointIndex !== -1) {
        decimalLength = value.substring(decimalPointIndex + 1).length;
    }

    return decimalLength;
}

export class ReadOnlyMap{
    #map;

    constructor(map) {
        if (!(map instanceof Map)) {
            throw new Error("Argument map is not an instance of class Map.");
        }

        this.#map = map;
    }

    get(key) {
        return this.#map.get(key);
    }

    has(key) {
        return this.#map.has(key);
    }

    forEach(callback, thisArg) {
        return this.#map.forEach(callback, thisArg);
    }

    entries() {
        return this.#map.entries();
    }

    keys() {
        return this.#map.keys();
    }

    values() {
        return this.#map.values();
    }

    get size() {
        return this.#map.size;
    }

    [Symbol.iterator]() {
        return this.#map[Symbol.iterator]();
    }

    // Block mutation methods
    set() {
        throw new Error("Cannot modify ReadOnlyMap");
    }

    delete() {
        throw new Error("Cannot modify ReadOnlyMap");
    }

    clear() {
        throw new Error("Cannot modify ReadOnlyMap");
    }
}

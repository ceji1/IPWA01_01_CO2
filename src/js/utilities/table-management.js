// Initial format for storing table data and its settings.
export const tableStoreFormat = {
    origData: [],    // Array containing the original data before any sorting or filtering.
    viewData: [],    // Array containing data that will be displayed, after applying sorting and/or filtering.
    sortColumn: null, // Specifies the column name to sort by; null indicates no sorting is applied.
    sortDir: null,    // Specifies the direction of sorting ('asc' for ascending, 'desc' for descending); null indicates no sorting.
    filterData: {}    // Object containing filters to be applied to the data.
};

/**
 * Sorts the data in `viewData` based on the specified `sortColumn` and `sortDir`.
 * Sorting is only performed if both `sortColumn` and `sortDir` are not null.
 *
 * @param {Object} data - The data object containing `viewData`, `sortColumn`, and `sortDir`.
 */
function sortData(data) {
    if (data.sortColumn !== null && data.sortDir !== null) {
        let sortColumn = data.sortColumn;
        let sortDir = data.sortDir;

        if (sortDir === 'asc') {
            data.viewData.sort((a, b) => (a[sortColumn] > b[sortColumn]) ? 1 : -1);
        } else if (sortDir === 'desc') {
            data.viewData.sort((a, b) => (a[sortColumn] > b[sortColumn]) ? -1 : 1);
        }
    }
}

/**
 * Filters the data in `viewData` based on the criteria specified in `filterData`.
 * Iterates through each property in `filterData` and applies the corresponding filter function.
 *
 * @param {Object} data - The data object containing `viewData` and `filterData`.
 */
function filterData(data) {
    Object.keys(data.filterData).forEach((prop) => {
        let filterFunction;

        // Skip filtering if no criteria specified for the property.
        if (!data.filterData[prop]) return;

        // Determine the filter function based on the type of filter criteria.
        if (typeof data.filterData[prop] === 'object') {
            if (!data.filterData[prop].from && !data.filterData[prop].to) {
                return;
            }
            filterFunction = function(entry) {
                if (data.filterData[prop].from && data.filterData[prop].to) {
                    return entry[prop] >= data.filterData[prop].from && entry[prop] <= data.filterData[prop].to;
                } else if (data.filterData[prop].from) {
                    return entry[prop] >= data.filterData[prop].from;
                } else if (data.filterData[prop].to) {
                    return entry[prop] <= data.filterData[prop].to;
                }
            }
        } else {
            // For simple string filters, check if the property value includes the filter string.
            filterFunction = entry => entry[prop].toLowerCase().includes(data.filterData[prop].toLowerCase());
        }
        // Apply the filter function to viewData.
        data.viewData = data.viewData.filter(filterFunction);
    });
}

/**
 * Validates if the provided value for emission fields is correct.
 * The field is considered valid if it is empty, null, or a non-negative number.
 * Returns an object containing a `valid` boolean flag and a `name` string identifying the validator.
 */
export function emissionFieldValidator() {
    return value => ({
        valid: value === '' || value === null || value >= 0,
        name: 'emission_validator'
    });
}

/**
 * Applies the current table settings (sorting and filtering) to `data`.
 * Initializes `viewData` with a copy of `origData`, then applies sorting and filtering based on current settings.
 *
 * @param {Object} data - The data object to apply table settings to.
 */
export function applyTableSettings(data) {
    data.viewData = [...data.origData]; // Start with a fresh copy of the original data.
    sortData(data); // Apply sorting.
    filterData(data); // Apply filtering.
}

// Defines the initial format for the table store, managing the state of table data and settings.
export const tableStoreFormat = {
    origData: [],    // Original unsorted and unfiltered data.
    viewData: [],    // Data to be displayed, after sorting and filtering.
    sortColumn: null, // Column to sort by, null if no sorting is applied.
    sortDir: null,    // Direction of sorting: 'asc' for ascending or 'desc' for descending.
    filterData: {}    // Filters to be applied to the data.
};

// Function to sort data based on the specified column and direction.
function sortData(data) {
    // Ensures sorting is only applied if a column and direction are specified.
    if (data.sortColumn !== null && data.sortDir !== null) {
        let sortColumn = data.sortColumn;
        let sortDir = data.sortDir;

        // Sorts the data in ascending or descending order based on the sortDir.
        if (sortDir === 'asc') {
            data.viewData.sort((a, b) => (a[sortColumn] > b[sortColumn]) ? 1 : -1);
        } else if (sortDir === 'desc') {
            data.viewData.sort((a, b) => (a[sortColumn] > b[sortColumn]) ? -1 : 1);
        }
    }
}

// Filters data based on the criteria specified in filterData.
function filterData(data) {
    // Iterates through each filter and applies it to viewData.
    Object.keys(data.filterData).forEach((prop) => {
        let filterFunction;

        // Skips if no filter criteria is specified.
        if (!data.filterData[prop]) return;

        // Checks if the filter is a range (object with 'from' and 'to').
        if (typeof data.filterData[prop] === 'object' && (data.filterData[prop].from || data.filterData[prop].to)) {
            // Defines a function to filter data within the specified range.
            filterFunction = entry => 
                (!data.filterData[prop].from || entry[prop] >= data.filterData[prop].from) &&
                (!data.filterData[prop].to || entry[prop] <= data.filterData[prop].to);
        } else {
            // Defines a function for simple text filtering.
            filterFunction = entry => entry[prop].toLowerCase().includes(data.filterData[prop].toLowerCase());
        }
        data.viewData = data.viewData.filter(filterFunction);
    });
}

// Validator function for emission fields, ensuring values are non-negative.
export function emissionFieldValidator() {
    return value => ({
        valid: value === '' || value === null || value >= 0,
        name: 'emission_validator'
    });
}

// Function to apply the current table settings to the data, including sorting and filtering.
export function applyTableSettings(data) {
    data.viewData = [...data.origData]; // Resets viewData to the original data.
    sortData(data); // Applies sorting.
    filterData(data); // Applies filtering.
}

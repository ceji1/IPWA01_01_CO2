<script>
// @ts-nocheck

    // Importing arrow icons from svelte-bootstrap-icons for indicating sort directions
    import CaretUp from "svelte-bootstrap-icons/lib/CaretUp.svelte";
    import CaretUpFill from "svelte-bootstrap-icons/lib/CaretUpFill.svelte";
    import CaretDown from "svelte-bootstrap-icons/lib/CaretDown.svelte";
    import CaretDownFill from "svelte-bootstrap-icons/lib/CaretDownFill.svelte";

    // Exporting props to make them available for parent components
    export let columnName; // Name of the column to be displayed
    export let columnIdentifier; // Unique identifier for the column, used for sorting
    export let tableSettingStore; // Svelte store containing the table settings

    // Local variable to hold the current table settings
    let tableStoreData = {};
    // Local state to track the current sorting direction of the column
    let currentSortDir = false;

    // Subscribing to the table settings store to reactively update local variables
    tableSettingStore.subscribe(data => {
        tableStoreData = data; // Storing the latest table settings

        // Resetting currentSortDir if the sorted column is not the current column
        if (data.sortColumn !== columnIdentifier) {
            currentSortDir = false;
            return;
        }

        // Updating currentSortDir to reflect the current sorted column's direction
        currentSortDir = data.sortDir;
    })

    // Function to set the sorting direction for the table
    function setSortDir(dir) {
        tableStoreData.sortDir = dir; // Set the direction of sorting
        tableStoreData.sortColumn = columnIdentifier; // Set the column to sort
        tableSettingStore.set(tableStoreData); // Update the store with new settings
    }

    // Function to set the sorting direction to ascending
    function setAsc() {
        setSortDir('asc');
    }

    // Function to set the sorting direction to descending
    function setDesc() {
        setSortDir('desc');
    }

    // Function to reset the sorting to its initial state
    function resetSorting() {
        tableStoreData.sortDir = null;
        tableStoreData.sortColumn = null;
        tableSettingStore.set(tableStoreData); // Update the store with reset settings
    }
</script>

<!-- HTML and Svelte template code with conditional rendering based on currentSortDir -->
<span class="d-flex align-items-center">
    {columnName} <!-- Displaying the column name -->
    <!-- Conditional rendering for sorting buttons based on the current sorting direction -->
    {#if currentSortDir === 'asc'}
        <!-- Button to reset sorting when the current direction is ascending -->
        <button class="btn btn-outline-primary ms-1" on:click|stopPropagation={resetSorting}>
            <CaretUpFill /> <!-- Filled caret indicates the current direction -->
        </button>
        <!-- Button to change sorting to descending -->
        <button class="btn btn-outline-danger ms-1" on:click|stopPropagation={setDesc}>
            <CaretDown />
        </button>
    {:else if currentSortDir === 'desc' }
        <!-- Button to change sorting to ascending -->
        <button class="btn btn-outline-primary ms-1" on:click|stopPropagation={setAsc}>
            <CaretUp />
        </button>
        <!-- Button to reset sorting when the current direction is descending -->
        <button class="btn btn-outline-danger ms-1" on:click|stopPropagation={resetSorting}>
            <CaretDownFill /> <!-- Filled caret indicates the current direction -->
        </button>
    {:else }
        <!-- Buttons to set ascending or descending sorting when no sort is applied -->
        <button class="btn btn-outline-primary ms-1" on:click|stopPropagation={setAsc}>
            <CaretUp />
        </button>
        <button class="btn btn-outline-danger ms-1" on:click|stopPropagation={setDesc}>
            <CaretDown />
        </button>
    {/if}
</span>

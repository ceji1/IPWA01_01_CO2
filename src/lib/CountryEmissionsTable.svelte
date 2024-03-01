<script>
  // Importing modules and components from Svelte and other JavaScript files
  import { writable } from 'svelte/store'; // Svelte's writable store for reactive variables
  import { emissionDataStore } from "../js/stores/emissionStore.js"; // Store containing emission data
  import { // Helper functions and formats for table settings
    tableStoreFormat,
    applyTableSettings,
    emissionFieldValidator
  } from "../js/utilities/table-management.js";
  import { form, field, combined, style } from 'svelte-forms'; // Svelte forms for handling user input and validation
  import { pattern } from 'svelte-forms/validators'; // Validator for form input
  import Sorting from "./Sorting.svelte"; // Component for sorting table columns
  import Funnel from "svelte-bootstrap-icons/lib/Funnel.svelte"; // Funnel icon for indicating filters
  import "../styles/emissionstable.css"

  // Store to manage table settings with a default format for initial state
  const tableSettingStore = writable({ ...tableStoreFormat });

  // Local state variable to hold the data that will be displayed in the view
  let viewData = [];

  // Form fields defined with validation patterns to ensure correct input types
  const countryFilterField = field('country', '', [pattern(/^\w*$/)]); // Field for country input with word-character validation
  const emissionFromFilterField = field('from', '', [emissionFieldValidator()]); // Field for emission 'from' value with custom validator
  const emissionToFilterField = field('to', '', [emissionFieldValidator()]); // Field for emission 'to' value with custom validator

  // Combine individual emission fields into a single field for easier handling.
  const emissionRangeFilterField = combined(
    'emission',
    [emissionFromFilterField, emissionToFilterField],
    ([from, to]) => ({ from: from.value, to: to.value })
  );

  // Creating a form instance by combining individual fields
  const filterForm = form(countryFilterField, emissionRangeFilterField);

  // Function to apply filters to the table based on form input if the form is valid
  function filterTable() {
    if ($filterForm.valid) { // Checking if the form is valid
      // Updating the table settings store with the filter data from the form
      tableSettingStore.update(settings => ({ ...settings, filterData: $filterForm.summary }));
    }
  }

  // Function to reset filter to its initial state.
  function resetFilter() {
    filterForm.reset();
    tableSettingStore.update(tableSettingStore => ({...tableSettingStore, filterData: {}}));
  }

  // Subscribe to the tableSettingStore to update viewable data when settings change.
  tableSettingStore.subscribe(data => {
    applyTableSettings(data);
    viewData = data.viewData;
  });

  // Subscribing to the emissionDataStore to update table with new, aggregated data
  emissionDataStore.subscribe(data => {
    const aggregatedData = data.reduce((acc, item) => {
      const { country, emission } = item;
      if (!acc[country]) acc[country] = { country, emission: 0 };
      acc[country].emission += emission;
      return acc;
    }, {});

    const minifiedData = Object.values(aggregatedData); // Converting the aggregated object back to an array
    // Updating the table settings store with the original and viewable data as the aggregated data
    tableSettingStore.update(settings => ({ ...settings, origData: minifiedData, viewData: minifiedData }));
  });
</script>

<div class="table-container">
<!-- The HTML template for the component, with Svelte's special syntax for reactivity and event handling -->
<h2>Nach Ländern <a class="text-muted" href="#collapseCountryFilter" data-bs-toggle="collapse"><Funnel /></a></h2>
<div class="collapse" id="collapseCountryFilter">
  <div class="card card-body">
    <form on:submit|preventDefault={filterTable}>
      <div class="row">
        <div class="col">
          <label for="countryTableFilterCountry" class="form-label">Land</label>
          <input type="text" id="countryTableFilterCountry" class="form-control" bind:value={$countryFilterField.value} use:style={{field: countryFilterField, invalid: 'is-invalid'}}/>
          {#if $countryFilterField.invalid}
            <div class="invalid-feedback">
              Ihre Eingabe enthält unzulässige Zeichen. Verwenden Sie bitte nur Buchstaben, Zahlen und Unterstriche.
            </div>
          {/if}
        </div>
        <div class="col">
          <label for="countryTableFilterEmission" class="form-label">CO₂-Emissionen</label>
          <div class="input-group" id="countryTableFilterEmission">
            <input type="number" class="form-control" placeholder="Von" step="0.01" bind:value={$emissionFromFilterField.value} use:style={{field: emissionFromFilterField, invalid: 'is-invalid'}} />
            <span class="input-group-text">-</span>
            <input type="number" class="form-control" placeholder="Bis" step="0.01" bind:value={$emissionToFilterField.value} use:style={{field: emissionToFilterField, invalid: 'is-invalid'}} />
            {#if $emissionFromFilterField.invalid || $emissionToFilterField.invalid}
              <div class="invalid-feedback">
                Unzulässige Eingabe. Nur positive Zahlenwerte sind gültig.
              </div>
            {/if}
          </div>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col">
          <button class="btn btn-primary" type="reset" on:click={resetFilter}><Funnel /> Reset</button>
          <button class="btn btn-primary" id="countryTableFilterSubmit" type="submit" disabled="{!$filterForm.valid}"><Funnel /> Filtern</button>
        </div>
      </div>
    </form>
  </div>
</div>

<table class="table">
  <thead>
    <tr>
      <th>
        <Sorting
                tableSettingStore="{tableSettingStore}"
                columnName="Land"
                columnIdentifier="country"
        />
      </th>
      <th>
        <Sorting
                tableSettingStore="{tableSettingStore}"
                columnName="CO₂-Emissionen in Mio. t"
                columnIdentifier="emission"
        />
      </th>
    </tr>
  </thead>
  <tbody>
    {#each viewData as entry}
      <tr>
        <td>{entry.country}</td>
        <td>{entry.emission.toFixed(2)}</td>
      </tr>
      {/each}
  </tbody>
</table>
</div>

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

    /**
   * Define form fields with validation patterns to ensure correct input types.
   * 'pattern' is used to allow only word characters in country and company fields.
   * 'emissionFieldValidator' is a custom validator to check emission values.
   */
  const countryFilterField = field('country', '', [pattern(/^\w*$/)]);
  const companyFilterField = field('company', '', [pattern(/^\w*$/)]);
  const emissionFromFilterField = field('from', '', [emissionFieldValidator()]);
  const emissionToFilterField = field('to', '', [emissionFieldValidator()]);

  // Combine individual emission fields into a single field for easier handling.
  const emissionRangeFilterField = combined(
    'emission',
    [emissionFromFilterField, emissionToFilterField],
    ([from, to]) => ({ from: from.value, to: to.value })
  );

  // Creating a form instance by combining individual fields
  const filterForm = form(countryFilterField, companyFilterField, emissionRangeFilterField);


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

  // Subscribe to the emissionDataStore to update table with new data.
  emissionDataStore.subscribe(data => {
    tableSettingStore.update(tableSettingStore => ({...tableSettingStore, origData: data, viewData: data}))
  });
  
</script>

<div class="table-container">
<!-- The UI part of the code with embedded svelte logic. -->
<h2>Nach Firmen <a class="text-muted" href="#collapseCompanyFilter" data-bs-toggle="collapse"><Funnel /></a></h2>
<div class="collapse" id="collapseCompanyFilter">
  <div class="card card-body">
    <form on:submit|preventDefault={filterTable}>
      <div class="row">
        <div class="col">
          <label for="companyTableFilterCountry" class="form-label">Land</label>
          <input type="text" id="companyTableFilterCountry" class="form-control" bind:value={$countryFilterField.value} use:style={{field: countryFilterField, invalid: 'is-invalid'}}/>
          {#if $countryFilterField.invalid}
            <div class="invalid-feedback">
              Ihre Eingabe enthält unzulässige Zeichen. Verwenden Sie bitte nur Buchstaben, Zahlen und Unterstriche.
            </div>
          {/if}
        </div>
        <div class="col">
          <label for="companyTableFilterCompany" class="form-label">Firma</label>
          <input type="text" id="companyTableFilterCompany" class="form-control" bind:value={$companyFilterField.value} use:style={{field: companyFilterField, invalid: 'is-invalid'}} />
          {#if $companyFilterField.invalid}
            <div class="invalid-feedback">
              Ihre Eingabe enthält unzulässige Zeichen. Verwenden Sie bitte nur Buchstaben, Zahlen und Unterstriche.
            </div>
          {/if}
        </div>
        <div class="col">
          <label for="companyTableFilterEmission" class="form-label">CO₂-Emissionen</label>
          <div class="input-group" id="companyTableFilterEmission">
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
            <button class="btn btn-primary" id="companyTableFilterSubmit" type="submit" disabled="{!$filterForm.valid}"><Funnel /> Filtern</button>
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
                columnName="Unternehmen"
                columnIdentifier="company"
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
        <td>{entry.company}</td>
        <td>{entry.emission}</td>
      </tr>
      {/each}
  </tbody>
</table>
</div>


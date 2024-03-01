// Import the `readable` module from the 'svelte/store' package.
import {readable} from 'svelte/store';

// Define the URL of the API from which emission data should be fetched.
const apiUrl = "/emission_data.json";

/**
 * Asynchronously retrieves emission data from the API.
 * @async
 * @function getData
 * @returns {Promise<Object>} A promise that resolves to the JSON response object from the API.
 */
const getData = async () => {
    const response = await fetch(apiUrl);  // Performs a network call to the API.
    return await response.json();          // Parses the response as JSON.
}

// Creates a Svelte store for managing emission data.
export const emissionDataStore = readable([], set => {
    getData().then(set);  // Fetches data and sets it in the store.

    return () => {}       // Cleanup function.
});

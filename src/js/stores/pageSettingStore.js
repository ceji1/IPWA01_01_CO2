// Import the `writable` module from the 'svelte/store' package.
import {writable} from 'svelte/store';

// Create a store named `pageSettingStore`.
export const pageSettingStore = writable({rtl: false});

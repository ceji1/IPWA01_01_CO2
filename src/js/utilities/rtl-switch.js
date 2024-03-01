import {onMount} from "svelte";
import {pageSettingStore} from "../stores/pageSettingStore.js";

/**
 * Function to switch the text direction of the page based on the user's browser language.
 * It's designed to support Right-to-Left (RTL) languages.
 */
export function rtlSwitch() {
    // Executes the function after the component is first rendered in the DOM
    onMount(() => {
        // Defines a list of language codes for languages that use an RTL text direction
        const rtl_languages = ["ar", "arc", "dv", "fa", "ha", "he", "khw", "ks", "ku", "ps", "ur", "yi"];
        
        // Retrieves the primary language code from the browser's language setting
        let browser_language = window.navigator.language.split(/[-_]/, 1)[0];

        // Checks if the browser's language is in the list of RTL languages
        if (rtl_languages.includes(browser_language)) {
            // Sets the 'dir' attribute of the HTML body to 'rtl' for right-to-left text direction
            document.getElementsByTagName('body')[0].setAttribute('dir', 'rtl');
            
            // Updates the pageSettingStore to reflect the RTL setting
            pageSettingStore.update(settingStore => ({...settingStore, rtl: true}));
        }
    })
}

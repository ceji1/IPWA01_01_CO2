// Imports custom styles for the application's layout.
import '../../scss/custom-layout.scss'

// Imports Bootstrap, a frontend framework for responsive design and UI components.
import 'bootstrap';

// Imports the main application component (EmissionsDashboard) created with Svelte.
import App from '../../EmissionsDashboard.svelte'

// Initializes the main component and binds it to the HTML element with the ID 'app'.
// `document.getElementById('app')` returns the DOM element into which the app will be inserted.
const app = new App({
  target: document.getElementById('app'),
})

// Exports the instantiated app for possible further use or testing.
export default app

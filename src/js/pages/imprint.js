// Imports custom styles for the application's layout.
import '../../scss/custom-layout.scss'

// Imports Bootstrap, a frontend framework for responsive design and UI components.
import 'bootstrap';

// Imports the main application component (Index) created with Svelte.
import App from '../../Imprint.svelte'

// Initializes the main application component and binds it to the DOM element with the ID 'app'.
// `document.getElementById('app')` returns the DOM element where the app will be inserted.
const app = new App({
  target: document.getElementById('app'),
})

// Exports the application instance for possible external use or testing.
export default app

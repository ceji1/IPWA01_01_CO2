<script>
    // Core layout components for the page
    import Header from './lib/Header.svelte';
    import Footer from './lib/Footer.svelte';
    import './styles/imprint.css';
    // Helper function for Right-to-Left (RTL) page layout switch if needed
    import { rtlSwitch } from "./js/utilities/rtl-switch.js";
    rtlSwitch(); // Initializes the RTL layout based on user settings or preferences
</script>

<Header />  <!-- Page header component with navigation and branding -->

<main>
    <div class="container">
        <!-- Page title with a bottom border for emphasis -->
        <h1 class="mainn-title fade-in ">Fiktives Impressum</h1>

        <!-- Contact and legal information for the website. 
             Replace with real data if used in a production environment. -->
        <p class="site-description fade-in">
            Verantwortlich für sämtlichen Unfug dieser Website:<br>
            <strong>Captain Carbon Cowboy</strong><br><br>

            Adresse: Auf dem Mars, in der Nähe der Südpolarkappe<br>
            Telefon: 1-800-GREEN-HAHN<br>
            E-Mail: captain.carbon@emissionsrodeo.com<br><br>

            Umsatzsteuer-ID: Klingt nach Arbeit<br>
            Registernummer: Null CO2-Emissionen, viele Lacher
        </p>
    </div>
</main>

<Footer />  <!-- Page footer component with additional links or legal information -->

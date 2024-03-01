<script>
    // Core layout components for the page
    import Header from './lib/Header.svelte'; // Top navigation and branding
    import Footer from './lib/Footer.svelte'; // Bottom footer with additional information or links
    import './styles/home.css';
    // Helper for Right-to-Left (RTL) layout initialization based on user settings or preferences
    import { rtlSwitch } from "./js/utilities/rtl-switch.js";
    rtlSwitch(); // Execute the RTL layout switch if necessary
</script>

<Header />  <!-- Includes the site's global navigation and branding -->

<main>
    <div class="container">
        <!-- Main content header with a descriptive title -->
        <h1 class="mainn-title fade-in">Home</h1>

        <!-- Overview of the site's creation, features, and purpose -->
        <p class="site-description fade-in">
            Diese Webseite wurde unter Verwendung der Entwicklungsumgebung WebStorm und des Frameworks
            Svelte erstellt.<br> Das Logo der Webseite wurde unter Zuhilfenahme von Adobe Photoshop erstellt.<br><br>

            <u>Key Features:</u><br>

            <strong>Strukturiertes Layout:</strong> Titel, Logo, globaler Header, Content-Bereich und rechtlicher
            Footer.<br> <strong>Dynamisches Menü:</strong> Anpassung an die Schriftkultur der Nutzenden.<br>
            <strong>Responsive Design:</strong> Kompatibilität mit verschiedenen Endgeräten.<br>
            <strong>Interaktive Daten:</strong> Tabelle mit filterbaren CO₂-Emissionsdaten.<br>
            <strong>Sichere Eingaben:</strong> Schutz vor Code-Injektion.<br><br>
        </p>
    </div>
</main>



<Footer />  <!-- Contains legal information and additional links -->


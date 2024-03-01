<script>
    // Imports Header and Footer components for consistent site layout.
    import Header from './lib/Header.svelte';
    import Footer from './lib/Footer.svelte';
    import './styles/legal.css';
    // Imports and executes a script to enable RTL layout if required.
    import { rtlSwitch } from "./js/utilities/rtl-switch.js";
    rtlSwitch();
</script>

<Header /> <!-- Global site header with navigation -->

<main>
    <div class="container">
        <!-- Section heading for the legal notice page -->
        <h1 class="mainn-title fade-in ">Fiktive Rechtliche Hinweise</h1>

        <!-- Content providing humorous legal disclaimers and privacy information -->
        <p class="site-description fade-in">
            Die Website kann Spuren von umweltfreundlichen Witzen enthalten, die zu unkontrolliertem Lachen führen.
            Wir übernehmen keine Haftung für verlorene Wetten zur Reduzierung von CO2-Emissionen.<br><br>

            <strong>Urheberrechtsverletzung:</strong>
            Sollten Sie auf unserer Website urheberrechtlich geschützte Witze oder Memes finden, nehmen Sie es bitte nicht persönlich.
            Wir haben alles von einem schelmischen Panda stibitzt.<br><br>

            <strong>Datenschutz:</strong>
            Ihre Daten sind für uns wie sauberer Sauerstoff - wir teilen sie nicht.
            Wir verwenden sie nur, um Ihnen mehr lustige CO2-Statistiken zu schicken, die niemanden interessieren.
        </p>
    </div>
</main>

<Footer /> <!-- Global site footer with additional links or legal information -->


<script>
    // Importing necessary components and helpers for page layout and functionality
    import Header from './lib/Header.svelte';
    import Footer from './lib/Footer.svelte';
    import CompanyEmissionsTable from "./lib/CompanyEmissionsTable.svelte";
    import CountryEmissionsTable from './lib/CountryEmissionsTable.svelte';
    import CaretRight from "svelte-bootstrap-icons/lib/CaretRight.svelte";
    import CaretLeft from "svelte-bootstrap-icons/lib/CaretLeft.svelte";
    import { pageSettingStore } from './js/stores/pageSettingStore.js';
    import { rtlSwitch } from "./js/utilities/rtl-switch.js";
    import './styles/emissions.css';
    // Initialize RTL layout if required based on page settings
    rtlSwitch();

    let rtlLayout = false;
    pageSettingStore.subscribe((data) => {
        rtlLayout = data.rtl; // React to RTL layout changes
    })
</script>

<Header />

<main class="container">
    <div class="row">
        <!-- Sidebar with navigation links, adapting to RTL settings if necessary -->
        <div class="col-md-3 col-lg-2">
            <!-- Sticky sidebar for navigation between different sections -->
            <div class="sticky-sidebar sticky-top ms-2">
                <h4 class="text-muted pb-3">Seiteninhalt</h4>
                <nav class="navbar">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <!-- Navigation link to the countries section, with directional icon based on layout -->
                            <a class="nav-link d-flex align-items-center" href="#countries">
                                {#if rtlLayout}<CaretLeft width={32} height={32} />{:else}<CaretRight width={32} height={32} />{/if}
                                Nach Ländern
                            </a>
                        </li>
                        <li class="nav-item">
                            <!-- Navigation link to the companies section, with directional icon based on layout -->
                            <a class="nav-link d-flex align-items-center" href="#companies">
                                {#if rtlLayout}<CaretLeft width={32} height={32} />{:else}<CaretRight width={32} height={32} />{/if}
                                Nach Firmen
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        <div class="col-md-9 col-lg-10">
            <!-- Main content area with sections for country and company emissions data -->
            <h1 class="mainn-title fade-in ">CO₂-Emissionen</h1>
            <p class="site-description fade-in">
                Die bereitgestellten CO₂-Emissionsdaten umfasst eine Auswahl an Unternehmen und Ländern.<br>
                Die Werte sowie die dargestellten Unternehmen sind hypothetisch und ausschließlich zu Analysezwecken konstruiert worden.</p>
            <section id="countries">
                <CountryEmissionsTable />
            </section>
            <section id="companies">
                <CompanyEmissionsTable />
            </section>
        </div>
    </div>
</main>

<Footer />

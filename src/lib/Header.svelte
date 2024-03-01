<script>
    // Importing the logo image and CSS file for the header component.
    import Logo from '../assets/logo.png';
    import '../styles/header.css';
</script>

<header class="navbar1 sticky-top mb-4">
    <nav class="navbar navbar-expand-lg border-bottom">
        <div class="container-fluid">
            <a class="navbar-brand d-flex align-items-center" href="/">
                <img src="{Logo}" class="logo-img" alt="Logo">
                <span class="fs-3 me-2">CO2-Footprint</span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse " id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item"><a class="nav-link main-title" href="/">Home</a></li>
                    <li class="nav-item"><a class="nav-link main-title" href="/EmissionsDashboard.html">CO₂-Emissionen</a></li>
                    <li class="nav-item"><a class="nav-link main-title" href="/imprint.html">Impressum</a></li>
                </ul>
            </div>
        </div>
    </nav>
</header>

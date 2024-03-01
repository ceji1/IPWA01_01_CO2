<script>
    // Importing the logo image and CSS file for the footer component.
    import Logo from '../assets/logo.png'; 
    import '../styles/footer.css';
</script>

<footer class=" fixed-bottom">
    <nav class="navbar navbar-expand-lg border-top">
        <div class="container-fluid mb-2 footer-container">
            <div class="d-flex flex-row align-items-center log">
                <img src="{Logo}" width="30" alt="Company Logo">
                <span class="text-muted ms-2 copy">© 2023 Max Mustermann</span>
            </div>
            <ul class="navbar-nav mb-lg-0 ms-auto"> <!-- ms-auto moves the content to the right -->
                <li class="nav-item">
                    <a class="nav-link footer-link txt" href="/legal.html">Rechtliche Hinweise</a>
                </li>
            </ul>
        </div>
    </nav>
</footer>




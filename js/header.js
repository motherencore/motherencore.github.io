$(document).ready(function () {
    const header = document.querySelector('#header');
    header.innerHTML =
        `
        <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container-fluid">
                <div class="col-6" style="overflow: hidden;">
                    <a href="index.html"><img src="Assets/meLogo.svg" class="img-fluid" alt="MOTHER encore"></a>
                </div>
                <div class="col-6">
                    <button class="col navbar-toggler justify-content-right" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNavAltMarkup"
                            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation"
                            style="float: right">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    
                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <ul class="navbar-nav mr-auto" style="flex-grow: 1; align-items: center">
                                <li class="nav-item">
                                    <a class="nav-link translated" data-id="SITE_NAV_HOME" href="index.html">Home</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link translated" data-id="SITE_NAV_ABOUT" href="about.html">About</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link translated" data-id="SITE_NAV_FAQ" href="faq.html">FAQ</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link translated" data-id="SITE_NAV_DOWNLOAD" href="download.html">Download</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link translated" data-id="SITE_NAV_CREDITS" href="credits.html">Credits</a>
                                </li>
                            </ul>
                        </div>
                    
                </div>
            </div>
        </nav>
        `;
});

$(document).ready(function () {
    const header = document.querySelector('#header');
    header.innerHTML =
        `
        <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container-fluid">
                <div class="col-4" style="overflow: hidden;">
                    <a href="index.html"><img src="Assets/meLogo.svg" class="img-fluid" alt="MOTHER encore"></a>
                </div>
                <div class="col-8 justify-content-end">
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
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Language
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdown" style="right:0; left: auto">
                                        <a class="dropdown-item" id="en" onclick="setLanguage('en')">English</a>
                                        <a class="dropdown-item" id="ja" onclick="setLanguage('ja')">日本語</a>
                                        <a class="dropdown-item" id="fr" onclick="setLanguage('fr')">Français</a>
                                        <a class="dropdown-item" id="es" onclick="setLanguage('es')">Español</a>
                                        <a class="dropdown-item" id="pt_BR" onclick="setLanguage('pt_BR')">Português Brasil</a>
                                        <a class="dropdown-item" id="it" onclick="setLanguage('it')">Italiano</a>
                                        <a class="dropdown-item" id="pl" onclick="setLanguage('pl')">Polski</a>
                                        <a class="dropdown-item" id="ko" onclick="setLanguage('ko')">한국어</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    
                </div>
            </div>
        </nav>
        `;
});

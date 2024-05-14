$(document).ready(function () {
    const header = document.querySelector('#header');
    header.innerHTML =
        `
        <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container-lg">
                <div class="col" style="overflow: hidden;">
                    <a href="../index.html"><img src="../Assets/meLogo.svg" class="img-fluid" alt="MOTHER encore"></a>
                </div>
                <div class="col">
                    <button class="col navbar-toggler justify-content-right" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNavAltMarkup"
                            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation"
                            style="float: right">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="col collapse navbar-collapse justify-content-around" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                            <a class="nav-link translated" data-id=“0” href="index.html">Home</a>
                            <a class="nav-link translated" data-id=“1” href="about.html">About</a>
                            <a class="nav-link translated" data-id=“2” href="faq.html">FAQ</a>
                            <a class="nav-link translated" data-id=“3” href="download.html">Download</a>
                            <a class="nav-link translated" data-id=“4” href="credits.html">Credits</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        `;
});
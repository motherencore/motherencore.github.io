/**
 * ==========================================================================================
 * Generates the credits based on the credits.json file
 * The final Special Thanks section is manually fixed in translate.js
 * ==========================================================================================
 */
$(document).ready(function () {
    const sec = document.querySelector('#creditZone');
    ///*
    $.getJSON("js/credits.json", function(credits) {
        sec.innerHTML = Object.keys(credits).reduce((accum, section) =>
            accum +
            `<!-- SECTION START -->
            <h1 class="translated" data-id="${credits[section].id}" style="text-align: center; margin-top: 2rem;">
                ${section}
            </h1>
            <div class="info">
                <p style="margin-top: 2.5%;">
                    ${credits[section].people}
                </p>
            </div>
            `, ''
        );
        sec.innerHTML = sec.innerHTML.replaceAll(",", "<br>")
    });
});

/**
 * ==========================================================================================
 * Replaces all names with associated links with the proper link
 * This is a different script from credits.js so a second refresh is not required
 * Links can be easily added or removed in links.json
 * ==========================================================================================
 */
$(document).ready(function () {
    const sec = document.querySelector('#creditZone');

    $.getJSON("js/links.json", function (links) {
        Object.keys(links).forEach(key => {
            if (links[key]["External Links"] !== "")
                sec.innerHTML = sec.innerHTML.replaceAll(key, "<a class=\"norm-link\" title=\""+key+"\" href=\""+links[key]["External Links"]+"\">"+key+"</a>")
        });
    });
});
const langList = ["en", "fr", "it", "ja", "es", "pt_BR", "pl", "ko", "de", "ru", "uk"]

/**
 * ==========================================================================================
 * Replaces all markdown text to HTML tags
 * @param {string} text - the paragraph text to be modified
 * @param {string} lang - the language of the page
 * ==========================================================================================
 */
function cleanHtml(text, lang) {
    text = text.replaceAll("<p>", "")
    text = text.replaceAll("</p>", "")

    text = text.replaceAll("<a", "<a class=\"norm-link\"")

    text = text.replace("<ul>", "<ul class=\"ja-list\">")
    text = text.replaceAll("<li>", "<li class=\"ja-bullet\">")

    if (lang === "ko") {
        text = text.replace("<h1 id=\"downloads\">Downloads 채널에서 데모 빌드 찾기</h1>", "#Downloads 채널에서 데모 빌드 찾기")
    }

    return text
}

/**
 * ==========================================================================================
 * Replaces the sections final parts of the credits
 * @param {string} lang - the language of the page
 * @param translation   - the hash stored in languages.json
 * ==========================================================================================
 */
function specialThanks(lang, translation) {
    let text = "Mother Forever<br>Starmen.net<br>The Mother 1 + 2 Fan Translation Team<br>The Mother Community<br>The Mother Encore Discord Server"
    text = text.replace("The Mother 1 + 2 Fan Translation Team", translation["SITE_CREDITS_NAME_FAN_TRANSL"][lang])
    text = text.replace("The Mother Community", translation["SITE_CREDITS_NAME_COMMUNITY"][lang])
    text = text.replace("The Mother Encore Discord Server", translation["SITE_CREDITS_NAME_DISCORD"][lang])
    return text
}

/**
 * ==========================================================================================
 * Translates a page by finding the class and replacing by data-id
 * @param {string} lang - language. is changed to en if not found in the language list
 * ==========================================================================================
 */
function translatePage(lang) {

    // select the language of the page
    if (!langList.includes(lang)) {
        lang = lang.substring(0,2)
        if (!langList.includes(lang))
            localStorage.setItem("language", "en")
        else
            localStorage.setItem("language", lang)
    }

    lang = localStorage.getItem("language")

    document.getElementById("navbarDropdown").innerHTML = lang.replace("_", "").toUpperCase()

    //if (localStorage.getItem("language") === "en")
    //    return

    // modify the lang attribute
    $( "html" ).attr( "lang", lang );

    // translate the page here
    $.getJSON("js/languages.json", function(TRANSLATIONS) {
        $.getScript("https://cdn.jsdelivr.net/npm/showdown@2.0.3/dist/showdown.min.js", function() {
            let converter = new showdown.Converter()
            $(".translated").each(function () {
                let id = $(this).data("id")
                if (TRANSLATIONS[id] && TRANSLATIONS[id][lang])
                    var txt = cleanHtml(converter.makeHtml(TRANSLATIONS[id][lang]), lang)
                    $(this).html(txt)
            });
        });

        let thanks = document.querySelector('#SITE_CREDITS_THANKS_VERY');
        if (thanks) {
            thanks.innerHTML = specialThanks(lang, TRANSLATIONS);
        }

    });
}

/**
 * ==========================================================================================
 * Sets the language to the clicked element and reloads the page
 * @param {string} lang - language code
 * ==========================================================================================
 */
function setLanguage(lang) {
    if (localStorage.getItem("language") !== lang) {
        localStorage.setItem("language", lang)
        location.reload()
    }
}

// buttons
/*
document.getElementById("en").onclick = function() {setLanguage("en")};
document.getElementById("fr").onclick = function() {setLanguage("fr")};
document.getElementById("it").onclick = function() {setLanguage("it")};
document.getElementById("ja").onclick = function() {setLanguage("ja")};
document.getElementById("ko").onclick = function() {setLanguage("ko")};
document.getElementById("es").onclick = function() {setLanguage("es")};
document.getElementById("pt_BR").onclick = function() {setLanguage("pt_BR")};
document.getElementById("pl").onclick = function() {setLanguage("pl")};
document.getElementById("de").onclick = function() {setLanguage("de")};
 */

/**
 * ==========================================================================================
 * Translates the page
 * ==========================================================================================
*/
$(document).ready( function () {
    // grab navigator language if there is nothing in local storage
    if (localStorage.getItem("language") == null)
        localStorage.setItem("language", navigator.language || navigator.userLanguage)

    // call translation function
    translatePage(localStorage.getItem("language"))
});

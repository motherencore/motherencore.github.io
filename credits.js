credits = {
    //Project Creator
    'Project Creator': {
        title: 'Project Creator',
        people: ['Sam the Salmon']
    },
    // Director
    'Director': {
        title: 'Director',
        people: ['Pkdotts']
    },
    // category
    'Programmers': {
        title: 'Programmers',
        people: ['Pkdotts<br>roka<br>benichi<br>ZetCipher<br>HepHep<br>Pedro Braga']
    },
    // NPC Sprite Artists
    'NPC Sprite Artists': {
        title: 'NPC Sprite Artists',
        people: ['benichi<br>Nicolás Romero<br>Pkdotts<br>Sam the Salmon<br>Bassya<br>CB78<br>FlintMother3<br>Yahav<br>Megadrivesonic']
    },
    // Character Animators
    'Character Animators': {
        title: 'Character Animators',
        people: ['Pkdotts<br>benichi<br>Sam the Salmon<br>CB78<br>PKdinosaur<br>MaxBound<br>-MP64-<br>Castor28<br>SuperSquidoodle<br>Cart Mart<br>Mallow<br>corblan']
    },
    // Effects Animators
    'Effects Animators': {
        title: 'Effects Animators',
        people: ['Ren Amamiya<br>Pkdotts<br>CB78<br>AveryPizza']
    },
    // Battle Background Artists
    'Battle Background Artists': {
        title: 'Battle Background Artists',
        people: ['Sam The Salmon<br>Pkdotts<br>benichi<br>CB78']
    },
    // Map Designers
    'Map Designers': {
        title: 'Map Designers',
        people: ['Sam the Salmon<br>Pkdotts<br>Benichi<br>CB78']
    },
    // Illustration Artists
    'Illustration Artists': {
        title: 'Illustration Artists',
        people: ['Sam the Salmon<br>Pkdotts<br>dianesaur<br>CB78<br>Birb']
    },
    // Concept Artists
    'Concept Artists': {
        title: 'Concept Artists',
        people: ['Falcon<br>Pkdotts<br>Sam the Salmon<br>Nicolás Romero<br>Scan']
    },
    // Promotional Artists
    'Promotional Artists': {
        title: 'Promotional Artists',
        people: ['Nicolás Romero<br>Retro64<br>CB78']
    },
    // Mother Encore Logo Designer
    'Mother Encore Logo Designer': {
        title: 'Mother Encore Logo Designer',
        people: ['Orange is Borange']
    },
    // Writers
    'Writers': {
        title: 'Writers',
        people: ['Scan<br>Pkdotts<br>sludgeXP']
    },
    // Musicians
    'Musicians': {
        title: 'Musicians',
        people: ['CopperTheJackal<br>McThrillington']
    },
    // Singers
    'Singers': {
        title: 'Singers',
        people: ['BismuthBloom<br>CopperTheJackal']
    },
    // Bug Testers
    'Bug Testers': {
        title: 'Bug Testers',
        people: ['Vicente<br>CB78<br>SuperSquidoodle<br>sludgeXP<br>Pkdotts<br>benichi<br>Bassya<br>Scan<br>Okano<br>Xylo']
    },
    // Japanese Translator
    'Japanese Translator': {
        title: 'Japanese Translator',
        people: ['Lone']
    },
    // Manager of Fun
    'Manager of Fun': {
        title: 'Manager of Fun',
        people: ['sludgeXP']
    },
    // Special Thanks
    'Special Thanks': {
        title: 'Special Thanks',
        people: ['Jonathan DaEgg123<br>Snowwood a.k.a. Burger God<br>Chiipan7<br>MF PORKy<br>Kody NOKOLO<br>Echoes/Minty<br>HeyItsCeleste']
    },
    // Very Special Thanks
    'Very Special Thanks': {
        title: 'Very Special Thanks',
        people: ['Mother Forever<br>Starmen.net<br>The Mother 1 + 2 Fan Translation Team<br>The Mother Community<br>The Mother Encore Discord Server']
    },

    /*
    // category
    'category': {
        title: '',
        people: ['names']
    },
    */

}




$(document).ready(function () {
    const sec = document.querySelector('#creditZone');

    sec.innerHTML = Object.keys(credits).reduce((accum, section) => accum +
        `<!-- SECTION START -->
        <h1 class="translated" style="text-align: center; margin-top: 2rem;">
            ${section}
        </h1>
        <div class="info">
            <p style="margin-top: 2.5%;">
                ${credits[section].people}
            </p>
        </div>
        `, ''
    );
});

$(document).ready(function () {
    const footer = document.querySelector('#footer');
    footer.innerHTML = `
        <p class="translated" data-id=“5” style="padding-bottom: 0;">Social Media</p>

        <div class="d-flex justify-content-center" style="overflow: hidden; height: 30px;">
            <a title="Twitter" href="https://twitter.com/Mother_Encore" class="nav-link fa-brands fa-twitter"> </a>
            <a title="Youtube" href="https://www.youtube.com/channel/UCQDodAgh7ckh7l3sTlsVdPA" 
                class="nav-link fa-brands fa-youtube"> </a>
            <a title="Discord" href="https://discord.gg/CTZ9ABzt8X" class="nav-link fa-brands fa-discord"> </a>
            <a title="Reddit" href="https://reddit.com/r/motherencore" class="nav-link fa-brands fa-reddit"> </a>
            <a title="Tumblr" href="https://motherencore.tumblr.com/" class="nav-link fa-brands fa-tumblr"> </a>
        </div>
    
        <p class="translated" data-id=“6” style="padding-top: 0;">Disclaimer: MOTHER: Encore is a fan made project, and is in no way affiliated, associated, authorized, endorsed by, or in any way officially connected with Nintendo Inc., Shigesato Itoi, HAL Laboratory, Inc., or any of its subsidiaries or its affiliates.</p>
        `;
});
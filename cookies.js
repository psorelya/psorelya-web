(function() {
    // Styles
    var style = document.createElement('style');
    style.textContent = `
        .cookie-banner { display: none; position: fixed; bottom: 0; left: 0; width: 100%; background-color: #2D2D2D; color: #F5F5F5; padding: 1.2rem 2rem; z-index: 99999; font-family: 'Montserrat', sans-serif; font-size: 0.78rem; font-weight: 300; line-height: 1.6; box-shadow: 0 -4px 20px rgba(0,0,0,0.15); }
        .cookie-banner-inner { max-width: 1000px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 2rem; flex-wrap: wrap; }
        .cookie-banner p { margin: 0; }
        .cookie-banner a { color: #C4A882; text-decoration: underline; }
        .cookie-buttons { display: flex; gap: 0.8rem; flex-shrink: 0; }
        .cookie-btn { padding: 0.6rem 1.5rem; font-family: 'Montserrat', sans-serif; font-size: 0.72rem; letter-spacing: 0.15rem; text-transform: uppercase; cursor: pointer; border: none; transition: all 0.3s ease; }
        .cookie-btn-accept { background-color: #8A6D4B; color: #fff; }
        .cookie-btn-accept:hover { background-color: #6d5439; }
        .cookie-btn-refuse { background-color: transparent; color: #aaa; border: 1px solid #555; }
        .cookie-btn-refuse:hover { color: #fff; border-color: #888; }
    `;
    document.head.appendChild(style);

    // Detect language
    var isEn = window.location.pathname.indexOf('/en/') !== -1;
    var legalLink = isEn ? '/en/legal.html#privacy' : '/mentions-legales.html#confidentialite';
    var text = isEn
        ? 'We use cookies to analyze our traffic and improve your experience. See our <a href="' + legalLink + '">privacy policy</a>.'
        : 'Nous utilisons des cookies pour analyser notre trafic et améliorer votre expérience. Consultez notre <a href="' + legalLink + '">politique de confidentialité</a>.';
    var acceptText = isEn ? 'Accept' : 'Accepter';
    var refuseText = isEn ? 'Decline' : 'Refuser';

    // Create banner
    var banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.id = 'cookieBanner';
    banner.innerHTML = `
        <div class="cookie-banner-inner">
            <p>${text}</p>
            <div class="cookie-buttons">
                <button class="cookie-btn cookie-btn-refuse" id="cookieRefuse">${refuseText}</button>
                <button class="cookie-btn cookie-btn-accept" id="cookieAccept">${acceptText}</button>
            </div>
        </div>
    `;
    document.body.appendChild(banner);

    // Google Analytics loader
    window.loadGoogleAnalytics = function() {
        if (window._gaLoaded) return;
        window._gaLoaded = true;
        var script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-390M46ZYB9';
        document.head.appendChild(script);
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', 'G-390M46ZYB9');
    };

    // Check consent
    var consent = localStorage.getItem('psorelya_cookies');
    if (!consent) {
        banner.style.display = 'block';
    } else if (consent === 'accepted') {
        loadGoogleAnalytics();
    }

    // Buttons
    document.getElementById('cookieAccept').addEventListener('click', function() {
        localStorage.setItem('psorelya_cookies', 'accepted');
        banner.style.display = 'none';
        loadGoogleAnalytics();
    });
    document.getElementById('cookieRefuse').addEventListener('click', function() {
        localStorage.setItem('psorelya_cookies', 'refused');
        banner.style.display = 'none';
    });
})();

// Fermer le menu hamburger au scroll et au clic extérieur
(function() {
    function fermerMenu() {
        var menu = document.getElementById('mon-menu');
        if (menu) menu.classList.remove('show');
    }
    window.addEventListener('scroll', fermerMenu, { passive: true });
    document.addEventListener('click', function(e) {
        var menu = document.getElementById('mon-menu');
        var btn = document.getElementById('menu-btn');
        if (menu && btn && !menu.contains(e.target) && !btn.contains(e.target)) {
            fermerMenu();
        }
    });
})();

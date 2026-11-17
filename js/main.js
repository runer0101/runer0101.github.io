(function () {
    "use strict";

    /* ============================================
       STATE
       ============================================ */
    var STORAGE_KEY = "lang";
    var TEXT = {
        es: { open: "Abrir menú", close: "Cerrar menú", switchTo: "Cambiar idioma a inglés" },
        en: { open: "Open menu", close: "Close menu", switchTo: "Switch language to Spanish" }
    };

    function readLang() {
        try {
            return localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "es";
        } catch (e) {
            /* Storage can be blocked; the page still works in Spanish. */
            return "es";
        }
    }

    function storeLang(value) {
        try {
            localStorage.setItem(STORAGE_KEY, value);
        } catch (e) {
            /* Same as above: the switch works for this page view only. */
        }
    }

    var lang = readLang();

    /* ============================================
       DOM ELEMENTS
       ============================================ */
    var langBtn = document.getElementById("langBtn");
    var menuToggle = document.getElementById("menuToggle");
    var navLinks = document.getElementById("navLinks");
    var nav = document.querySelector("nav");

    /* ============================================
       LANGUAGE SWITCHER
       ============================================ */
    function setLang(nextLang) {
        lang = nextLang;
        storeLang(lang);
        document.documentElement.lang = lang;

        langBtn.textContent = lang === "es" ? "EN" : "ES";
        langBtn.setAttribute("aria-label", TEXT[lang].switchTo);

        var elements = document.querySelectorAll("[data-es][data-en]");
        for (var i = 0; i < elements.length; i++) {
            elements[i].innerHTML = elements[i].getAttribute("data-" + lang);
        }

        // Title, description and Open Graph carry their text in a content attribute.
        var metaElements = document.querySelectorAll("[data-es-content][data-en-content]");
        for (var m = 0; m < metaElements.length; m++) {
            metaElements[m].setAttribute(
                "content",
                metaElements[m].getAttribute("data-" + lang + "-content")
            );
        }

        updateMenuLabel();
    }

    langBtn.addEventListener("click", function () {
        setLang(lang === "es" ? "en" : "es");
    });

    /* ============================================
       MOBILE MENU
       ============================================ */
    function isMenuOpen() {
        return navLinks.classList.contains("open");
    }

    function updateMenuLabel() {
        menuToggle.setAttribute(
            "aria-label",
            isMenuOpen() ? TEXT[lang].close : TEXT[lang].open
        );
    }

    function setMenuOpen(open) {
        navLinks.classList.toggle("open", open);
        menuToggle.classList.toggle("open", open);
        menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
        updateMenuLabel();
    }

    menuToggle.addEventListener("click", function () {
        setMenuOpen(!isMenuOpen());
    });

    // Close menu when clicking a nav link
    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            setMenuOpen(false);
        });
    });

    /* ============================================
       NAV SCROLL EFFECT
       ============================================ */
    function onScroll() {
        if (window.scrollY > 50) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    /* ============================================
       ACTIVE NAV LINK (IntersectionObserver)
       ============================================ */
    var sections = document.querySelectorAll("section[id]");

    var observerOptions = {
        root: null,
        rootMargin: "-40% 0px -55% 0px",
        threshold: 0
    };

    var activeLink = null;

    var sectionObserver = new IntersectionObserver(function (entries) {
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].isIntersecting) {
                var id = entries[i].target.getAttribute("id");

                if (activeLink) {
                    activeLink.classList.remove("active");
                }

                var link = navLinks.querySelector('a[data-section="' + id + '"]');
                if (link) {
                    link.classList.add("active");
                    activeLink = link;
                }
            }
        }
    }, observerOptions);

    for (var s = 0; s < sections.length; s++) {
        sectionObserver.observe(sections[s]);
    }

    /* ============================================
       SCROLL REVEAL ANIMATIONS
       ============================================ */
    var revealObserver = new IntersectionObserver(
        function (entries) {
            for (var i = 0; i < entries.length; i++) {
                if (entries[i].isIntersecting) {
                    entries[i].target.classList.add("visible");
                    revealObserver.unobserve(entries[i].target);
                }
            }
        },
        { root: null, rootMargin: "0px 0px -60px 0px", threshold: 0.1 }
    );

    var revealElements = document.querySelectorAll(".reveal, .reveal-children");
    for (var r = 0; r < revealElements.length; r++) {
        revealObserver.observe(revealElements[r]);
    }

    /* ============================================
       CURRENT YEAR
       ============================================ */
    var yearSpan = document.getElementById("currentYear");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    /* ============================================
       KEYBOARD SUPPORT: Close menu with Escape
       ============================================ */
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && isMenuOpen()) {
            setMenuOpen(false);
            menuToggle.focus();
        }
    });

    /* ============================================
       INITIAL LANGUAGE SETUP
       ============================================ */
    setLang(lang);
})();

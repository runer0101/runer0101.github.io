(function () {
    "use strict";

    /* ============================================
       STATE
       ============================================ */
    var lang = localStorage.getItem("lang") || "es";

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
        localStorage.setItem("lang", lang);
        langBtn.textContent = lang === "es" ? "EN" : "ES";
        document.documentElement.lang = lang;

        var elements = document.querySelectorAll("[data-es][data-en]");
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            var attr = "data-" + lang;
            el.innerHTML = el.getAttribute(attr);
        }
    }

    langBtn.addEventListener("click", function () {
        setLang(lang === "es" ? "en" : "es");
    });

    /* ============================================
       INITIAL LANGUAGE SETUP
       ============================================ */
    if (lang !== "es") {
        setLang(lang);
    } else {
        langBtn.textContent = "EN";
    }

    /* ============================================
       MOBILE MENU
       ============================================ */
    menuToggle.addEventListener("click", function () {
        var isOpen = navLinks.classList.toggle("open");
        menuToggle.classList.toggle("open", isOpen);
        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? (lang === "es" ? "Cerrar menú" : "Close menu")
                : (lang === "es" ? "Abrir menú" : "Open menu")
        );
    });

    // Close menu when clicking a nav link
    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("open");
            menuToggle.classList.remove("open");
        });
    });

    /* ============================================
       NAV SCROLL EFFECT
       ============================================ */
    var lastScrollY = window.scrollY;

    function onScroll() {
        var scrollY = window.scrollY;

        // Add "scrolled" class when past hero
        if (scrollY > 50) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }

        lastScrollY = scrollY;
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

                // Remove active from previous
                if (activeLink) {
                    activeLink.classList.remove("active");
                }

                // Add active to current
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
        if (e.key === "Escape" && navLinks.classList.contains("open")) {
            navLinks.classList.remove("open");
            menuToggle.classList.remove("open");
            menuToggle.focus();
        }
    });

})();

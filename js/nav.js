import { currentLang, onLanguageChange } from "./i18n.js";

const LABELS = {
    es: { open: "Abrir menú", close: "Cerrar menú" },
    en: { open: "Open menu", close: "Close menu" }
};

export function initNav() {
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const nav = document.querySelector("nav");
    if (!menuToggle || !navLinks) {
        return;
    }

    function isOpen() {
        return navLinks.classList.contains("open");
    }

    function updateLabel() {
        menuToggle.setAttribute(
            "aria-label",
            isOpen() ? LABELS[currentLang()].close : LABELS[currentLang()].open
        );
    }

    function setOpen(open) {
        navLinks.classList.toggle("open", open);
        menuToggle.classList.toggle("open", open);
        menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
        updateLabel();
    }

    menuToggle.addEventListener("click", function () {
        setOpen(!isOpen());
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            setOpen(false);
        });
    });

    document.addEventListener("keydown", function (ev) {
        if (ev.code === "Escape" && isOpen()) {
            setOpen(false);
            menuToggle.focus();
        }
    });

    // The header gains a shadow once the hero is behind the user.
    if (nav) {
        window.addEventListener(
            "scroll",
            function () {
                nav.classList.toggle("scrolled", window.scrollY > 50);
            },
            { passive: true }
        );
    }

    // Marks the section currently in the reading band of the viewport.
    const sections = document.querySelectorAll("section[id]");
    let activeLink = null;
    const observer = new IntersectionObserver(
        function (entries) {
            for (let i = 0; i < entries.length; i++) {
                if (!entries[i].isIntersecting) {
                    continue;
                }
                const link = navLinks.querySelector(
                    'a[data-section="' + entries[i].target.getAttribute("id") + '"]'
                );
                if (link) {
                    if (activeLink) {
                        activeLink.classList.remove("active");
                    }
                    link.classList.add("active");
                    activeLink = link;
                }
            }
        },
        { root: null, rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach(function (section) {
        observer.observe(section);
    });

    onLanguageChange(updateLabel);
}

import { readStored, writeStored } from "./storage.js";

const STORAGE_KEY = "lang";

const TEXT = {
    es: { switchTo: "Cambiar idioma a inglés" },
    en: { switchTo: "Switch language to Spanish" }
};

let lang = readStored(STORAGE_KEY, "es") === "en" ? "en" : "es";
const listeners = [];

export function currentLang() {
    return lang;
}

export function onLanguageChange(listener) {
    listeners.push(listener);
}

// Everything visible in both languages carries data-es/data-en; the few strings
// that live in an attribute use data-es-content/data-en-content.
export function setLang(next) {
    lang = next;
    writeStored(STORAGE_KEY, lang);
    document.documentElement.lang = lang;

    const button = document.getElementById("langBtn");
    if (button) {
        button.textContent = lang === "es" ? "EN" : "ES";
        button.setAttribute("aria-label", TEXT[lang].switchTo);
    }

    const elements = document.querySelectorAll("[data-es][data-en]");
    for (let i = 0; i < elements.length; i++) {
        elements[i].innerHTML = elements[i].getAttribute("data-" + lang);
    }

    const meta = document.querySelectorAll("[data-es-content][data-en-content]");
    for (let i = 0; i < meta.length; i++) {
        meta[i].setAttribute("content", meta[i].getAttribute("data-" + lang + "-content"));
    }

    listeners.forEach(function (listener) {
        listener(lang);
    });
}

export function initI18n() {
    const button = document.getElementById("langBtn");
    if (button) {
        button.addEventListener("click", function () {
            setLang(lang === "es" ? "en" : "es");
        });
    }
    setLang(lang);
}

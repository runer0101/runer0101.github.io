import { writeStored } from "./storage.js";

// The theme attribute is set by the inline script in <head> before the first
// paint; this module only keeps the control in sync and remembers the choice.
const STORAGE_KEY = "theme";

const LABELS = {
    dark: "Cambiar a tema claro",
    light: "Cambiar a tema oscuro"
};

export function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function apply(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const button = document.getElementById("themeBtn");
    if (button) {
        button.setAttribute("aria-label", LABELS[theme]);
        button.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
    }
}

export function initTheme() {
    apply(currentTheme());

    const button = document.getElementById("themeBtn");
    if (!button) {
        return;
    }

    button.addEventListener("click", function () {
        const next = currentTheme() === "light" ? "dark" : "light";
        writeStored(STORAGE_KEY, next);
        apply(next);
    });
}

import { initI18n } from "./i18n.js";
import { initNav } from "./nav.js";
import { initReveal } from "./reveal.js";
import { initTheme } from "./theme.js";

initTheme();
initNav();
initReveal();

const year = document.getElementById("currentYear");
if (year) {
    year.textContent = new Date().getFullYear();
}

initI18n();

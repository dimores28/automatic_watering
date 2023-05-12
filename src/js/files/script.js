// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

document.querySelector('.request-call__button')?.addEventListener('click', function(e) {
    document.querySelector('.request-call')?.classList.toggle('_show');
});


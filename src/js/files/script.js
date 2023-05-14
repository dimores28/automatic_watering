// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

document
  .querySelector(".request-call__button")
  ?.addEventListener("click", function (e) {
    document.querySelector(".request-call")?.classList.toggle("_show");
  });

function isValidPhone(p) {
  var phoneRe = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
  var digits = p.replace(/\D/g, "");
  return phoneRe.test(digits);
}

function isValidEmail(value) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(value);
}

const requestFormPhone = document.querySelector("#phone");
requestFormPhone?.addEventListener("input", function () {
  if (!isValidPhone(requestFormPhone.value)) {
    requestFormPhone.classList.add("_notvalid");
  } else {
    requestFormPhone.classList.remove("_notvalid");
  }
});

const requestForm = document.querySelector("#request-call");
requestForm?.addEventListener("submit", async function (e) {
  e.preventDefault();

  let formData = new FormData(requestForm);

  if (isValidPhone(requestFormPhone.value)) {
    requestForm.classList.add("_sending");
    let response = await fetch("sendmail.php", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      let result = await response.json();
      alert(result.message);
      requestForm.reset();
      requestForm.classList.remove("_sending");
    } else {
      alert("Ошибка");
      requestForm.classList.remove("_sending");
    }
  } else {
    alert("Заполните обязательные поля!");
  }
});

const footerEmail = document.querySelector("#footerEmail");
const footerPhone = document.querySelector("#footerPhone");

footerPhone?.addEventListener("input", function () {
  if (!isValidPhone(footerPhone.value)) {
    footerPhone.classList.add("_notvalid");
  } else {
    footerPhone.classList.remove("_notvalid");
  }
});

footerEmail?.addEventListener("input", function () {
  if (!isValidEmail(footerEmail.value)) {
    footerEmail.classList.add("_notvalid");
  } else {
    footerEmail.classList.remove("_notvalid");
  }
});

const footerForm = document.querySelector("#footerForm");
footerForm?.addEventListener("submit", async function (e) {
  e.preventDefault();

  let error =
    isValidEmail(footerEmail.value) && isValidPhone(footerPhone.value);

  let formData = new FormData(footerForm);

  if (error) {
    footerForm.classList.add("_sending");

    let response = await fetch("sendmail.php", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      let result = await response.json();
      alert(result.message);
      footerForm.reset();
      footerForm.classList.remove("_sending");
    } else {
      alert("Ошибка");
      footerForm.classList.remove("_sending");
    }
  } else {
    alert("Заполните обязательные поля!");
  }
});

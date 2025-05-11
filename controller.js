// controller.js
import { fetchHoroscope } from "./model.js";
import {
  disableButton,
  enableButton,
  clearView,
  renderHoroscope,
  renderError,
  fadeOut,
  verifyDate,
  getZodiacSign,
} from "./view.js";

let hideTimeout;

async function showHoroscope() {
  disableButton();
  clearTimeout(hideTimeout);
  clearView();
  const rawDate = document.getElementById("birthdate").value;

  const [year, month, day] = rawDate.split("-");
  console.log("Fecha de nacimiento:", month, day, year);
  const { sign, emoji } = getZodiacSign(Number(day), Number(month));
  console.log("Signo zodiacal:", sign, emoji);
  const data = await fetchHoroscope(sign);
  console.log("Datos del horóscopo:", data);
  if (!data) {
    renderError();
    hideTimeout = setTimeout(() => {
      clearView();
      enableButton();
    }, 15000);
    return;
  }
  data.emoji = emoji;
  data.sign = sign;
  data.birthdate = `${day}-${month}-${year}`;
  renderHoroscope(data);
  // fade-out a los 5s
  hideTimeout = setTimeout(fadeOut, 15000);
  // limpiar y reactivar botón al cumplir 6s
  setTimeout(() => {
    clearView();
    enableButton();
  }, 16000);
}

document.getElementById("birthdate").addEventListener("change", verifyDate);
document
  .getElementById("get-horoscope")
  .addEventListener("click", showHoroscope);

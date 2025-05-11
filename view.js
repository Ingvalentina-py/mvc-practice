// view.js
const container = document.getElementById("horoscope-container");
const button = document.getElementById("get-horoscope");

function validateDateFormat(date) {
  const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
  return regex.test(date);
}

export function getZodiacSign(day, month) {
  const zodiacSigns = [
    { sign: "capricorn", emoji: "🐐", start: { day: 22, month: 12 }, end: { day: 19, month: 1 } },
    { sign: "aquarius", emoji: "🏺", start: { day: 20, month: 1 }, end: { day: 18, month: 2 } },
    { sign: "pisces", emoji: "🐟", start: { day: 19, month: 2 }, end: { day: 20, month: 3 } },
    { sign: "aries", emoji: "🐏", start: { day: 21, month: 3 }, end: { day: 19, month: 4 } },
    { sign: "taurus", emoji: "🐂", start: { day: 20, month: 4 }, end: { day: 20, month: 5 } },
    { sign: "gemini", emoji: "👯", start: { day: 21, month: 5 }, end: { day: 20, month: 6 } },
    { sign: "cancer", emoji: "🦀", start: { day: 21, month: 6 }, end: { day: 22, month: 7 } },
    { sign: "leo", emoji: "🦁", start: { day: 23, month: 7 }, end: { day: 22, month: 8 } },
    { sign: "virgo", emoji: "👩", start: { day: 23, month: 8 }, end: { day: 22, month: 9 } },
    { sign: "libra", emoji: "⚖️", start: { day: 23, month: 9 }, end: { day: 22, month: 10 } },
    { sign: "scorpio", emoji: "🦂", start: { day: 23, month: 10 }, end: { day: 21, month: 11 } },
    { sign: "sagittarius", emoji: "🏹", start: { day: 22, month: 11 }, end: { day: 21, month: 12 } },
  ];

  for (let i = 0; i < zodiacSigns.length; i++) {
    const { sign, emoji, start, end } = zodiacSigns[i];
    if (
      (month === start.month && day >= start.day) ||
      (month === end.month && day <= end.day)
    ) {
      return { sign, emoji };
    }
  }

  return { sign: "capricorn", emoji: "🐐" }; // Valor por defecto
}

export function verifyDate() {
  const rawDate = document.getElementById("birthdate").value;
  if (!rawDate) return;

  // Convertimos a DD-MM-AAAA
  const [year, month, day] = rawDate.split("-");
  const formattedDate = `${day}-${month}-${year}`;

  if (validateDateFormat(formattedDate)) {
    console.log("Fecha válida:", formattedDate);
    enableButton();
  } else {
    alert("Formato inválido. Usa DD-MM-AAAA.");
    input.value = "";
    disableButton();
  }
}

export function disableButton() {
  button.disabled = true;
}

export function enableButton() {
  button.disabled = false;
}

export function clearView() {
  container.innerHTML = "";
  container.classList.remove("visible", "fade-out");
}

export function renderHoroscope({ horoscope_data, date, emoji, sign, birthdate  }) {
  // Primero aplicamos la clase fade-out para la animación
  console.log(horoscope_data, date, emoji);
  container.classList.add("fade-out");
  
  // Formateamos la fecha para mostrarla en español
  const formattedDate = new Date(date).toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
    
  // Esperamos un momento para que la animación de fade-out termine
  setTimeout(() => {
    // Actualizamos el contenido con un diseño más atractivo
    container.innerHTML = `
      <div class="sign-icon">${emoji}</div>
      <h2>${sign}</h2>
      <div class="sign-dates">${birthdate}</div>
      <div class="horoscope-text">${horoscope_data}</div>
      <div class="date-display">Horóscopo para ${formattedDate}</div>
    `;
    
    // Aplicamos la clase visible para la animación de entrada
    container.classList.remove("fade-out");
    container.classList.add("visible");
  }, 300);
}

export function renderError() {
  container.textContent =
    "Error al obtener el consejo. Mira la consola para detalles.";
  container.classList.add("visible");
}

export function fadeOut() {
  container.classList.add("fade-out");
}

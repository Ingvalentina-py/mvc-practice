const API_URL = `https://horoscope-app-api.vercel.app/api/v1/get-horoscope`;
const proxy = "https://cors-anywhere.herokuapp.com/";

export async function fetchHoroscope(sign) {
  try {
    const url = `${proxy}${API_URL}/daily?sign=${sign}&day=TODAY`;

    const response = await fetch(url, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    const { date, horoscope_data } = data.data;
    return {date,horoscope_data};
  } catch (error) {
    console.error("Fetch error details:", error);
    return null;
  }
}

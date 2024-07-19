import { getCoordinates } from "./helper.js";

axios.defaults.baseURL = "https://api.openweathermap.org/data/2.5/";

let h2 = document.querySelector("h2");
let p = document.querySelector("p");

async function getCurrentWeather(cityName = "kathmandu") {
  try {
    let { lat, lon, country, name } = await getCoordinates(cityName);
    let response = await axios.get(
      `/weather?lat=${lat}&lon=${lon}&units=metric&appid=80514d89abfbae865491be2e2d570c7f`
    );

    if (response?.status !== 200 || response?.statusText !== "OK") {
      throw new Error("Failed to forecast weather");
    }
    let data = response?.data;
    console.log(data, "curent weather data>>>");
    h2.innerHTML = name;
    p.innerHTML = `temperature: ${Math.floor(data.main.temp)} &deg;C`;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}
getCurrentWeather();

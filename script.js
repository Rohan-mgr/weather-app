import {
  getCurrentWeather,
  // getWeatherMap,
  getweatherForeCasts,
} from "./api.js";

let p = document.querySelector("p");

getCurrentWeather();
getweatherForeCasts();
// getWeatherMap();

let searchForm = document.querySelector(".search__bar");
let searchInput = document.querySelector("#location");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getCurrentWeather(searchInput.value);
  getweatherForeCasts(searchInput.value);
});

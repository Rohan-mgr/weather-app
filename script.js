import { getCurrentWeather, getweatherForeCasts } from "./api.js";

getCurrentWeather();
getweatherForeCasts();

let searchForm = document.querySelector(".search__bar");
let searchInput = document.querySelector("#location");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getCurrentWeather(searchInput.value);
  getweatherForeCasts(searchInput.value);
});

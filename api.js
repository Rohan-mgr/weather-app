import { formatDate, formatTime, formatUnixTimestamp } from "./helper.js";

axios.defaults.baseURL = "https://api.openweathermap.org/data/2.5/";

export async function getCoordinates(cityName) {
  try {
    let response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=80514d89abfbae865491be2e2d570c7f`
    );
    if (response?.status !== 200 || response?.statusText !== "OK") {
      throw new Error("Failed to forecast weather");
    }
    let data = response?.data[0];
    let geoInfo = {
      // country: data.country,
      lat: data.lat,
      lon: data.lon,
      name: data.name,
    };

    console.log(response, "geo coding response");
    return geoInfo;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// export async function getWeatherMap() {
//   let weatherMap = document.querySelector(".weather__map");
//   try {
//     let response = await axios.get(
//       `https://tile.openweathermap.org/map/temp_new/2/2/2.png?appid=80514d89abfbae865491be2e2d570c7f`
//     );
//     if (response?.status !== 200 || response?.statusText !== "OK") {
//       throw new Error("Failed to forecast weather");
//     }

//     console.log(response, "geo coding response");
//     weatherMap.innerHTML = `<img src='https://tile.openweathermap.org/map/temp_new/2/2/2.png?appid=80514d89abfbae865491be2e2d570c7f' alt="temp-map" />`;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

export async function getweatherForeCasts(cityName = "chabahil") {
  let forecastWrapper = document.querySelector(".each__forecast__wrapper");
  let tommorrowForecast = document.querySelector(
    ".tomorrow__forecaset__wrapper"
  );
  try {
    let { lat, lon, name } = await getCoordinates(cityName);
    let response = await axios.get(
      `forecast?lat=${lat}&lon=${lon}&units=metric&cnt=8&appid=80514d89abfbae865491be2e2d570c7f`
    );

    if (response?.status !== 200 || response?.statusText !== "OK") {
      throw new Error("Failed to forecast weather");
    }

    let { data } = response;
    console.log("weather forecasts>>>>>", data.list.slice(1, 8));
    forecastWrapper.innerHTML = data.list
      .slice(1, 8)
      .map((w) => {
        return `
      <div class="each__forecast">
                <img
                  src="https://openweathermap.org/img/wn/${
                    w.weather[0].icon
                  }.png"
                  alt="cloud"
                  width="80px"
                  height="80px"
                />
                <p>${Math.floor(w.main.temp)}&deg;C</p>
                <p>${formatTime(w.dt_txt)}</p>
      </div>`;
      })
      .join("");
    tommorrowForecast.innerHTML = `<div class="tommorow__forecast">
              <div>
              <img
                src="https://openweathermap.org/img/wn/${
                  data.list[0].weather[0].icon
                }.png"
                alt="cloud"
                width="110px"
                height="110px"
              />
              <div style="display: flex; flex-direction: column;">
                <p>in next 3 hours</p>
                <h2>${Math.floor(data.list[0].main.temp)}&deg;C</h2>
                <p>${data.list[0].weather[0].description}</p>
              </div>
              <div>
              <img src='./assets/graph.png' alt="graph" style="width:auto; height: 60px" />
            </div>`;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getCurrentWeather(cityName = "chabahil") {
  let currentTemp = document.querySelector("#default_weather__details");
  let currentWeatherDesc = document.querySelector(
    "#default_weather_description"
  );
  let countryTag = document.querySelector("#country");
  let dateTag = document.querySelector("#date");

  let windState = document.querySelector("#windState");
  let maxTemp = document.querySelector("#maxTemp");
  let sunrise = document.querySelector("#sunrise");
  let sunset = document.querySelector("#sunset");

  let humidity = document.querySelector("#humidity");
  let visibility = document.querySelector("#visibility");
  let feelsLike = document.querySelector("#feelsLike");

  try {
    let { lat, lon, name } = await getCoordinates(cityName);
    let response = await axios.get(
      `/weather?lat=${lat}&lon=${lon}&units=metric&appid=80514d89abfbae865491be2e2d570c7f`
    );

    if (response?.status !== 200 || response?.statusText !== "OK") {
      throw new Error("Failed to forecast weather");
    }
    let data = response?.data;
    console.log(data, "current weather data >>>");
    currentTemp.innerHTML = `${Math.floor(data.main.temp)} &deg;C`;
    currentWeatherDesc.innerHTML =
      `<img class="weather__icon" src='https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png' alt="weather-icon" />` +
      data.weather[0].description;
    countryTag.innerHTML = `${name}, ${data.sys.country}`;
    dateTag.innerHTML = formatDate(new Date());

    windState.innerHTML = data.wind.speed;
    maxTemp.innerHTML = Math.floor(data.main.temp_max);
    sunrise.innerHTML = formatUnixTimestamp(data.sys.sunrise);
    sunset.innerHTML = formatUnixTimestamp(data.sys.sunset);

    humidity.innerHTML = data.main.humidity;
    visibility.innerHTML = Math.floor(data.visibility / 1000);
    feelsLike.innerHTML = Math.floor(data.main.feels_like);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

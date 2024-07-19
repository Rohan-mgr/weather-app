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
      country: data.country,
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

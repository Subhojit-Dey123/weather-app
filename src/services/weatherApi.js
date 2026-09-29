const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const CURRENT_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";

const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

export async function getWeatherByCity(city, unit = "metric") {
  if (!API_KEY) {
    throw new Error("OpenWeather API key is missing. Check your .env file.");
  }

  const encodedCity = encodeURIComponent(city);

  const currentResponse = await fetch(
    `${CURRENT_WEATHER_URL}?q=${encodedCity}&units=${unit}&appid=${API_KEY}`,
  );

  if (!currentResponse.ok) {
    if (currentResponse.status === 404) {
      throw new Error("City not found. Please enter a valid city name.");
    }

    if (currentResponse.status === 401) {
      throw new Error("Invalid OpenWeather API key.");
    }

    throw new Error("Unable to fetch current weather.");
  }

  const currentData = await currentResponse.json();

  const forecastResponse = await fetch(
    `${FORECAST_URL}?q=${encodedCity}&units=${unit}&appid=${API_KEY}`,
  );

  if (!forecastResponse.ok) {
    if (forecastResponse.status === 401) {
      throw new Error("Invalid OpenWeather API key.");
    }

    throw new Error("Unable to fetch weather forecast.");
  }

  const forecastData = await forecastResponse.json();

  return {
    current: currentData,
    forecast: forecastData,
  };
}

export async function getWeatherByCoordinates(
  latitude,
  longitude,
  unit = "metric",
) {
  if (!API_KEY) {
    throw new Error("OpenWeather API key is missing. Check your .env file.");
  }

  const currentResponse = await fetch(
    `${CURRENT_WEATHER_URL}?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${API_KEY}`,
  );

  if (!currentResponse.ok) {
    if (currentResponse.status === 401) {
      throw new Error("Invalid OpenWeather API key.");
    }

    throw new Error("Unable to fetch weather for your location.");
  }

  const currentData = await currentResponse.json();

  const forecastResponse = await fetch(
    `${FORECAST_URL}?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${API_KEY}`,
  );

  if (!forecastResponse.ok) {
    if (forecastResponse.status === 401) {
      throw new Error("Invalid OpenWeather API key.");
    }

    throw new Error("Unable to fetch weather forecast.");
  }

  const forecastData = await forecastResponse.json();

  return {
    current: currentData,
    forecast: forecastData,
  };
}

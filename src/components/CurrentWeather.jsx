import React from "react";
import { Sunrise, Sunset, Wind, Droplets, Eye, Gauge } from "lucide-react";

function CurrentWeather({ weatherData, unit }) {
  const weather = weatherData.current;

  const temperature = Math.round(weather.main.temp);
  const feelsLike = Math.round(weather.main.feels_like);

  const condition = weather.weather[0].main;
  const description = weather.weather[0].description;
  const iconCode = weather.weather[0].icon;

  const temperatureUnit = unit === "metric" ? "°C" : "°F";

  const windSpeed = Math.round(weather.wind.speed);
  const windUnit = unit === "metric" ? "m/s" : "mph";

  const visibilityKm = weather.visibility / 1000;

  const visibility =
    unit === "metric"
      ? `${Math.round(visibilityKm)} km`
      : `${Math.round(visibilityKm * 0.621371)} mi`;

  function getWindDirection(degrees) {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

    const index = Math.round(degrees / 45) % 8;

    return directions[index];
  }

  function formatCityTime(timestamp) {
    const cityTime = new Date((timestamp + weather.timezone) * 1000);

    return cityTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "UTC",
    });
  }

  const windDirection = getWindDirection(weather.wind.deg);

  const sunrise = formatCityTime(weather.sys.sunrise);
  const sunset = formatCityTime(weather.sys.sunset);
  const updatedTime = formatCityTime(weather.dt);

  return (
    <section className="mt-8">
      <div className="overflow-hidden rounded-2xl border border-blue-100 bg-linear-to-br from-blue-600 to-sky-500 text-white shadow-md">
        <div className="p-5 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-medium text-blue-100">
                Current Weather
              </p>

              <h2 className="mt-1 truncate text-2xl font-bold sm:text-3xl">
                {weather.name}
              </h2>

              <p className="mt-1 text-sm text-blue-100">
                {weather.sys.country}
              </p>
            </div>

            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm sm:h-20 sm:w-20">
              <img
                src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
                alt={description}
                className="h-16 w-16 sm:h-20 sm:w-20"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-start">
                <span className="text-6xl font-bold tracking-tight sm:text-7xl">
                  {temperature}
                </span>

                <span className="ml-2 pt-1 text-2xl font-medium sm:text-3xl">
                  {temperatureUnit}
                </span>
              </div>

              <p className="mt-2 text-sm text-blue-100">
                Feels like {feelsLike}
                {temperatureUnit}
              </p>
            </div>

            <div className="sm:text-right">
              <p className="text-xl font-semibold">{condition}</p>

              <p className="mt-1 text-sm capitalize text-blue-100">
                {description}
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 border-t border-white/20 pt-5 sm:grid-cols-4">
            <WeatherDetail
              icon={<Wind size={17} />}
              label="Wind"
              value={`${windSpeed} ${windUnit}`}
            />

            <WeatherDetail
              icon={<Droplets size={17} />}
              label="Humidity"
              value={`${weather.main.humidity}%`}
            />

            <WeatherDetail
              icon={<Sunrise size={17} />}
              label="Sunrise"
              value={sunrise}
            />

            <WeatherDetail
              icon={<Sunset size={17} />}
              label="Sunset"
              value={sunset}
            />
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <AdditionalInfo
          icon={<Wind size={18} />}
          label="Wind Direction"
          value={windDirection}
        />

        <AdditionalInfo
          icon={<Eye size={18} />}
          label="Visibility"
          value={visibility}
        />

        <AdditionalInfo
          icon={<Gauge size={18} />}
          label="Pressure"
          value={`${weather.main.pressure} hPa`}
        />
      </div>

      <div className="mt-3 text-right">
        <p className="text-xs text-slate-400">Last updated at {updatedTime}</p>
      </div>
    </section>
  );
}

function WeatherDetail({ icon, label, value }) {
  return (
    <div className="rounded-xl bg-white/10 p-3 backdrop-blur-sm">
      <div className="flex items-center gap-2 text-blue-100">
        {icon}
        <span className="text-xs">{label}</span>
      </div>

      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}

function AdditionalInfo({ icon, label, value }) {
  return (
    <div className="rounded-xl border border-blue-100 bg-white p-3 shadow-sm">
      <div className="flex items-center gap-2 text-blue-500">
        {icon}

        <span className="text-xs font-medium text-slate-500">{label}</span>
      </div>

      <p className="mt-2 text-sm font-bold text-blue-950">{value}</p>
    </div>
  );
}

export default CurrentWeather;

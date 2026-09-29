import React from "react";
import { Thermometer, Cloud, Droplets, Gauge, Eye, Wind } from "lucide-react";

function WeatherStats({ weatherData, unit }) {
  const weather = weatherData.current;

  const isMetric = unit === "metric";

  const temperatureUnit = isMetric ? "°C" : "°F";

  const windSpeed = Math.round(weather.wind.speed);
  const windUnit = isMetric ? "m/s" : "mph";

  const visibilityKm = weather.visibility / 1000;

  const visibility =
    unit === "metric"
      ? `${Math.round(visibilityKm)} km`
      : `${Math.round(visibilityKm * 0.621371)} mi`;

  const stats = [
    {
      id: 1,
      label: "Feels Like",
      value: `${Math.round(weather.main.feels_like)}${temperatureUnit}`,
      description: "Apparent temperature",
      icon: Thermometer,
    },
    {
      id: 2,
      label: "Cloudiness",
      value: `${weather.clouds.all}%`,
      description: "Cloud coverage",
      icon: Cloud,
    },
    {
      id: 3,
      label: "Humidity",
      value: `${weather.main.humidity}%`,
      description: "Relative humidity",
      icon: Droplets,
    },
    {
      id: 4,
      label: "Pressure",
      value: `${weather.main.pressure} hPa`,
      description: "Atmospheric pressure",
      icon: Gauge,
    },
    {
      id: 5,
      label: "Visibility",
      value: visibility,
      description: "Current visibility",
      icon: Eye,
    },
    {
      id: 6,
      label: "Wind Speed",
      value: `${windSpeed} ${windUnit}`,
      description: "Current wind speed",
      icon: Wind,
    },
  ];

  return (
    <section className="mt-7">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-blue-950 sm:text-xl">
          Weather Statistics
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          More details about the current weather conditions.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.id}
              className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
                <Icon size={18} />
              </div>

              <p className="mt-3 text-xs font-medium text-slate-500">
                {stat.label}
              </p>

              <p className="mt-1 text-base font-bold text-blue-950">
                {stat.value}
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-400">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default WeatherStats;

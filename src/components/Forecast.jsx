import React from "react";
import ForecastCard from "./ForecastCard";

function Forecast({ weatherData, unit }) {
  const forecastList = weatherData.forecast.list;

 

  const groupedForecast = {};

  forecastList.forEach((item) => {
    const date = new Date(item.dt * 1000);

    const dateKey = date.toLocaleDateString("en-CA");

    if (!groupedForecast[dateKey]) {
      groupedForecast[dateKey] = [];
    }

    groupedForecast[dateKey].push(item);
  });

  

  const dailyForecast = Object.entries(groupedForecast)
    .slice(0, 5)
    .map(([dateKey, items], index) => {
      /*
        Find the highest temperature of the day.
      */

      const highTemperature = Math.max(
        ...items.map((item) => item.main.temp_max),
      );

      /*
        Find the lowest temperature of the day.
      */

      const lowTemperature = Math.min(
        ...items.map((item) => item.main.temp_min),
      );

      

      const representativeForecast = items.reduce((closest, current) => {
        const closestHour = new Date(closest.dt * 1000).getHours();

        const currentHour = new Date(current.dt * 1000).getHours();

        const closestDifference = Math.abs(12 - closestHour);
        const currentDifference = Math.abs(12 - currentHour);

        return currentDifference < closestDifference ? current : closest;
      }, items[0]);

      const date = new Date(representativeForecast.dt * 1000);

      /*
        First day is displayed as "Today".
      */

      const dayName =
        index === 0
          ? "Today"
          : date.toLocaleDateString("en-US", {
              weekday: "short",
            });

     

      const formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      return {
        id: dateKey,
        day: dayName,
        date: formattedDate,
        condition: representativeForecast.weather[0].main,
        description: representativeForecast.weather[0].description,
        icon: representativeForecast.weather[0].icon,
        high: Math.round(highTemperature),
        low: Math.round(lowTemperature),
      };
    });

  return (
    <section className="mt-8">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-blue-950 sm:text-xl">
          5-Day Forecast
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Weather forecast for the upcoming days.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {dailyForecast.map((forecast) => (
          <ForecastCard
            key={forecast.id}
            day={forecast.day}
            date={forecast.date}
            condition={forecast.condition}
            description={forecast.description}
            icon={forecast.icon}
            high={forecast.high}
            low={forecast.low}
            unit={unit}
          />
        ))}
      </div>
    </section>
  );
}

export default Forecast;

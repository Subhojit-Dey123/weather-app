import React from "react";

function ForecastCard({
  day,
  date,
  condition,
  description,
  icon,
  high,
  low,
  unit,
}) {
  const temperatureUnit = unit === "metric" ? "°C" : "°F";

  return (
    <div className="rounded-xl border border-blue-100 bg-white p-3 text-center shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md sm:p-4">
      {/* Day */}
      <p className="text-sm font-semibold text-blue-950">{day}</p>

      {/* Date */}
      <p className="mt-1 text-xs text-slate-400">{date}</p>

      {/* Icon */}
      <div className="my-2 flex justify-center sm:my-3">
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
          className="h-12 w-12 sm:h-14 sm:w-14"
        />
      </div>

      {/* Condition */}
      <p className="min-h-[32px] text-xs font-medium capitalize text-slate-600">
        {condition}
      </p>

      {/* Temperature */}
      <div className="mt-3 flex items-center justify-center gap-2">
        <span className="text-sm font-bold text-blue-950">
          {high}
          {temperatureUnit}
        </span>

        <span className="text-sm text-slate-400">
          {low}
          {temperatureUnit}
        </span>
      </div>
    </div>
  );
}

export default ForecastCard;

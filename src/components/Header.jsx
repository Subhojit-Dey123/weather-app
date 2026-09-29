import React from "react";
import { CloudSun } from "lucide-react";

function Header({ unit, onUnitChange }) {
  return (
    <header className="flex items-center justify-between border-b border-blue-100 pb-4">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50">
          <CloudSun className="h-7 w-7 text-blue-500" />
        </div>

        <h1 className="text-lg font-bold text-blue-950 sm:text-xl">
          WeatherApp
        </h1>
      </div>

      <div className="flex items-center rounded-lg border border-blue-100 bg-white p-1 text-sm shadow-sm">
        <button
          type="button"
          onClick={() => onUnitChange("metric")}
          className={`rounded-md px-2.5 py-1 font-semibold transition cursor-pointer ${
            unit === "metric"
              ? "bg-blue-600 text-white"
              : "text-blue-800 hover:bg-blue-50"
          }`}
        >
          °C
        </button>

        <button
          type="button"
          onClick={() => onUnitChange("imperial")}
          className={`rounded-md px-2.5 py-1 font-semibold transition cursor-pointer ${
            unit === "imperial"
              ? "bg-blue-600 text-white"
              : "text-blue-800 hover:bg-blue-50"
          }`}
        >
          °F
        </button>
      </div>
    </header>
  );
}

export default Header;

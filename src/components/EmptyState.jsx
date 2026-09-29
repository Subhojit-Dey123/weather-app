import React from "react";
import { CloudSun, MapPin, Search } from "lucide-react";

function EmptyState({ onCitySelect }) {
  const popularCities = ["Hyderabad", "Delhi", "Mumbai", "Bangalore"];

  return (
    <section className="mt-8 border-t border-blue-100 px-2 pt-10 text-center sm:mt-10 sm:pt-12">
      {/* Main Icon */}
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 sm:h-24 sm:w-24">
        <CloudSun className="h-11 w-11 text-blue-500 sm:h-14 sm:w-14" />
      </div>

      {/* Heading */}
      <h2 className="mt-6 text-2xl font-bold text-blue-950 sm:text-3xl">
        Check the weather
      </h2>

      {/* Description */}
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 sm:text-base">
        Search for any city to get current weather conditions, detailed
        statistics, and a 5-day forecast.
      </p>

      {/* Popular Cities */}
      <div className="mt-8">
        <div className="mb-3 flex items-center justify-center gap-2">
          <Search size={16} className="text-blue-500" />

          <p className="text-sm font-medium text-slate-600">
            Try a popular city
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2.5">
          {popularCities.map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => onCitySelect(city)}
              className="flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-blue-800 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 active:scale-95"
            >
              <MapPin size={15} />

              {city}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EmptyState;

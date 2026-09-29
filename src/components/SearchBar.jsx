import React, { useState } from "react";
import { MapPin, Search } from "lucide-react";
import LocationButton from "./LocationButton";

function SearchBar({ onSearch, onLocationRequest, locationLoading,  onClearError }) {
  const [city, setCity] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedCity = city.trim();

    if (!trimmedCity) {
      return;
    }

    const success = await onSearch(trimmedCity);

    if (success) {
      setCity("");
    }
  }

  return (
    <section className="mt-6">
      <div className="mb-3">
        <label htmlFor="city-search" className="sr-only">
          Search for a city
        </label>

        <p className="mt-1 text-sm text-slate-500">
          Get the latest weather information for any location.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <MapPin
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            id="city-search"
            type="text"
            value={city}
            onChange={(event) => {
              setCity(event.target.value);
              onClearError();
            }}
            placeholder="Enter city name..."
            className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <button
          type="submit"
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98] sm:px-7 cursor-pointer"
        >
          <Search size={18} />
          <span>Search</span>
        </button>
      </form>
      <LocationButton
        onLocationRequest={onLocationRequest}
        loading={locationLoading}
      />
    </section>
  );
}

export default SearchBar;

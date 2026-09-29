import React, { useState } from "react";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import EmptyState from "./components/EmptyState";
import CurrentWeather from "./components/CurrentWeather";
import WeatherStats from "./components/WeatherStats";
import Forecast from "./components/Forecast";
import RecentSearches from "./components/RecentSearches";

import {
  getWeatherByCity,
  getWeatherByCoordinates,
} from "./services/weatherApi";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [searchCity, setSearchCity] = useState("");
  const [unit, setUnit] = useState("metric");

  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  const [error, setError] = useState("");

  const [recentSearches, setRecentSearches] = useState(() => {
    const savedSearches = localStorage.getItem("recentSearches");

    return savedSearches ? JSON.parse(savedSearches) : [];
  });

  async function fetchWeather(city, selectedUnit = unit) {
    try {
      setLoading(true);
      setError("");

      const data = await getWeatherByCity(city, selectedUnit);

      setWeatherData(data);

      return true;
    } catch (error) {
      setWeatherData(null);
      setError(error.message);

      return false;
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(city) {
    const success = await fetchWeather(city, unit);

    if (!success) {
      return false;
    }

    setSearchCity(city);

    setRecentSearches((previousSearches) => {
      const updatedSearches = [
        city,
        ...previousSearches.filter(
          (previousCity) => previousCity.toLowerCase() !== city.toLowerCase(),
        ),
      ].slice(0, 5);

      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));

      return updatedSearches;
    });

    return true;
  }

  async function handleUnitChange(newUnit) {
    if (newUnit === unit) {
      return;
    }

    setUnit(newUnit);

    if (searchCity) {
      await fetchWeather(searchCity, newUnit);
    }
  }

  function handleClearError() {
    if (error) {
      setError("");
    }
  }

  async function handleLocationRequest() {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLocationLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          setLoading(true);

          const data = await getWeatherByCoordinates(latitude, longitude, unit);

          setWeatherData(data);
          setSearchCity(data.current.name);
          setRecentSearches((previousSearches) => {
            const city = data.current.name;

            const updatedSearches = [
              city,
              ...previousSearches.filter(
                (previousCity) =>
                  previousCity.toLowerCase() !== city.toLowerCase(),
              ),
            ].slice(0, 5);

            localStorage.setItem(
              "recentSearches",
              JSON.stringify(updatedSearches),
            );

            return updatedSearches;
          });
        } catch (error) {
          setWeatherData(null);
          setError(error.message);
        } finally {
          setLoading(false);
          setLocationLoading(false);
        }
      },
      (error) => {
        setLocationLoading(false);

        if (error.code === 1) {
          setError(
            "Location permission was denied. Please allow location access.",
          );
        } else if (error.code === 2) {
          setError("Unable to detect your location.");
        } else if (error.code === 3) {
          setError("Location request timed out. Please try again.");
        } else {
          setError("Unable to detect your location.");
        }
      },
    );
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-blue-50 via-white to-sky-50 px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm sm:p-6">
          <Header unit={unit} onUnitChange={handleUnitChange} />

          <SearchBar
            onSearch={handleSearch}
            onLocationRequest={handleLocationRequest}
            locationLoading={locationLoading}
            onClearError={handleClearError}
          />

          <RecentSearches
            searches={recentSearches}
            onCitySelect={handleSearch}
            onClear={() => {
              localStorage.removeItem("recentSearches");
              setRecentSearches([]);
            }}
          />

          {loading && (
            <div className="mt-10 flex flex-col items-center justify-center py-10">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600"></div>

              <p className="mt-4 text-sm font-medium text-slate-500">
                Fetching weather data...
              </p>
            </div>
          )}

          {!loading && error && (
            <div className="mt-8 rounded-2xl border border-red-100 bg-red-50 px-5 py-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <span className="text-xl font-bold text-red-500">!</span>
              </div>

              <h2 className="mt-4 text-base font-semibold text-red-700">
                Something went wrong
              </h2>

              <p className="mt-1 text-sm text-red-600">{error}</p>

              <p className="mt-2 text-xs text-red-400">
                Please check the city name and try again.
              </p>
            </div>
          )}

          {!loading && !error && weatherData && (
            <>
              <CurrentWeather weatherData={weatherData} unit={unit} />

              <WeatherStats weatherData={weatherData} unit={unit} />

              <Forecast weatherData={weatherData} unit={unit} />
            </>
          )}

          {!loading && !error && !weatherData && (
            <EmptyState onCitySelect={handleSearch} />
          )}
        </div>
      </div>
    </main>
  );
}

export default App;

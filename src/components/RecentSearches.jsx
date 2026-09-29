import React from "react";
import { Clock3, MapPin, Trash2 } from "lucide-react";

function RecentSearches({ searches, onCitySelect, onClear }) {
  if (searches.length === 0) {
    return null;
  }

  return (
    <section className="mt-6">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock3 size={17} className="text-blue-500" />

          <h2 className="text-sm font-semibold text-blue-950">
            Recent searches
          </h2>
        </div>

        <button
          type="button"
          onClick={onClear}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-400 transition hover:text-red-500 cursor-pointer"
        >
          <Trash2 size={14} />
          Clear
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {searches.map((city) => (
          <button
            key={city}
            type="button"
            onClick={() => onCitySelect(city)}
            className="flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-2 text-sm font-medium text-blue-800 transition hover:border-blue-200 hover:bg-blue-100 active:scale-95 cursor-pointer"
          >
            <MapPin size={14} />
            {city}
          </button>
        ))}
      </div>
    </section>
  );
}

export default RecentSearches;

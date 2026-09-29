import React from "react";
import { LocateFixed } from "lucide-react";

function LocationButton({ onLocationRequest, loading }) {
  return (
    <button
      type="button"
      onClick={onLocationRequest}
      disabled={loading}
      className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
    >
      <LocateFixed size={18} />

      {loading ? "Detecting location..." : "Use my location"}
    </button>
  );
}

export default LocationButton;
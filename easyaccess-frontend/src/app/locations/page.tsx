"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchLocations, Location } from "../utils/api";

export default function LocationsPage() {
  const router = useRouter();
  const [locations, setLocations] = useState<Location[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLocations()
      .then(setLocations)
      .catch(() => setError("Failed to load locations."));
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Accessible Locations</h1>
      <button
        className="mb-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        onClick={() => router.push("/locations/add")}
      >
        Add New Location
      </button>
      {error && <p className="text-red-600">{error}</p>}
      {locations.length === 0 && !error && (
        <p>No locations found. Add one!</p>
      )}
      <ul className="space-y-4">
        {locations.map((loc) => (
          <li
            key={loc.id}
            className="border rounded p-4 hover:bg-gray-50 cursor-pointer"
            onClick={() => router.push(`/locations/${loc.id}`)}
          >
            <div className="font-semibold">{loc.name}</div>
            <div className="text-sm text-gray-600">{loc.description}</div>
            <div className="text-xs text-gray-500">
              Lat: {loc.latitude}, Lng: {loc.longitude}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
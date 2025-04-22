"use client";

import { useEffect, useState } from "react";
import { fetchLocations, Location } from "./utils/api";
import dynamic from "next/dynamic";
import FilterBar from "./components/FilterBar";
import LocationCard from "./components/LocationCard";
import { useRouter } from "next/navigation";

const Map = dynamic(() => import("./components/Map"), { ssr: false });

type FilterOptions = {
  country: string;
  city: string;
  village: string;
  wheelchairAccessible: boolean;
  accessibleToilet: boolean;
  wideEntrance: boolean;
  parkingAvailable: boolean;
};

export default function HomePage() {
  const router = useRouter();
  const [locations, setLocations] = useState<Location[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    country: "",
    city: "",
    village: "",
    wheelchairAccessible: false,
    accessibleToilet: false,
    wideEntrance: false,
    parkingAvailable: false,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLocations()
      .then(data => {
        setLocations(Array.isArray(data) ? data : []);
      })
      .catch(() => setError("Failed to load locations."));
  }, []);

  const filteredLocations = Array.isArray(locations)
    ? locations.filter((loc) => {
        if (filters.country && loc.country?.toLowerCase() !== filters.country.toLowerCase()) return false;
        if (filters.city && loc.city?.toLowerCase() !== filters.city.toLowerCase()) return false;
        if (filters.village && loc.village?.toLowerCase() !== filters.village.toLowerCase()) return false;
        if (filters.wheelchairAccessible && !loc.wheelchairAccessible) return false;
        if (filters.accessibleToilet && !loc.accessibleToilet) return false;
        if (filters.wideEntrance && !loc.wideEntrance) return false;
        if (filters.parkingAvailable && !loc.parkingAvailable) return false;
        return true;
      })
    : [];

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-4 text-center">EasyAccess</h1>
      <p className="mb-6 text-center text-gray-700">
        Find and share accessible public spaces in your city. Filter by accessibility features and explore locations on the map!
      </p>
      <FilterBar filters={filters} onChange={setFilters} />
      {error && <p className="text-red-600">{error}</p>}
      <div className="mb-8">
        <Map locations={filteredLocations} />
      </div>
      <h2 className="text-xl font-semibold mb-2">Locations</h2>
      <div className="grid gap-4">
        {filteredLocations.length === 0 ? (
          <p>No locations match your filters.</p>
        ) : (
          filteredLocations.map((loc, idx) => (
            <LocationCard
              key={loc.id ?? `${loc.name}-${loc.latitude}-${loc.longitude}-${idx}`}
              location={loc}
              onClick={() => router.push(`/locations/${loc.id ?? idx}`)}
            />
          ))
        )}
      </div>
    </div>
  );
}
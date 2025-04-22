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

export async function fetchLocationsPaginated(page = 0, size = 10) {
  const res = await fetch(`http://localhost:8080/api/locations?page=${page}&size=${size}`);
  if (!res.ok) throw new Error("Failed to fetch locations");
  return res.json(); // Should return { content, totalPages, ... }
}

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
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchLocationsPaginated(page, 10).then(data => {
      setLocations(data.content); // <-- use the array inside 'content'
      setTotalPages(data.totalPages);
    });
  }, [page]);

  useEffect(() => {
    fetchLocations({
      country: filters.country || undefined,
      city: filters.city || undefined,
      village: filters.village || undefined,
    }).then(setLocations);
  }, [filters.country, filters.city, filters.village]);

  const filteredLocations = locations.filter((loc) => {
    if (filters.wheelchairAccessible && !loc.wheelchairAccessible) return false;
    if (filters.accessibleToilet && !loc.accessibleToilet) return false;
    if (filters.wideEntrance && !loc.wideEntrance) return false;
    if (filters.parkingAvailable && !loc.parkingAvailable) return false;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-4 text-center">EasyAccess</h1>
      <p className="mb-6 text-center text-gray-700">
        Find and share accessible public spaces in your city. Filter by accessibility features and explore locations on the map!
      </p>
      <FilterBar filters={filters} onChange={setFilters} />
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
      <div className="flex justify-between mt-4">
        <button
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {page + 1} of {totalPages}</span>
        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
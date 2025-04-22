"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { fetchLocationById, Location } from "../../utils/api";

export default function LocationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const id = params?.id;
    if (!id) return;
    fetchLocationById(Number(id))
      .then(setLocation)
      .catch(() => setError("Failed to load location."));
  }, [params]);

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!location) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
        <p>Loading location...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{location.name}</h1>
      <p className="mb-2">{location.description}</p>
      <div className="mb-2">
        <span className="font-semibold">Latitude:</span> {location.latitude}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Longitude:</span> {location.longitude}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Wheelchair Accessible:</span>{" "}
        {location.wheelchairAccessible ? "Yes" : "No"}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Accessible Toilet:</span>{" "}
        {location.accessibleToilet ? "Yes" : "No"}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Wide Entrance:</span>{" "}
        {location.wideEntrance ? "Yes" : "No"}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Parking Available:</span>{" "}
        {location.parkingAvailable ? "Yes" : "No"}
      </div>
      <button
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        onClick={() => router.push("/locations")}
      >
        Back to Locations
      </button>
    </div>
  );
}
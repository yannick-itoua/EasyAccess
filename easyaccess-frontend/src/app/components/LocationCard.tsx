"use client";

import { Location } from "../utils/api";

type LocationCardProps = {
  location: Location;
  onClick?: () => void;
};

export default function LocationCard({ location, onClick }: LocationCardProps) {
  return (
    <div
      className="border rounded p-4 shadow hover:bg-gray-50 cursor-pointer transition"
      onClick={onClick}
    >
      <div className="font-semibold text-lg">{location.name}</div>
      <div className="text-sm text-gray-600 mb-2">{location.description}</div>
      <div className="text-xs text-gray-500 mb-1">
        Lat: {location.latitude}, Lng: {location.longitude}
      </div>
      <div className="flex flex-wrap gap-2 text-xs">
        {location.wheelchairAccessible && (
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
            Wheelchair Accessible
          </span>
        )}
        {location.accessibleToilet && (
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
            Accessible Toilet
          </span>
        )}
        {location.wideEntrance && (
          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
            Wide Entrance
          </span>
        )}
        {location.parkingAvailable && (
          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
            Parking Available
          </span>
        )}
      </div>
    </div>
  );
}
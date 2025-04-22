"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

type MapProps = {
  locations: {
    id?: number;
    name: string;
    latitude: number;
    longitude: number;
    description?: string;
  }[];
};

export async function fetchLocations(filters?: {
  country?: string;
  city?: string;
  village?: string;
}): Promise<Location[]> {
  let url = "http://localhost:8080/api/locations";
  const params = new URLSearchParams();
  if (filters?.country) params.append("country", filters.country);
  if (filters?.city) params.append("city", filters.city);
  if (filters?.village) params.append("village", filters.village);
  if ([...params].length > 0) url += `?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch locations");
  return res.json();
}

export default function Map({ locations }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // Create map only once
  useEffect(() => {
    if (!mapRef.current) return;
    if (!leafletMapRef.current) {
      leafletMapRef.current = L.map(mapRef.current).setView([0, 0], 2);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(leafletMapRef.current);
    }
    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  // Update markers when locations change
  useEffect(() => {
    const map = leafletMapRef.current;
    if (!map) return;

    // Remove old markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    if (locations.length > 0) {
      const bounds = L.latLngBounds(
        locations.map((loc) => [loc.latitude, loc.longitude] as [number, number])
      );
      map.fitBounds(bounds);

      locations.forEach((loc) => {
        const marker = L.marker([loc.latitude, loc.longitude])
          .addTo(map)
          .bindPopup(`<b>${loc.name}</b><br/>${loc.description || ""}`);
        markersRef.current.push(marker);
      });
    }
  }, [locations]);

  return (
    <div
      ref={mapRef}
      id="map"
      style={{ height: "400px", width: "100%", borderRadius: "8px" }}
    />
  );
}
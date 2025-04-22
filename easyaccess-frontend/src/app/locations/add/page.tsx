"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addLocation, Location } from "../../utils/api";

export default function AddLocationPage() {
  const router = useRouter();
  const [form, setForm] = useState<Omit<Location, "id">>({
    name: "",
    description: "",
    latitude: 0,
    longitude: 0,
    wheelchairAccessible: false,
    accessibleToilet: false,
    wideEntrance: false,
    parkingAvailable: false,
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      // Convert latitude and longitude to numbers
      const payload = {
        ...form,
        latitude: Number(form.latitude),
        longitude: Number(form.longitude),
      };
      await addLocation(payload);
      router.push("/locations");
    } catch {
      setError("Failed to add location. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Add New Location</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border px-3 py-2 rounded"
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <textarea
          className="w-full border px-3 py-2 rounded"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          className="w-full border px-3 py-2 rounded"
          type="number"
          name="latitude"
          placeholder="Latitude"
          value={form.latitude}
          onChange={handleChange}
          required
        />
        <input
          className="w-full border px-3 py-2 rounded"
          type="number"
          name="longitude"
          placeholder="Longitude"
          value={form.longitude}
          onChange={handleChange}
          required
        />
        <div className="flex flex-col gap-2">
          <label>
            <input
              type="checkbox"
              name="wheelchairAccessible"
              checked={form.wheelchairAccessible}
              onChange={handleChange}
            />{" "}
            Wheelchair Accessible
          </label>
          <label>
            <input
              type="checkbox"
              name="accessibleToilet"
              checked={form.accessibleToilet}
              onChange={handleChange}
            />{" "}
            Accessible Toilet
          </label>
          <label>
            <input
              type="checkbox"
              name="wideEntrance"
              checked={form.wideEntrance}
              onChange={handleChange}
            />{" "}
            Wide Entrance
          </label>
          <label>
            <input
              type="checkbox"
              name="parkingAvailable"
              checked={form.parkingAvailable}
              onChange={handleChange}
            />{" "}
            Parking Available
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Location
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
}
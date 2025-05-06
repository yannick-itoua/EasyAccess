// --- Types ---
export interface Location {
  id?: number;
  name: string;
  latitude: number;
  longitude: number;
  description?: string;
  country?: string;
  city?: string;
  village?: string;
  wheelchairAccessible?: boolean;
  accessibleToilet?: boolean;
  wideEntrance?: boolean;
  parkingAvailable?: boolean;
}

export interface User {
  id?: number;
  username: string;
  password: string;
  email: string;
  role: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

// --- Location APIs ---

export async function fetchLocations(filters?: {
  country?: string;
  city?: string;
  village?: string;
}): Promise<Location[] | { content: Location[], totalPages: number }> {
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

export async function fetchLocationsPaginated(page = 0, size = 10) {
  const res = await fetch(`http://localhost:8080/api/locations?page=${page}&size=${size}`);
  if (!res.ok) throw new Error("Failed to fetch locations");
  return res.json(); // Should return { content, totalPages, ... }
}

export async function fetchLocationById(id: number): Promise<Location> {
  const res = await fetch(`${API_BASE_URL}/locations/${id}`);
  if (!res.ok) throw new Error("Failed to fetch location");
  return res.json();
}

export async function addLocation(location: Location): Promise<Location> {
  const res = await fetch(`${API_BASE_URL}/locations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(location),
  });
  if (!res.ok) throw new Error("Failed to add location");
  return res.json();
}

export async function updateLocation(id: number, location: Location): Promise<Location> {
  const res = await fetch(`${API_BASE_URL}/locations/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(location),
  });
  if (!res.ok) throw new Error("Failed to update location");
  return res.json();
}

export async function deleteLocation(id: number): Promise<boolean> {
  const res = await fetch(`${API_BASE_URL}/locations/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete location");
  return true;
}

// --- User APIs ---

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${API_BASE_URL}/users`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function addUser(user: User): Promise<User> {
  const res = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Failed to add user");
  return res.json();
}

export async function fetchUserById(id: number): Promise<User> {
  const res = await fetch(`${API_BASE_URL}/users/${id}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

export async function updateUser(id: number, user: User): Promise<User> {
  const res = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Failed to update user");
  return res.json();
}

export async function deleteUser(id: number): Promise<boolean> {
  const res = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete user");
  return true;
}
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/users/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <Link href="/" className="font-bold text-lg hover:underline">
          EasyAccess
        </Link>
        <Link href="/locations" className="hover:underline">
          Locations
        </Link>
        <Link href="/locations/add" className="hover:underline">
          Add Location
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span className="hidden sm:inline">Hello, {user.username}</span>
            <Link href="/users/profile" className="hover:underline">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-blue-100"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/users/login" className="hover:underline">
              Login
            </Link>
            <Link href="/users/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
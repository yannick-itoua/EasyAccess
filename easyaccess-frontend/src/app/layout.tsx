import { UserProvider } from "./context/UserContext";
import "./globals.css";
import Navbar from "./components/Navbar";
import type { ReactNode } from "react";

export const metadata = {
  title: "EasyAccess",
  description: "Find and share accessible public spaces in your city.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <UserProvider>
          <Navbar />
          <main>{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}
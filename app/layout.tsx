import type { Metadata } from "next";

// @ts-ignore - Next.js handles global CSS imports without TS declarations in this setup
import "./globals.css";
// @ts-ignore - Leaflet CSS is loaded as a side-effect asset in the app
import "leaflet/dist/leaflet.css";

export const metadata: Metadata = {
  title: "CafeScout — Find your next favorite cafe",
  description: "Discover cafes nearby with filters for Wi-Fi, outlets, noise, and seating.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-brew-50 text-brew-800 min-h-screen">{children}</body>
    </html>
  );
}

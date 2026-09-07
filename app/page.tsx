"use client";

import { useEffect, useMemo, useState } from "react";
import FilterBar from "@/components/FilterBar";
import MapView from "@/components/MapView";
import CafeList from "@/components/CafeList";
import type { Cafe, CafeFilters } from "@/types";

// Stubbed guest user until real auth is wired up
const GUEST_USER_ID = "guest";

export default function HomePage() {
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<CafeFilters>({});
  const [selectedCafeId, setSelectedCafeId] = useState<string | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.wifi) params.set("wifi", "true");
    if (filters.outlets) params.set("outlets", "true");
    if (filters.noise) params.set("noise", filters.noise);
    if (filters.minSeats) params.set("minSeats", String(filters.minSeats));
    if (filters.search) params.set("search", filters.search);

    setLoading(true);
    fetch(`/api/cafes?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setCafes(data))
      .finally(() => setLoading(false));
  }, [filters]);

  useEffect(() => {
    fetch(`/api/favorites?userId=${GUEST_USER_ID}`)
      .then((res) => res.json())
      .then((data: Cafe[]) => setFavoriteIds(new Set(data.map((c) => c.id))))
      .catch(() => {});
  }, []);

  const toggleFavorite = async (cafeId: string) => {
    const isFav = favoriteIds.has(cafeId);
    const next = new Set(favoriteIds);
    isFav ? next.delete(cafeId) : next.add(cafeId);
    setFavoriteIds(next);

    if (isFav) {
      await fetch(`/api/favorites/${cafeId}?userId=${GUEST_USER_ID}`, { method: "DELETE" });
    } else {
      await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: GUEST_USER_ID, cafeId }),
      });
    }
  };

  const selectedCafe = useMemo(
    () => cafes.find((c) => c.id === selectedCafeId) ?? null,
    [cafes, selectedCafeId]
  );

  return (
    <main className="mx-auto flex h-screen max-w-7xl flex-col gap-4 p-4">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brew-800">CafeScout</h1>
          <p className="text-sm text-brew-600">Find your next favorite cafe</p>
        </div>
      </header>

      <FilterBar filters={filters} onChange={setFilters} />

      <div className="grid flex-1 grid-cols-1 gap-4 overflow-hidden md:grid-cols-2">
        <div className="h-72 overflow-hidden rounded-xl border border-brew-100 md:h-full">
          <MapView
            cafes={cafes}
            selectedCafeId={selectedCafeId}
            onSelectCafe={setSelectedCafeId}
          />
        </div>

        <div className="overflow-y-auto rounded-xl border border-brew-100 bg-white/60 p-2">
          <CafeList
            cafes={cafes}
            loading={loading}
            selectedCafeId={selectedCafeId}
            favoriteIds={favoriteIds}
            onSelectCafe={setSelectedCafeId}
            onToggleFavorite={toggleFavorite}
          />
        </div>
      </div>
    </main>
  );
}

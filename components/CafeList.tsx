"use client";

import type { Cafe } from "@/types";
import CafeCard from "./CafeCard";

interface Props {
  cafes: Cafe[];
  loading: boolean;
  selectedCafeId: string | null;
  favoriteIds: Set<string>;
  onSelectCafe: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export default function CafeList({
  cafes,
  loading,
  selectedCafeId,
  favoriteIds,
  onSelectCafe,
  onToggleFavorite,
}: Props) {
  if (loading) {
    return <p className="p-4 text-sm text-brew-600">Loading cafes...</p>;
  }

  if (!cafes.length) {
    return <p className="p-4 text-sm text-brew-600">No cafes match those filters yet.</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {cafes.map((cafe) => (
        <CafeCard
          key={cafe.id}
          cafe={cafe}
          isSelected={cafe.id === selectedCafeId}
          isFavorite={favoriteIds.has(cafe.id)}
          onSelect={() => onSelectCafe(cafe.id)}
          onToggleFavorite={() => onToggleFavorite(cafe.id)}
        />
      ))}
    </div>
  );
}

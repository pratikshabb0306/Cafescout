"use client";

import type { Cafe } from "@/types";

interface Props {
  cafe: Cafe;
  isSelected: boolean;
  isFavorite: boolean;
  onSelect: () => void;
  onToggleFavorite: () => void;
}

const noiseLabel: Record<string, string> = {
  QUIET: "Quiet",
  MODERATE: "Moderate noise",
  LIVELY: "Lively",
};

export default function CafeCard({ cafe, isSelected, isFavorite, onSelect, onToggleFavorite }: Props) {
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer rounded-lg border p-3 transition ${
        isSelected ? "border-brew-600 bg-brew-50" : "border-brew-100 bg-white hover:border-brew-400"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-brew-800">{cafe.name}</h3>
          <p className="text-xs text-brew-600">{cafe.address}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          aria-label="Toggle favorite"
          className="text-lg"
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="mt-2 flex flex-wrap gap-1 text-xs">
        {cafe.hasWifi && <span className="rounded-full bg-brew-100 px-2 py-0.5">📶 Wi-Fi</span>}
        {cafe.hasOutlets && <span className="rounded-full bg-brew-100 px-2 py-0.5">🔌 Outlets</span>}
        <span className="rounded-full bg-brew-100 px-2 py-0.5">{noiseLabel[cafe.noiseLevel]}</span>
        <span className="rounded-full bg-brew-100 px-2 py-0.5">🪑 {cafe.seatingCount} seats</span>
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-brew-600">
        <span>{"$".repeat(cafe.priceLevel)}</span>
        {cafe.avgRating != null ? (
          <span>⭐ {cafe.avgRating.toFixed(1)} ({cafe.reviewCount})</span>
        ) : (
          <span>No reviews yet</span>
        )}
      </div>
    </div>
  );
}

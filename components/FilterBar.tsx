"use client";

import type { CafeFilters, NoiseLevel } from "@/types";

interface Props {
  filters: CafeFilters;
  onChange: (filters: CafeFilters) => void;
}

const noiseOptions: { label: string; value: NoiseLevel }[] = [
  { label: "Quiet", value: "QUIET" },
  { label: "Moderate", value: "MODERATE" },
  { label: "Lively", value: "LIVELY" },
];

export default function FilterBar({ filters, onChange }: Props) {
  const toggle = (key: "wifi" | "outlets") => {
    onChange({ ...filters, [key]: !filters[key] });
  };

  const setNoise = (value: NoiseLevel) => {
    onChange({ ...filters, noise: filters.noise === value ? undefined : value });
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <input
        type="text"
        placeholder="Search cafes by name or address..."
        className="min-w-[220px] flex-1 rounded-full border border-brew-100 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brew-400"
        value={filters.search ?? ""}
        onChange={(e) => onChange({ ...filters, search: e.target.value })}
      />

      <button
        onClick={() => toggle("wifi")}
        className={`rounded-full border px-4 py-2 text-sm ${
          filters.wifi ? "border-brew-600 bg-brew-600 text-white" : "border-brew-100 bg-white"
        }`}
      >
        Wi-Fi
      </button>

      <button
        onClick={() => toggle("outlets")}
        className={`rounded-full border px-4 py-2 text-sm ${
          filters.outlets ? "border-brew-600 bg-brew-600 text-white" : "border-brew-100 bg-white"
        }`}
      >
        Outlets
      </button>

      {noiseOptions.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setNoise(opt.value)}
          className={`rounded-full border px-4 py-2 text-sm ${
            filters.noise === opt.value
              ? "border-brew-600 bg-brew-600 text-white"
              : "border-brew-100 bg-white"
          }`}
        >
          {opt.label}
        </button>
      ))}

      <select
        className="rounded-full border border-brew-100 bg-white px-3 py-2 text-sm"
        value={filters.minSeats ?? ""}
        onChange={(e) =>
          onChange({
            ...filters,
            minSeats: e.target.value ? Number(e.target.value) : undefined,
          })
        }
      >
        <option value="">Any seating</option>
        <option value="10">10+ seats</option>
        <option value="20">20+ seats</option>
        <option value="30">30+ seats</option>
      </select>
    </div>
  );
}

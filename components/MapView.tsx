"use client";

import dynamic from "next/dynamic";
import type { Cafe } from "@/types";

interface Props {
  cafes: Cafe[];
  selectedCafeId: string | null;
  onSelectCafe: (id: string) => void;
}

const MapViewClient = dynamic(
  () => import("./MapViewClient"),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Loading map...</p>
      </div>
    ),
  }
);

export default function MapView(props: Props) {
  return <MapViewClient {...props} />;
}
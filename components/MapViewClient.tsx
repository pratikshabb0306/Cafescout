"use client";

import { useMemo } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import L from "leaflet";

import type { Cafe } from "@/types";

interface Props {
  cafes: Cafe[];
  selectedCafeId: string | null;
  onSelectCafe: (id: string) => void;
}

const defaultCenter: [number, number] = [16.8524, 74.5815];

const normalIcon = L.divIcon({
  className: "",
  html: `
    <div style="
      width: 30px;
      height: 30px;
      border-radius: 50% 50% 50% 0;
      background: #8B4513;
      border: 3px solid white;
      transform: rotate(-45deg);
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    ">
      <div style="
        width: 10px;
        height: 10px;
        background: white;
        border-radius: 50%;
        margin: 7px;
      "></div>
    </div>
  `,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const selectedIcon = L.divIcon({
  className: "",
  html: `
    <div style="
      width: 34px;
      height: 34px;
      border-radius: 50% 50% 50% 0;
      background: #F97316;
      border: 3px solid white;
      transform: rotate(-45deg);
      box-shadow: 0 3px 8px rgba(0,0,0,0.4);
    ">
      <div style="
        width: 12px;
        height: 12px;
        background: white;
        border-radius: 50%;
        margin: 8px;
      "></div>
    </div>
  `,
  iconSize: [34, 34],
  iconAnchor: [17, 34],
  popupAnchor: [0, -34],
});

export default function MapViewClient({
  cafes,
  selectedCafeId,
  onSelectCafe,
}: Props) {
  const center = useMemo<[number, number]>(() => {
    if (!cafes.length) {
      return defaultCenter;
    }

    const avgLat =
      cafes.reduce((sum, cafe) => sum + cafe.latitude, 0) /
      cafes.length;

    const avgLng =
      cafes.reduce((sum, cafe) => sum + cafe.longitude, 0) /
      cafes.length;

    return [avgLat, avgLng];
  }, [cafes]);

  return (
    <div className="h-full w-full">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {cafes.map((cafe) => {
          const isSelected = cafe.id === selectedCafeId;

          return (
            <Marker
              key={cafe.id}
              position={[cafe.latitude, cafe.longitude]}
              icon={isSelected ? selectedIcon : normalIcon}
              eventHandlers={{
                click: () => onSelectCafe(cafe.id),
              }}
            >
              <Popup>
                <div className="min-w-[180px]">
                  <h3 className="font-semibold text-base">
                    {cafe.name}
                  </h3>

                  <p className="text-sm text-gray-600 mt-1">
                    {cafe.address}
                  </p>

                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
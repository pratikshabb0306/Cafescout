export type NoiseLevel = "QUIET" | "MODERATE" | "LIVELY";

export interface Cafe {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  hasWifi: boolean;
  hasOutlets: boolean;
  noiseLevel: NoiseLevel;
  seatingCount: number;
  priceLevel: number;
  openTime: string | null;
  closeTime: string | null;
  photoUrl: string | null;
  avgRating?: number;
  reviewCount?: number;
  isFavorite?: boolean;
}

export interface CafeFilters {
  wifi?: boolean;
  outlets?: boolean;
  noise?: NoiseLevel;
  minSeats?: number;
  openNow?: boolean;
  search?: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  userId: string;
  userName?: string;
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createCafeSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  latitude: z.number(),
  longitude: z.number(),
  hasWifi: z.boolean().optional(),
  hasOutlets: z.boolean().optional(),
  noiseLevel: z.enum(["QUIET", "MODERATE", "LIVELY"]).optional(),
  seatingCount: z.number().int().nonnegative().optional(),
  priceLevel: z.number().int().min(1).max(4).optional(),
  openTime: z.string().optional(),
  closeTime: z.string().optional(),
  photoUrl: z.string().url().optional(),
});

// GET /api/cafes?wifi=true&outlets=true&noise=QUIET&minSeats=10&search=grind
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const wifi = searchParams.get("wifi");
  const outlets = searchParams.get("outlets");
  const noise = searchParams.get("noise");
  const minSeats = searchParams.get("minSeats");
  const search = searchParams.get("search");

  const cafes = await prisma.cafe.findMany({
    where: {
      ...(wifi === "true" ? { hasWifi: true } : {}),
      ...(outlets === "true" ? { hasOutlets: true } : {}),
      ...(noise ? { noiseLevel: noise as "QUIET" | "MODERATE" | "LIVELY" } : {}),
      ...(minSeats ? { seatingCount: { gte: Number(minSeats) } } : {}),
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { address: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    include: {
      reviews: { select: { rating: true } },
      _count: { select: { favorites: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const shaped = cafes.map((c) => {
    const ratings = c.reviews.map((r) => r.rating);
    const avgRating = ratings.length
      ? ratings.reduce((a, b) => a + b, 0) / ratings.length
      : null;
    const { reviews, _count, ...rest } = c;
    return {
      ...rest,
      avgRating,
      reviewCount: ratings.length,
      favoriteCount: _count.favorites,
    };
  });

  return NextResponse.json(shaped);
}

// POST /api/cafes - add a new cafe listing
export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = createCafeSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const cafe = await prisma.cafe.create({ data: parsed.data });
  return NextResponse.json(cafe, { status: 201 });
}

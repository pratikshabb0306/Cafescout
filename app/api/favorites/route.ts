import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const favoriteSchema = z.object({
  userId: z.string(),
  cafeId: z.string(),
});

// GET /api/favorites?userId=xyz
export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  const favorites = await prisma.favorite.findMany({
    where: { userId },
    include: { cafe: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(favorites.map((f) => f.cafe));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = favoriteSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const favorite = await prisma.favorite.upsert({
    where: { userId_cafeId: parsed.data },
    update: {},
    create: parsed.data,
  });

  return NextResponse.json(favorite, { status: 201 });
}

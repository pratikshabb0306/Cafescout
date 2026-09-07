import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// DELETE /api/favorites/:cafeId?userId=xyz
export async function DELETE(req: NextRequest, { params }: { params: { cafeId: string } }) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  await prisma.favorite.delete({
    where: { userId_cafeId: { userId, cafeId: params.cafeId } },
  });

  return NextResponse.json({ success: true });
}

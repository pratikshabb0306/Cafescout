import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const cafe = await prisma.cafe.findUnique({
    where: { id: params.id },
    include: {
      reviews: { include: { user: { select: { name: true } } }, orderBy: { createdAt: "desc" } },
    },
  });

  if (!cafe) {
    return NextResponse.json({ error: "Cafe not found" }, { status: 404 });
  }

  return NextResponse.json(cafe);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const cafe = await prisma.cafe.update({ where: { id: params.id }, data: body });
  return NextResponse.json(cafe);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  await prisma.cafe.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}

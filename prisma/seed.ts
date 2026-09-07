import { PrismaClient, NoiseLevel } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "guest@cafescout.app" },
    update: {},
    create: { name: "Guest", email: "guest@cafescout.app" },
  });

  const cafes = [
    {
      name: "The Grind Co.",
      address: "12 MG Road, Sangli",
      latitude: 16.8524,
      longitude: 74.5815,
      hasWifi: true,
      hasOutlets: true,
      noiseLevel: NoiseLevel.QUIET,
      seatingCount: 24,
      priceLevel: 2,
      openTime: "08:00",
      closeTime: "22:00",
    },
    {
      name: "Third Wave Roasters",
      address: "45 Station Road, Miraj",
      latitude: 16.8305,
      longitude: 74.6461,
      hasWifi: true,
      hasOutlets: true,
      noiseLevel: NoiseLevel.MODERATE,
      seatingCount: 40,
      priceLevel: 3,
      openTime: "07:30",
      closeTime: "21:00",
    },
    {
      name: "Morning Pour",
      address: "9 College Circle, Sangli",
      latitude: 16.8592,
      longitude: 74.5716,
      hasWifi: false,
      hasOutlets: true,
      noiseLevel: NoiseLevel.LIVELY,
      seatingCount: 18,
      priceLevel: 1,
      openTime: "06:30",
      closeTime: "18:00",
    },
  ];

  for (const cafe of cafes) {
    await prisma.cafe.create({ data: cafe });
  }

  console.log("Seeded", cafes.length, "cafes and user", user.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

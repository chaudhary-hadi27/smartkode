import { prisma } from "./src/client";

async function main() {
  console.log("Connecting to database using Prisma Client...");
  try {
    const projectsCount = await prisma.project.count();
    console.log("Success! Projects count:", projectsCount);
  } catch (error) {
    console.error("Failed to connect:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

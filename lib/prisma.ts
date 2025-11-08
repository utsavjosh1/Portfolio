import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const hasRequiredEnvVars = process.env.DATABASE_URL;

export const prisma =
  globalForPrisma.prisma ??
  (hasRequiredEnvVars
    ? new PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["query"] : [],
      })
    : null);

if (process.env.NODE_ENV !== "production" && prisma) {
  globalForPrisma.prisma = prisma;
}

// Helper function to check if Prisma is available
export const isPrismaAvailable = () => prisma !== null;

// Helper function to safely use Prisma
export const safePrisma = () => {
  if (!prisma) {
    throw new Error(
      "Database connection not available. Please check your environment variables."
    );
  }
  return prisma;
};

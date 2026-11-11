/**
 * Database client placeholder.
 *
 * The portfolio is currently static / serverless-friendly and does not
 * use a database. This file is kept so the Prisma schema and tooling
 * remain available if you add a database later.
 *
 * To enable Prisma:
 *   1. Set DATABASE_URL in .env.local (or Vercel env vars)
 *   2. Run `npx prisma generate` + `npx prisma db push`
 *   3. Replace the placeholder below with:
 *
 *      import { PrismaClient } from "@prisma/client";
 *      const globalForPrisma = globalThis as unknown as {
 *        prisma: PrismaClient | undefined;
 *      };
 *      export const db =
 *        globalForPrisma.prisma ??
 *        new PrismaClient({ log: ["query"] });
 *      if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
 */

export const db = null;

export type DbClient = null;

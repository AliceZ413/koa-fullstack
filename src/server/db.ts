import {PrismaClient} from '@prisma/client';
import * as process from "process";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ["query", "error", "warn"] : ["error"],
})

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
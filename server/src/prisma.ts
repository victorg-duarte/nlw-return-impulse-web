import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
    log: ['query'], // a cada operacao q o prisma faz no db, mostrar no log sendo realizadas
})
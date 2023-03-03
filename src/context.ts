import { PrismaClient } from "@prisma/client"

export type GraphQLContext = {
    prisma: PrismaClient
}

const prisma = new PrismaClient()

export async function createContext(): Promise<GraphQLContext> {
    return { prisma }
}